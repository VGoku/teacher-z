import React, { useState } from 'react';
import LessonPlanner from './lesson-planner/LessonPlanner';
import ResourceLibrary from './lesson-planner/ResourceLibrary';
import LessonCalendar from './lesson-planner/LessonCalendar';
import CollaborationHub from './lesson-planner/CollaborationHub';
import StudentFeedback from './lesson-planner/StudentFeedback';

const LessonPlannerDashboard = () => {
  const [activeTab, setActiveTab] = useState('planner');
  const [lessons, setLessons] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'

  const tabs = [
    { id: 'planner', label: 'Lesson Planner', icon: '📝' },
    { id: 'resources', label: 'Resource Library', icon: '📚' },
    { id: 'calendar', label: 'Calendar View', icon: '📅' },
    { id: 'collaborate', label: 'Collaboration', icon: '👥' },
    { id: 'feedback', label: 'Student Feedback', icon: '💭' }
  ];

  const handleAddLesson = (newLesson) => {
    setLessons([...lessons, { ...newLesson, id: Date.now() }]);
  };

  const handleUpdateLesson = (updatedLesson) => {
    setLessons(lessons.map(lesson => 
      lesson.id === updatedLesson.id ? updatedLesson : lesson
    ));
  };

  const handleAddResource = (newResource) => {
    setResources([...resources, { ...newResource, id: Date.now() }]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Classroom & Lesson Planning
        </h1>

        {/* Quick Actions */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => {
              setActiveTab('planner');
              // Add logic to open new lesson form
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <span>➕</span> New Lesson
          </button>
          <button
            onClick={() => {
              setActiveTab('resources');
              // Add logic to open resource upload
            }}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <span>📤</span> Upload Resource
          </button>
          <button
            onClick={() => {
              setActiveTab('calendar');
              setViewMode(viewMode === 'week' ? 'month' : 'week');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            <span>🔄</span> Toggle {viewMode === 'week' ? 'Monthly' : 'Weekly'} View
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
          {activeTab === 'planner' && (
            <LessonPlanner
              lessons={lessons}
              resources={resources}
              onAddLesson={handleAddLesson}
              onUpdateLesson={handleUpdateLesson}
            />
          )}

          {activeTab === 'resources' && (
            <ResourceLibrary
              resources={resources}
              onAddResource={handleAddResource}
            />
          )}

          {activeTab === 'calendar' && (
            <LessonCalendar
              lessons={lessons}
              selectedDate={selectedDate}
              viewMode={viewMode}
              onDateSelect={setSelectedDate}
              onLessonUpdate={handleUpdateLesson}
            />
          )}

          {activeTab === 'collaborate' && (
            <CollaborationHub
              lessons={lessons}
              resources={resources}
              onLessonUpdate={handleUpdateLesson}
            />
          )}

          {activeTab === 'feedback' && (
            <StudentFeedback
              lessons={lessons}
              onLessonUpdate={handleUpdateLesson}
            />
          )}
        </div>

        {/* Notifications Panel */}
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Upcoming & Reminders</h2>
            <button className="text-blue-500 hover:text-blue-600">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {lessons
              .filter(lesson => new Date(lesson.date) > new Date())
              .slice(0, 3)
              .map(lesson => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{lesson.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(lesson.date).toLocaleDateString()} - {lesson.class}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    lesson.status === 'completed' ? 'bg-green-100 text-green-800' :
                    lesson.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {lesson.status}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlannerDashboard; 