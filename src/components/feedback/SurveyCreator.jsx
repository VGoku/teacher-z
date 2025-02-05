import React, { useState } from 'react';

const defaultTemplates = {
    'Course Feedback': {
        title: 'End of Course Feedback',
        description: 'Gather student feedback about the course content and teaching methods',
        questions: [
            {
                id: '1',
                type: 'rating',
                text: 'How would you rate the overall course content?',
                options: { min: 1, max: 5, labels: ['Poor', 'Excellent'] }
            },
            {
                id: '2',
                type: 'text',
                text: 'What aspects of the course did you find most helpful?'
            },
            {
                id: '3',
                type: 'multiChoice',
                text: 'How challenging was the course material?',
                options: ['Too Easy', 'Just Right', 'Too Difficult']
            }
        ]
    },
    'Learning Pace': {
        title: 'Learning Pace Check',
        description: 'Check if students are comfortable with the current learning pace',
        questions: [
            {
                id: '1',
                type: 'rating',
                text: 'How comfortable are you with the current pace of learning?',
                options: { min: 1, max: 5, labels: ['Too Slow', 'Too Fast'] }
            },
            {
                id: '2',
                type: 'multiChoice',
                text: 'Which topics need more time?',
                options: ['Current Topics', 'Previous Topics', 'Both', 'Neither']
            }
        ]
    },
    'Teaching Methods': {
        title: 'Teaching Methods Feedback',
        description: 'Evaluate the effectiveness of different teaching methods',
        questions: [
            {
                id: '1',
                type: 'multiChoice',
                text: 'Which teaching method helps you learn best?',
                options: ['Lectures', 'Group Work', 'Hands-on Activities', 'Self-study']
            },
            {
                id: '2',
                type: 'text',
                text: 'What suggestions do you have for improving the teaching methods?'
            }
        ]
    }
};

const SurveyCreator = ({ onSaveSurvey }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [survey, setSurvey] = useState({
        title: '',
        description: '',
        questions: [],
        anonymous: true,
        deadline: '',
        notifyStudents: true
    });
    const [currentQuestion, setCurrentQuestion] = useState({
        type: 'text',
        text: '',
        options: []
    });

    const handleTemplateSelect = (templateName) => {
        const template = defaultTemplates[templateName];
        setSurvey(prev => ({
            ...prev,
            title: template.title,
            description: template.description,
            questions: template.questions
        }));
        setSelectedTemplate(templateName);
    };

    const handleSurveyChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSurvey(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleQuestionChange = (e) => {
        const { name, value } = e.target;
        setCurrentQuestion(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddOption = () => {
        if (currentQuestion.newOption) {
            setCurrentQuestion(prev => ({
                ...prev,
                options: [...prev.options, prev.newOption],
                newOption: ''
            }));
        }
    };

    const handleAddQuestion = () => {
        if (currentQuestion.text) {
            setSurvey(prev => ({
                ...prev,
                questions: [
                    ...prev.questions,
                    { ...currentQuestion, id: Date.now().toString() }
                ]
            }));
            setCurrentQuestion({
                type: 'text',
                text: '',
                options: []
            });
        }
    };

    const handleRemoveQuestion = (questionId) => {
        setSurvey(prev => ({
            ...prev,
            questions: prev.questions.filter(q => q.id !== questionId)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (survey.title && survey.questions.length > 0) {
            onSaveSurvey({
                ...survey,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                status: 'draft'
            });
            setSurvey({
                title: '',
                description: '',
                questions: [],
                anonymous: true,
                deadline: '',
                notifyStudents: true
            });
            setSelectedTemplate(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Create New Survey</h2>
                <button
                    onClick={() => setSelectedTemplate(null)}
                    className="text-blue-500 hover:text-blue-600"
                >
                    Clear Form
                </button>
            </div>

            {/* Template Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {Object.entries(defaultTemplates).map(([name, template]) => (
                    <div
                        key={name}
                        className={`p-4 border rounded-lg cursor-pointer hover:border-blue-500 ${selectedTemplate === name ? 'border-blue-500 bg-blue-50' : ''
                            }`}
                        onClick={() => handleTemplateSelect(name)}
                    >
                        <h3 className="font-medium mb-2">{template.title}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                ))}
            </div>

            {/* Survey Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Survey Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={survey.title}
                            onChange={handleSurveyChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deadline
                        </label>
                        <input
                            type="datetime-local"
                            name="deadline"
                            value={survey.deadline}
                            onChange={handleSurveyChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={survey.description}
                        onChange={handleSurveyChange}
                        rows="3"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div className="flex gap-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="anonymous"
                            checked={survey.anonymous}
                            onChange={handleSurveyChange}
                            className="mr-2"
                        />
                        Anonymous Responses
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="notifyStudents"
                            checked={survey.notifyStudents}
                            onChange={handleSurveyChange}
                            className="mr-2"
                        />
                        Send Email Notifications
                    </label>
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                    <h3 className="font-medium">Questions</h3>
                    {survey.questions.map((question, index) => (
                        <div key={question.id} className="flex items-start gap-4 p-4 border rounded-md">
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-sm font-medium">Question {index + 1}</span>
                                    <span className="text-sm text-gray-500">{question.type}</span>
                                </div>
                                <p>{question.text}</p>
                                {question.options && question.options.length > 0 && (
                                    <ul className="mt-2 space-y-1">
                                        {question.options.map((option, i) => (
                                            <li key={i} className="text-sm text-gray-600">• {option}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveQuestion(question.id)}
                                className="text-red-500 hover:text-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* Add Question Form */}
                <div className="space-y-4 border-t pt-4">
                    <h3 className="font-medium">Add New Question</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Question Type
                            </label>
                            <select
                                name="type"
                                value={currentQuestion.type}
                                onChange={handleQuestionChange}
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                <option value="text">Text Answer</option>
                                <option value="rating">Rating Scale</option>
                                <option value="multiChoice">Multiple Choice</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Question Text
                            </label>
                            <input
                                type="text"
                                name="text"
                                value={currentQuestion.text}
                                onChange={handleQuestionChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                    </div>

                    {(currentQuestion.type === 'multiChoice' || currentQuestion.type === 'rating') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Options
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="newOption"
                                    value={currentQuestion.newOption || ''}
                                    onChange={handleQuestionChange}
                                    className="flex-1 px-3 py-2 border rounded-md"
                                    placeholder="Enter an option"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddOption}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                                >
                                    Add Option
                                </button>
                            </div>
                            {currentQuestion.options.length > 0 && (
                                <ul className="mt-2 space-y-1">
                                    {currentQuestion.options.map((option, index) => (
                                        <li key={index} className="text-sm text-gray-600">• {option}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Add Question
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    disabled={!survey.title || survey.questions.length === 0}
                >
                    Save Survey
                </button>
            </form>
        </div>
    );
};

export default SurveyCreator; 