import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, List, Progress, Tag, message } from 'antd';
import { SaveOutlined, SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const GradingInterface = ({ submission, rubric, onSaveGrade }) => {
    const [grades, setGrades] = useState({});
    const [feedback, setFeedback] = useState('');
    const [generalComments, setGeneralComments] = useState('');
    const [isGrading, setIsGrading] = useState(false);

    useEffect(() => {
        // Initialize grades with empty scores
        const initialGrades = {};
        rubric.criteria.forEach(criteria => {
            initialGrades[criteria.id] = {
                score: null,
                feedback: ''
            };
        });
        setGrades(initialGrades);
    }, [rubric]);

    const calculateTotalScore = () => {
        let totalScore = 0;
        let totalPossible = 0;

        rubric.criteria.forEach(criteria => {
            if (grades[criteria.id]?.score !== null) {
                const maxScore = Math.max(...criteria.levels.map(l => l.score));
                const weightedScore = (grades[criteria.id].score / maxScore) * criteria.weight;
                totalScore += weightedScore;
            }
            totalPossible += criteria.weight;
        });

        return {
            score: totalScore,
            possible: totalPossible,
            percentage: Math.round((totalScore / totalPossible) * 100)
        };
    };

    const generateAutomatedFeedback = () => {
        let feedbackPoints = [];

        rubric.criteria.forEach(criteria => {
            const grade = grades[criteria.id];
            if (grade?.score !== null) {
                const level = criteria.levels.find(l => l.score === grade.score);
                if (level) {
                    feedbackPoints.push(`${criteria.name}: ${level.description}`);
                }
            }
        });

        const totalScore = calculateTotalScore();
        let overallFeedback = '';

        if (totalScore.percentage >= 90) {
            overallFeedback = 'Excellent work! You demonstrated a strong understanding of the material.';
        } else if (totalScore.percentage >= 80) {
            overallFeedback = 'Good job! There are some areas for improvement, but overall well done.';
        } else if (totalScore.percentage >= 70) {
            overallFeedback = 'Satisfactory work. Focus on the areas mentioned for improvement.';
        } else {
            overallFeedback = 'This submission needs significant improvement. Please review the feedback carefully.';
        }

        return `${overallFeedback}\n\nDetailed Feedback:\n${feedbackPoints.join('\n')}`;
    };

    const handleSaveGrade = async (shouldNotify = false) => {
        const totalScore = calculateTotalScore();
        if (totalScore.score === 0) {
            message.error('Please provide grades for at least one criterion');
            return;
        }

        setIsGrading(true);
        try {
            const gradeData = {
                submissionId: submission.id,
                grades,
                totalScore: totalScore.score,
                percentage: totalScore.percentage,
                feedback: feedback || generateAutomatedFeedback(),
                generalComments,
                gradedAt: new Date().toISOString(),
                notifyStudent: shouldNotify
            };

            await onSaveGrade(gradeData);
            message.success('Grades saved successfully');
        } catch (error) {
            message.error('Failed to save grades');
        } finally {
            setIsGrading(false);
        }
    };

    const totalScore = calculateTotalScore();

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Submission Preview */}
            <Card title="Student Submission" className="bg-white rounded-lg shadow">
                <div className="space-y-4">
                    {submission.text && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                Text Submission
                            </h3>
                            <div className="bg-gray-50 p-4 rounded">
                                {submission.text}
                            </div>
                        </div>
                    )}

                    {submission.files && submission.files.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                Attached Files
                            </h3>
                            <List
                                dataSource={submission.files}
                                renderItem={file => (
                                    <List.Item>
                                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                                            {file.name}
                                        </a>
                                    </List.Item>
                                )}
                            />
                        </div>
                    )}

                    {submission.studentNotes && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                Student Notes
                            </h3>
                            <div className="bg-gray-50 p-4 rounded">
                                {submission.studentNotes}
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            {/* Grading Interface */}
            <Card title="Grading" className="bg-white rounded-lg shadow">
                <div className="space-y-6">
                    {/* Progress */}
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-medium">
                            Total Score: {totalScore.score.toFixed(1)}%
                        </div>
                        <Progress
                            type="circle"
                            percent={totalScore.percentage}
                            width={80}
                            status={totalScore.percentage >= 70 ? 'success' : 'exception'}
                        />
                    </div>

                    {/* Rubric Criteria */}
                    <List
                        dataSource={rubric.criteria}
                        renderItem={criteria => (
                            <List.Item className="block">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">{criteria.name}</h3>
                                            <p className="text-sm text-gray-600">
                                                {criteria.description}
                                            </p>
                                        </div>
                                        <Tag color="blue">Weight: {criteria.weight}%</Tag>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <Select
                                            placeholder="Select score"
                                            value={grades[criteria.id]?.score || undefined}
                                            onChange={value => setGrades(prev => ({
                                                ...prev,
                                                [criteria.id]: {
                                                    ...prev[criteria.id],
                                                    score: value
                                                }
                                            }))}
                                            style={{ width: '100%' }}
                                        >
                                            {criteria.levels.map(level => (
                                                <Option key={level.score} value={level.score}>
                                                    {level.score} - {level.description}
                                                </Option>
                                            ))}
                                        </Select>

                                        <TextArea
                                            placeholder="Add specific feedback for this criterion"
                                            value={grades[criteria.id]?.feedback || ''}
                                            onChange={e => setGrades(prev => ({
                                                ...prev,
                                                [criteria.id]: {
                                                    ...prev[criteria.id],
                                                    feedback: e.target.value
                                                }
                                            }))}
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />

                    {/* Overall Feedback */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                General Comments
                            </label>
                            <TextArea
                                value={generalComments}
                                onChange={e => setGeneralComments(e.target.value)}
                                placeholder="Add any general comments about the submission..."
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Feedback for Student
                            </label>
                            <TextArea
                                value={feedback}
                                onChange={e => setFeedback(e.target.value)}
                                placeholder="Enter detailed feedback for the student..."
                                rows={4}
                            />
                            <Button
                                type="link"
                                onClick={() => setFeedback(generateAutomatedFeedback())}
                                className="mt-1"
                            >
                                Generate Automated Feedback
                            </Button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <Button
                            icon={<SaveOutlined />}
                            onClick={() => handleSaveGrade(false)}
                            loading={isGrading}
                        >
                            Save Draft
                        </Button>
                        <Button
                            type="primary"
                            icon={<SendOutlined />}
                            onClick={() => handleSaveGrade(true)}
                            loading={isGrading}
                        >
                            Save & Notify Student
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default GradingInterface; 