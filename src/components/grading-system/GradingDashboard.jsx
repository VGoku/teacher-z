import React, { useState } from 'react';
import { Tabs, Button, Table, Tag, Space, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import RubricCreator from './RubricCreator';
import StudentSubmission from './StudentSubmission';
import GradingInterface from './GradingInterface';
import AustralianContent from './AustralianContent';

const { TabPane } = Tabs;

const GradingDashboard = () => {
    const [activeTab, setActiveTab] = useState('assignments');
    const [modalContent, setModalContent] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [rubrics, setRubrics] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [selectedAustralianContent, setSelectedAustralianContent] = useState(null);

    const handleCreateRubric = (rubric) => {
        setRubrics(prev => [...prev, { ...rubric, id: Date.now().toString() }]);
        setModalContent(null);
        message.success('Rubric created successfully');
    };

    const handleSubmitAssignment = (submission) => {
        setSubmissions(prev => [...prev, submission]);
        setModalContent(null);
        message.success('Assignment submitted successfully');
    };

    const handleSaveGrade = (gradeData) => {
        setSubmissions(prev =>
            prev.map(sub =>
                sub.id === gradeData.submissionId
                    ? { ...sub, grade: gradeData }
                    : sub
            )
        );
        setModalContent(null);
        message.success('Grade saved successfully');
    };

    const assignmentColumns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <a onClick={() => {
                    setSelectedItem(record);
                    setModalContent('viewAssignment');
                }}>
                    {text}
                </a>
            )
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            render: date => new Date(date).toLocaleDateString()
        },
        {
            title: 'Rubric',
            dataIndex: 'rubricId',
            key: 'rubricId',
            render: rubricId => {
                const rubric = rubrics.find(r => r.id === rubricId);
                return rubric ? rubric.title : 'No Rubric';
            }
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => {
                const submissionCount = submissions.filter(s => s.assignmentId === record.id).length;
                const gradedCount = submissions.filter(s => s.assignmentId === record.id && s.grade).length;
                return (
                    <Space>
                        <Tag color="blue">{submissionCount} Submissions</Tag>
                        <Tag color="green">{gradedCount} Graded</Tag>
                    </Space>
                );
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setSelectedItem(record);
                            setModalContent('editAssignment');
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDeleteAssignment(record.id)}
                    >
                        Delete
                    </Button>
                </Space>
            )
        }
    ];

    const rubricColumns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Criteria Count',
            key: 'criteriaCount',
            render: (_, record) => record.criteria.length
        },
        {
            title: 'Total Points',
            dataIndex: 'totalPoints',
            key: 'totalPoints'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setSelectedItem(record);
                            setModalContent('viewRubric');
                        }}
                    >
                        View
                    </Button>
                    <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDeleteRubric(record.id)}
                    >
                        Delete
                    </Button>
                </Space>
            )
        }
    ];

    const submissionColumns = [
        {
            title: 'Assignment',
            key: 'assignment',
            render: (_, record) => {
                const assignment = assignments.find(a => a.id === record.assignmentId);
                return assignment ? assignment.title : 'Unknown Assignment';
            }
        },
        {
            title: 'Submitted',
            dataIndex: 'submittedAt',
            key: 'submittedAt',
            render: date => new Date(date).toLocaleString()
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (
                <Tag color={record.grade ? 'green' : 'gold'}>
                    {record.grade ? 'Graded' : 'Pending'}
                </Tag>
            )
        },
        {
            title: 'Grade',
            key: 'grade',
            render: (_, record) => record.grade ? `${record.grade.percentage}%` : '-'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setSelectedItem(record);
                            setModalContent('grade');
                        }}
                    >
                        {record.grade ? 'View Grade' : 'Grade'}
                    </Button>
                </Space>
            )
        }
    ];

    const handleDeleteAssignment = (assignmentId) => {
        Modal.confirm({
            title: 'Delete Assignment',
            content: 'Are you sure you want to delete this assignment? This will also delete all associated submissions.',
            onOk: () => {
                setAssignments(prev => prev.filter(a => a.id !== assignmentId));
                setSubmissions(prev => prev.filter(s => s.assignmentId !== assignmentId));
                message.success('Assignment deleted successfully');
            }
        });
    };

    const handleDeleteRubric = (rubricId) => {
        Modal.confirm({
            title: 'Delete Rubric',
            content: 'Are you sure you want to delete this rubric?',
            onOk: () => {
                setRubrics(prev => prev.filter(r => r.id !== rubricId));
                message.success('Rubric deleted successfully');
            }
        });
    };

    const tabItems = [
        {
            key: 'assignments',
            label: 'Assignments',
            children: (
                <Table
                    columns={assignmentColumns}
                    dataSource={assignments}
                    rowKey="id"
                />
            )
        },
        {
            key: 'rubrics',
            label: 'Rubrics',
            children: (
                <Table
                    columns={rubricColumns}
                    dataSource={rubrics}
                    rowKey="id"
                />
            )
        },
        {
            key: 'submissions',
            label: 'Submissions',
            children: (
                <Table
                    columns={submissionColumns}
                    dataSource={submissions}
                    rowKey="id"
                />
            )
        },
        {
            key: 'australian-content',
            label: 'Australian Content',
            children: (
                <AustralianContent
                    onSelectContent={setSelectedAustralianContent}
                />
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Grading System</h1>
                <Space>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setModalContent('createRubric')}
                    >
                        Create Rubric
                    </Button>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setModalContent('createAssignment')}
                    >
                        Create Assignment
                    </Button>
                </Space>
            </div>

            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
            />

            <Modal
                open={!!modalContent}
                title={
                    modalContent === 'createRubric' ? 'Create Rubric' :
                        modalContent === 'viewRubric' ? 'View Rubric' :
                            modalContent === 'grade' ? 'Grade Submission' :
                                'Assignment Details'
                }
                onCancel={() => {
                    setModalContent(null);
                    setSelectedItem(null);
                }}
                width={1000}
                footer={null}
            >
                {modalContent === 'createRubric' && (
                    <RubricCreator onSave={handleCreateRubric} />
                )}
                {modalContent === 'grade' && selectedItem && (
                    <GradingInterface
                        submission={selectedItem}
                        rubric={rubrics.find(r =>
                            assignments.find(a => a.id === selectedItem.assignmentId)?.rubricId === r.id
                        )}
                        onSaveGrade={handleSaveGrade}
                    />
                )}
                {modalContent === 'viewAssignment' && selectedItem && (
                    <StudentSubmission
                        assignment={selectedItem}
                        rubric={rubrics.find(r => r.id === selectedItem.rubricId)}
                        onSubmit={handleSubmitAssignment}
                    />
                )}
            </Modal>
        </div>
    );
};

export default GradingDashboard; 