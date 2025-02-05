import React, { useState } from 'react';
import SurveyCreator from './SurveyCreator';
import SurveyAnalytics from './SurveyAnalytics';
import SurveyResponse from './SurveyResponse';

const FeedbackDashboard = () => {
    const [activeTab, setActiveTab] = useState('surveys');
    const [surveys, setSurveys] = useState([]);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [responses, setResponses] = useState([]);
    const [viewMode, setViewMode] = useState('list'); // list, create, response, analytics

    const handleSaveSurvey = (survey) => {
        setSurveys(prev => [...prev, survey]);
        setViewMode('list');
    };

    const handleSubmitResponse = (response) => {
        setResponses(prev => [...prev, response]);
        setViewMode('list');
    };

    const handleDeleteSurvey = (surveyId) => {
        setSurveys(prev => prev.filter(s => s.id !== surveyId));
        setResponses(prev => prev.filter(r => r.surveyId !== surveyId));
    };

    const getSurveyResponses = (surveyId) => {
        return responses.filter(r => r.surveyId === surveyId);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Student Feedback & Surveys</h1>
                {viewMode === 'list' && (
                    <button
                        onClick={() => setViewMode('create')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Create New Survey
                    </button>
                )}
            </div>

            {/* Navigation */}
            {viewMode === 'list' && (
                <div className="border-b">
                    <nav className="flex gap-4">
                        <button
                            onClick={() => setActiveTab('surveys')}
                            className={`py-2 px-4 ${activeTab === 'surveys'
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Active Surveys
                        </button>
                        <button
                            onClick={() => setActiveTab('completed')}
                            className={`py-2 px-4 ${activeTab === 'completed'
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Completed Surveys
                        </button>
                    </nav>
                </div>
            )}

            {/* Content */}
            {viewMode === 'list' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {surveys
                        .filter(survey =>
                            activeTab === 'completed'
                                ? new Date(survey.deadline) < new Date()
                                : new Date(survey.deadline) >= new Date()
                        )
                        .map(survey => {
                            const surveyResponses = getSurveyResponses(survey.id);
                            return (
                                <div
                                    key={survey.id}
                                    className="border rounded-lg p-4 space-y-3"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">{survey.title}</h3>
                                            <p className="text-sm text-gray-600">{survey.description}</p>
                                        </div>
                                        <span className={`text-sm px-2 py-1 rounded-md ${new Date(survey.deadline) < new Date()
                                                ? 'bg-gray-100 text-gray-800'
                                                : 'bg-green-100 text-green-800'
                                            }`}>
                                            {new Date(survey.deadline) < new Date() ? 'Closed' : 'Active'}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>{surveyResponses.length} responses</span>
                                        <span>
                                            Deadline: {new Date(survey.deadline).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="flex gap-2 pt-2 border-t">
                                        <button
                                            onClick={() => {
                                                setSelectedSurvey(survey);
                                                setViewMode('analytics');
                                            }}
                                            className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                                        >
                                            View Analytics
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedSurvey(survey);
                                                setViewMode('response');
                                            }}
                                            className="flex-1 px-3 py-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100"
                                            disabled={new Date(survey.deadline) < new Date()}
                                        >
                                            Take Survey
                                        </button>
                                        <button
                                            onClick={() => handleDeleteSurvey(survey.id)}
                                            className="px-3 py-1.5 text-red-500 hover:bg-red-50 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            )}

            {viewMode === 'create' && (
                <SurveyCreator onSaveSurvey={handleSaveSurvey} />
            )}

            {viewMode === 'response' && selectedSurvey && (
                <div>
                    <button
                        onClick={() => setViewMode('list')}
                        className="mb-4 text-blue-500 hover:text-blue-600"
                    >
                        ← Back to Surveys
                    </button>
                    <SurveyResponse
                        survey={selectedSurvey}
                        onSubmit={handleSubmitResponse}
                    />
                </div>
            )}

            {viewMode === 'analytics' && selectedSurvey && (
                <div>
                    <button
                        onClick={() => setViewMode('list')}
                        className="mb-4 text-blue-500 hover:text-blue-600"
                    >
                        ← Back to Surveys
                    </button>
                    <SurveyAnalytics
                        survey={selectedSurvey}
                        responses={getSurveyResponses(selectedSurvey.id)}
                    />
                </div>
            )}
        </div>
    );
};

export default FeedbackDashboard; 