import React, { useState } from 'react';
import LiveQuiz from './LiveQuiz';
import CollaborativeWhiteboard from './CollaborativeWhiteboard';
import GameHub from './GameHub';
import Leaderboard from './Leaderboard';

const InteractiveEngagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('quiz');
  const [sessionData, setSessionData] = useState({
    activeQuiz: null,
    participants: [],
    scores: {},
    activities: []
  });

  const tabs = [
    { id: 'quiz', label: 'Live Quiz', icon: '📝' },
    { id: 'whiteboard', label: 'Collaborative Board', icon: '🎨' },
    { id: 'games', label: 'Learning Games', icon: '🎮' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' }
  ];

  const handleStartActivity = (activityType, data) => {
    setSessionData(prev => ({
      ...prev,
      activeQuiz: activityType === 'quiz' ? data : prev.activeQuiz,
      activities: [
        ...prev.activities,
        {
          id: Date.now(),
          type: activityType,
          timestamp: new Date().toISOString(),
          data
        }
      ]
    }));
  };

  const handleParticipantJoin = (participant) => {
    setSessionData(prev => ({
      ...prev,
      participants: [...prev.participants, participant]
    }));
  };

  const handleScoreUpdate = (participantId, points) => {
    setSessionData(prev => ({
      ...prev,
      scores: {
        ...prev.scores,
        [participantId]: (prev.scores[participantId] || 0) + points
      }
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Interactive Class Tools
          </h1>
          
          {/* Quick Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab('quiz')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <span>📝</span> Start Quiz
            </button>
            <button
              onClick={() => setActiveTab('games')}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              <span>🎮</span> New Game
            </button>
          </div>
        </div>

        {/* Session Info */}
        {sessionData.activeQuiz && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">Active Session</h2>
                <p className="text-sm text-gray-600">
                  {sessionData.participants.length} participants
                </p>
              </div>
              <button
                onClick={() => setSessionData(prev => ({ ...prev, activeQuiz: null }))}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                End Session
              </button>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 font-medium rounded-t-lg transition-colors
                ${activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'quiz' && (
            <LiveQuiz
              sessionData={sessionData}
              onStartQuiz={(quizData) => handleStartActivity('quiz', quizData)}
              onParticipantJoin={handleParticipantJoin}
              onScoreUpdate={handleScoreUpdate}
            />
          )}
          
          {activeTab === 'whiteboard' && (
            <CollaborativeWhiteboard
              sessionData={sessionData}
              onStartActivity={(data) => handleStartActivity('whiteboard', data)}
              onParticipantJoin={handleParticipantJoin}
            />
          )}
          
          {activeTab === 'games' && (
            <GameHub
              sessionData={sessionData}
              onStartGame={(gameData) => handleStartActivity('game', gameData)}
              onParticipantJoin={handleParticipantJoin}
              onScoreUpdate={handleScoreUpdate}
            />
          )}
          
          {activeTab === 'leaderboard' && (
            <Leaderboard
              scores={sessionData.scores}
              participants={sessionData.participants}
              activities={sessionData.activities}
            />
          )}
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <button className="text-blue-500 hover:text-blue-600">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {sessionData.activities
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .slice(0, 3)
              .map(activity => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">
                      {activity.type === 'quiz' ? 'Live Quiz Session' :
                       activity.type === 'whiteboard' ? 'Whiteboard Session' :
                       'Learning Game'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    activity.type === 'quiz' ? 'bg-blue-100 text-blue-800' :
                    activity.type === 'whiteboard' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {activity.type}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveEngagementDashboard; 