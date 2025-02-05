import React, { useState } from 'react';
import StudentInformation from './StudentInformation';
import AssignmentManager from './AssignmentManager';
import GradebookManager from './GradebookManager';
import CommunicationCenter from './CommunicationCenter';
import ClassCalendar from './ClassCalendar';
import DashboardOverview from './DashboardOverview';

const ClassroomManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState({});
  const [notifications, setNotifications] = useState([]);

  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: '📊' },
    { id: 'students', label: 'Student Information', icon: '👥' },
    { id: 'assignments', label: 'Assignments', icon: '📝' },
    { id: 'grades', label: 'Gradebook', icon: '📚' },
    { id: 'communication', label: 'Communication', icon: '💬' },
    { id: 'calendar', label: 'Class Calendar', icon: '📅' }
  ];

  // Mock class data (replace with API call)
  const classes = [
    { id: 'class1', name: 'Mathematics 101', period: '1st Period' },
    { id: 'class2', name: 'Science 101', period: '2nd Period' },
    { id: 'class3', name: 'English 101', period: '3rd Period' }
  ];

  const handleAddStudent = (newStudent) => {
    setStudents(prev => [...prev, { ...newStudent, id: Date.now() }]);
  };

  const handleUpdateStudent = (updatedStudent) => {
    setStudents(prev => prev.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
  };

  const handleAddAssignment = (newAssignment) => {
    setAssignments(prev => [...prev, { ...newAssignment, id: Date.now() }]);
  };

  const handleUpdateGrades = (studentId, assignmentId, grade) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [assignmentId]: grade
      }
    }));
  };

  const handleSendNotification = (notification) => {
    setNotifications(prev => [...prev, {
      ...notification,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Classroom Management
          </h1>

          {/* Class Selector */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white shadow-sm"
          >
            <option value="">Select Class</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>
                {cls.name} - {cls.period}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
            <p className="text-2xl font-bold text-blue-600">{students.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Active Assignments</h3>
            <p className="text-2xl font-bold text-green-600">
              {assignments.filter(a => !a.completed).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Class Average</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {Object.values(grades).length > 0
                ? (Object.values(grades).reduce((sum, studentGrades) => 
                    sum + Object.values(studentGrades).reduce((a, b) => a + b, 0) / Object.values(studentGrades).length
                  , 0) / Object.values(grades).length).toFixed(1)
                : 'N/A'}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Notifications</h3>
            <p className="text-2xl font-bold text-purple-600">{notifications.length}</p>
          </div>
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
          {activeTab === 'overview' && (
            <DashboardOverview
              students={students}
              assignments={assignments}
              grades={grades}
              notifications={notifications}
              selectedClass={selectedClass}
            />
          )}

          {activeTab === 'students' && (
            <StudentInformation
              students={students}
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              selectedClass={selectedClass}
            />
          )}

          {activeTab === 'assignments' && (
            <AssignmentManager
              assignments={assignments}
              students={students}
              onAddAssignment={handleAddAssignment}
              selectedClass={selectedClass}
            />
          )}

          {activeTab === 'grades' && (
            <GradebookManager
              students={students}
              assignments={assignments}
              grades={grades}
              onUpdateGrades={handleUpdateGrades}
              selectedClass={selectedClass}
            />
          )}

          {activeTab === 'communication' && (
            <CommunicationCenter
              students={students}
              notifications={notifications}
              onSendNotification={handleSendNotification}
              selectedClass={selectedClass}
            />
          )}

          {activeTab === 'calendar' && (
            <ClassCalendar
              assignments={assignments}
              selectedClass={selectedClass}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassroomManagementDashboard; 