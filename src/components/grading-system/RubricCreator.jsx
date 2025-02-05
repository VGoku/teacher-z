import React, { useState } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Button, Select, InputNumber, Card, Space, message } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const RubricCreator = ({ onSave }) => {
    const [rubric, setRubric] = useState({
        title: '',
        description: '',
        totalPoints: 100,
        criteria: [
            {
                id: Date.now(),
                name: '',
                description: '',
                weight: 0,
                levels: [
                    { score: 5, description: 'Excellent' },
                    { score: 4, description: 'Good' },
                    { score: 3, description: 'Satisfactory' },
                    { score: 2, description: 'Needs Improvement' },
                    { score: 1, description: 'Poor' }
                ]
            }
        ]
    });

    const handleCriteriaChange = (criteriaId, field, value) => {
        setRubric(prev => ({
            ...prev,
            criteria: prev.criteria.map(c =>
                c.id === criteriaId ? { ...c, [field]: value } : c
            )
        }));
    };

    const addCriteria = () => {
        const totalWeight = rubric.criteria.reduce((sum, c) => sum + (c.weight || 0), 0);
        if (totalWeight >= 100) {
            message.warning('Total weight cannot exceed 100%');
            return;
        }

        setRubric(prev => ({
            ...prev,
            criteria: [
                ...prev.criteria,
                {
                    id: Date.now(),
                    name: '',
                    description: '',
                    weight: 0,
                    levels: [
                        { score: 5, description: 'Excellent' },
                        { score: 4, description: 'Good' },
                        { score: 3, description: 'Satisfactory' },
                        { score: 2, description: 'Needs Improvement' },
                        { score: 1, description: 'Poor' }
                    ]
                }
            ]
        }));
    };

    const removeCriteria = (criteriaId) => {
        setRubric(prev => ({
            ...prev,
            criteria: prev.criteria.filter(c => c.id !== criteriaId)
        }));
    };

    const handleSubmit = () => {
        const totalWeight = rubric.criteria.reduce((sum, c) => sum + (c.weight || 0), 0);
        if (totalWeight !== 100) {
            message.error('Total weight must equal 100%');
            return;
        }

        if (!rubric.title.trim()) {
            message.error('Please enter a rubric title');
            return;
        }

        const invalidCriteria = rubric.criteria.find(c => !c.name.trim() || !c.weight);
        if (invalidCriteria) {
            message.error('Please fill in all criteria names and weights');
            return;
        }

        onSave(rubric);
        message.success('Rubric saved successfully');
    };

    const totalWeight = rubric.criteria.reduce((sum, c) => sum + (c.weight || 0), 0);

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Create Grading Rubric</h2>

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rubric Title
                        </label>
                        <Input
                            value={rubric.title}
                            onChange={e => setRubric(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter rubric title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <TextArea
                            value={rubric.description}
                            onChange={e => setRubric(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter rubric description"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Total Points
                        </label>
                        <InputNumber
                            value={rubric.totalPoints}
                            onChange={value => setRubric(prev => ({ ...prev, totalPoints: value }))}
                            min={1}
                            max={1000}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Grading Criteria</h3>
                        <div className="text-sm text-gray-500">
                            Total Weight: {totalWeight}%
                        </div>
                    </div>

                    {rubric.criteria.map((criteria, index) => (
                        <Card key={criteria.id} className="bg-gray-50">
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            value={criteria.name}
                                            onChange={e => handleCriteriaChange(criteria.id, 'name', e.target.value)}
                                            placeholder="Criteria name"
                                        />
                                    </div>
                                    <div className="w-32">
                                        <InputNumber
                                            value={criteria.weight}
                                            onChange={value => handleCriteriaChange(criteria.id, 'weight', value)}
                                            placeholder="Weight %"
                                            min={0}
                                            max={100}
                                            formatter={value => `${value}%`}
                                            parser={value => value.replace('%', '')}
                                        />
                                    </div>
                                    {rubric.criteria.length > 1 && (
                                        <Button
                                            type="text"
                                            icon={<DeleteOutlined />}
                                            onClick={() => removeCriteria(criteria.id)}
                                            danger
                                        />
                                    )}
                                </div>

                                <TextArea
                                    value={criteria.description}
                                    onChange={e => handleCriteriaChange(criteria.id, 'description', e.target.value)}
                                    placeholder="Criteria description"
                                    rows={2}
                                />

                                <div className="space-y-2">
                                    <div className="text-sm font-medium">Performance Levels</div>
                                    {criteria.levels.map((level, levelIndex) => (
                                        <div key={levelIndex} className="flex items-center gap-2">
                                            <div className="w-16 text-center">
                                                {level.score} points
                                            </div>
                                            <Input
                                                value={level.description}
                                                onChange={e => {
                                                    const newLevels = [...criteria.levels];
                                                    newLevels[levelIndex].description = e.target.value;
                                                    handleCriteriaChange(criteria.id, 'levels', newLevels);
                                                }}
                                                placeholder={`Level ${level.score} description`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}

                    <Button
                        type="dashed"
                        onClick={addCriteria}
                        icon={<PlusOutlined />}
                        block
                    >
                        Add Criteria
                    </Button>
                </div>

                <div className="mt-6">
                    <Button type="primary" onClick={handleSubmit} block>
                        Save Rubric
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RubricCreator; 