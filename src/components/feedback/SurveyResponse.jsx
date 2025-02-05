import React, { useState, useEffect } from 'react';

const SurveyResponse = ({ survey, onSubmit }) => {
    const [answers, setAnswers] = useState({});
    const [startTime, setStartTime] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setStartTime(Date.now());
    }, []);

    const handleInputChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const duration = Math.round((Date.now() - startTime) / 1000); // Duration in seconds
            const response = {
                id: Date.now().toString(),
                surveyId: survey.id,
                answers,
                duration,
                submittedAt: new Date().toISOString(),
                completed: Object.keys(answers).length === survey.questions.length
            };

            await onSubmit(response);
        } catch (error) {
            console.error('Error submitting survey:', error);
            alert('Failed to submit survey. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderQuestion = (question) => {
        switch (question.type) {
            case 'rating':
                return (
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>{question.options?.labels?.[0] || 'Low'}</span>
                            <span>{question.options?.labels?.[1] || 'High'}</span>
                        </div>
                        <input
                            type="range"
                            min={question.options?.min || 1}
                            max={question.options?.max || 5}
                            value={answers[question.id] || ''}
                            onChange={(e) => handleInputChange(question.id, parseInt(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center text-sm font-medium">
                            {answers[question.id] || '-'}
                        </div>
                    </div>
                );

            case 'multiChoice':
                return (
                    <div className="space-y-2">
                        {question.options.map((option, index) => (
                            <label key={index} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name={`question_${question.id}`}
                                    value={option}
                                    checked={answers[question.id] === option}
                                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                                    className="text-blue-500 focus:ring-blue-500"
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                );

            case 'text':
                return (
                    <textarea
                        value={answers[question.id] || ''}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Type your answer here..."
                    />
                );

            default:
                return null;
        }
    };

    const progress = Math.round(
        (Object.keys(answers).length / survey.questions.length) * 100
    );

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-semibold">{survey.title}</h1>
                {survey.description && (
                    <p className="text-gray-600">{survey.description}</p>
                )}
                {survey.anonymous && (
                    <p className="text-sm text-green-600 bg-green-50 p-2 rounded-md">
                        This survey is anonymous. Your responses will not be linked to your identity.
                    </p>
                )}
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {survey.questions.map((question, index) => (
                        <div key={question.id} className="space-y-2">
                            <label className="block font-medium">
                                {index + 1}. {question.text}
                                {question.required && (
                                    <span className="text-red-500 ml-1">*</span>
                                )}
                            </label>
                            {renderQuestion(question)}
                        </div>
                    ))}

                    <div className="pt-4 border-t">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting || progress < 100}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Response'}
                        </button>
                        {progress < 100 && (
                            <p className="text-sm text-red-500 mt-2">
                                Please answer all questions before submitting.
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SurveyResponse; 