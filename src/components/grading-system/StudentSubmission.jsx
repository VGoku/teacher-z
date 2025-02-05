import React, { useState } from 'react';
import { Upload, Input, Button, Card, List, message } from 'antd';
import { UploadOutlined, FileTextOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const StudentSubmission = ({ assignment, rubric, onSubmit }) => {
    const [submission, setSubmission] = useState({
        text: '',
        files: [],
        studentNotes: ''
    });

    const handleFileUpload = ({ file, fileList }) => {
        if (file.status === 'done') {
            setSubmission(prev => ({
                ...prev,
                files: fileList
            }));
        }
    };

    const handleSubmit = () => {
        if (!submission.text.trim() && submission.files.length === 0) {
            message.error('Please provide either text submission or upload files');
            return;
        }

        onSubmit({
            ...submission,
            submittedAt: new Date().toISOString(),
            assignmentId: assignment.id
        });

        message.success('Assignment submitted successfully');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">{assignment.title}</h2>
                    <p className="text-gray-600">{assignment.description}</p>

                    {assignment.dueDate && (
                        <div className="mt-2 text-sm text-gray-500">
                            Due: {new Date(assignment.dueDate).toLocaleString()}
                        </div>
                    )}
                </div>

                {rubric && (
                    <Card title="Grading Rubric" className="mb-6">
                        <List
                            dataSource={rubric.criteria}
                            renderItem={criteria => (
                                <List.Item>
                                    <div className="w-full">
                                        <div className="flex justify-between">
                                            <span className="font-medium">{criteria.name}</span>
                                            <span className="text-gray-500">
                                                Weight: {criteria.weight}%
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {criteria.description}
                                        </p>
                                        <div className="mt-2 text-sm">
                                            <span className="text-gray-500">Performance Levels:</span>
                                            <ul className="list-disc list-inside ml-4">
                                                {criteria.levels.map((level, index) => (
                                                    <li key={index}>
                                                        {level.score} points: {level.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Text Submission
                        </label>
                        <TextArea
                            value={submission.text}
                            onChange={e => setSubmission(prev => ({ ...prev, text: e.target.value }))}
                            placeholder="Type your submission here..."
                            rows={6}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            File Attachments
                        </label>
                        <Upload
                            multiple
                            onChange={handleFileUpload}
                            maxCount={5}
                            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                        >
                            <Button icon={<UploadOutlined />}>
                                Upload Files (Max: 5)
                            </Button>
                        </Upload>
                        <p className="mt-1 text-sm text-gray-500">
                            Supported formats: PDF, DOC, DOCX, TXT, JPG, JPEG, PNG
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Notes for Teacher (Optional)
                        </label>
                        <TextArea
                            value={submission.studentNotes}
                            onChange={e => setSubmission(prev => ({ ...prev, studentNotes: e.target.value }))}
                            placeholder="Add any notes or comments for your teacher..."
                            rows={3}
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                    <Button onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        disabled={!submission.text.trim() && submission.files.length === 0}
                    >
                        Submit Assignment
                    </Button>
                </div>
            </div>

            {assignment.resources && assignment.resources.length > 0 && (
                <Card title="Assignment Resources" className="bg-white rounded-lg shadow">
                    <List
                        dataSource={assignment.resources}
                        renderItem={resource => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<FileTextOutlined />}
                                    title={<a href={resource.url}>{resource.name}</a>}
                                    description={resource.description}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            )}
        </div>
    );
};

export default StudentSubmission; 