import React, { useState } from 'react';
import ParentUpdates from './ParentUpdates';
import ProgressReports from './ProgressReports';
import MeetingScheduler from './MeetingScheduler';
import MessageCenter from './MessageCenter';

const ParentCommunicationDashboard = () => {
  const [activeTab, setActiveTab] = useState('updates');
  const [messages, setMessages] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const tabs = [
    { id: 'updates', label: 'Updates & Newsletters', icon: '📢' },
    { id: 'reports', label: 'Progress Reports', icon: '📊' },
    { id: 'meetings', label: 'Parent Meetings', icon: '👥' },
    { id: 'messages', label: 'Message Center', icon: '💬' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'zh', name: 'Chinese (中文)' }
  ];

  const handleAddMessage = (newMessage) => {
    setMessages([...messages, { ...newMessage, id: Date.now() }]);
  };

  const handleAddMeeting = (newMeeting) => {
    setMeetings([...meetings, { ...newMeeting, id: Date.now() }]);
  };

  const handleAddReport = (newReport) => {
    setReports([...reports, { ...newReport, id: Date.now() }]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Parent Communication Hub
          </h1>
          
          {/* Language Selector */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Actions */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab('updates')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <span>✉️</span> New Update
          </button>
          <button
            onClick={() => setActiveTab('meetings')}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <span>📅</span> Schedule Meeting
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            <span>📋</span> Generate Report
          </button>
        </div>

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
          {activeTab === 'updates' && (
            <ParentUpdates
              messages={messages}
              onAddMessage={handleAddMessage}
              selectedLanguage={selectedLanguage}
            />
          )}
          
          {activeTab === 'reports' && (
            <ProgressReports
              reports={reports}
              onAddReport={handleAddReport}
              selectedLanguage={selectedLanguage}
            />
          )}
          
          {activeTab === 'meetings' && (
            <MeetingScheduler
              meetings={meetings}
              onAddMeeting={handleAddMeeting}
              selectedLanguage={selectedLanguage}
            />
          )}
          
          {activeTab === 'messages' && (
            <MessageCenter
              messages={messages}
              onAddMessage={handleAddMessage}
              selectedLanguage={selectedLanguage}
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
            {[...messages, ...meetings, ...reports]
              .sort((a, b) => b.timestamp - a.timestamp)
              .slice(0, 3)
              .map(activity => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{activity.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    activity.type === 'message' ? 'bg-blue-100 text-blue-800' :
                    activity.type === 'meeting' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
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

export default ParentCommunicationDashboard; 