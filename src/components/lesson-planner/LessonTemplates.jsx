import React, { useState } from 'react';

const defaultTemplates = {
    'Mathematics': {
        title: 'Math Lesson Template',
        objectives: '1. Understanding the concept\n2. Practicing problem-solving\n3. Real-world application',
        activities: '1. Introduction and concept explanation (10 min)\n2. Guided practice (20 min)\n3. Independent work (15 min)\n4. Discussion and review (10 min)',
        assessment: 'Quiz, homework assignment, class participation',
        duration: '55'
    },
    'Science': {
        title: 'Science Experiment Template',
        objectives: '1. Understanding scientific method\n2. Conducting experiments\n3. Recording observations',
        activities: '1. Introduction to topic (10 min)\n2. Hypothesis formation (10 min)\n3. Experiment (25 min)\n4. Results and discussion (10 min)',
        assessment: 'Lab report, observation notes, class participation',
        duration: '55'
    },
    'Language Arts': {
        title: 'Reading and Writing Template',
        objectives: '1. Reading comprehension\n2. Vocabulary development\n3. Writing skills practice',
        activities: '1. Reading session (15 min)\n2. Vocabulary work (10 min)\n3. Writing exercise (20 min)\n4. Peer review (10 min)',
        assessment: 'Writing assignment, vocabulary quiz, participation',
        duration: '55'
    }
};

const LessonTemplates = ({ onApplyTemplate, onSaveTemplate }) => {
    const [templates, setTemplates] = useState(defaultTemplates);
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [isCustomizing, setIsCustomizing] = useState(false);
    const [customTemplate, setCustomTemplate] = useState({
        name: '',
        title: '',
        objectives: '',
        activities: '',
        assessment: '',
        duration: ''
    });

    const handleTemplateSelect = (templateName) => {
        setSelectedTemplate(templateName);
        if (onApplyTemplate && templates[templateName]) {
            onApplyTemplate(templates[templateName]);
        }
    };

    const handleCustomInputChange = (e) => {
        const { name, value } = e.target;
        setCustomTemplate(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveCustomTemplate = () => {
        if (customTemplate.name && customTemplate.title) {
            const newTemplates = {
                ...templates,
                [customTemplate.name]: {
                    title: customTemplate.title,
                    objectives: customTemplate.objectives,
                    activities: customTemplate.activities,
                    assessment: customTemplate.assessment,
                    duration: customTemplate.duration
                }
            };
            setTemplates(newTemplates);
            if (onSaveTemplate) {
                onSaveTemplate(newTemplates);
            }
            setIsCustomizing(false);
            setCustomTemplate({
                name: '',
                title: '',
                objectives: '',
                activities: '',
                assessment: '',
                duration: ''
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Lesson Templates</h2>
                <button
                    onClick={() => setIsCustomizing(!isCustomizing)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    {isCustomizing ? 'Cancel' : 'Create Template'}
                </button>
            </div>

            {isCustomizing ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Template Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={customTemplate.name}
                            onChange={handleCustomInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Default Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={customTemplate.title}
                            onChange={handleCustomInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Default Objectives
                        </label>
                        <textarea
                            name="objectives"
                            value={customTemplate.objectives}
                            onChange={handleCustomInputChange}
                            rows="3"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Default Activities
                        </label>
                        <textarea
                            name="activities"
                            value={customTemplate.activities}
                            onChange={handleCustomInputChange}
                            rows="4"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Default Assessment
                        </label>
                        <textarea
                            name="assessment"
                            value={customTemplate.assessment}
                            onChange={handleCustomInputChange}
                            rows="2"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Default Duration (minutes)
                        </label>
                        <input
                            type="number"
                            name="duration"
                            value={customTemplate.duration}
                            onChange={handleCustomInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <button
                        onClick={handleSaveCustomTemplate}
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Save Template
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(templates).map(([name, template]) => (
                        <div
                            key={name}
                            className={`p-4 border rounded-lg cursor-pointer hover:border-blue-500 ${selectedTemplate === name ? 'border-blue-500 bg-blue-50' : ''
                                }`}
                            onClick={() => handleTemplateSelect(name)}
                        >
                            <h3 className="font-medium mb-2">{name}</h3>
                            <p className="text-sm text-gray-600 mb-1">{template.title}</p>
                            <p className="text-sm text-gray-500">{template.duration} minutes</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LessonTemplates; 