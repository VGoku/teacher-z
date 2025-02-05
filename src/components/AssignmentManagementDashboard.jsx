import React, { useState } from 'react';
import AssignmentCreationForm from './AssignmentCreationForm';
import SubmissionsList from './SubmissionsList';
import GradingInterface from './GradingInterface';
import AssignmentReports from './AssignmentReports';

const AssignmentManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const addAssignment = (newAssignment) => {
    setAssignments([...assignments, { ...newAssignment, id: Date.now() }]);
  };

  const addSubmission = (newSubmission) => {
    setSubmissions([...submissions, { ...newSubmission, id: Date.now() }]);
  };

  const updateAssignmentGrade = (submissionId, grade, feedback) => {
    setSubmissions(submissions.map(sub => 
      sub.id === submissionId 
        ? { ...sub, grade, feedback, gradedAt: new Date().toISOString() }
        : sub
    ));
  };

  const tabs = [
    { id: 'create', label: 'Create Assignment' },
    { id: 'submissions', label: 'View Submissions' },
    { id: 'grading', label: 'Grade Assignments' },
    { id: 'reports', label: 'Generate Reports' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Assignment Management System
      </h1>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6 border-b">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors
              ${activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'create' && (
          <AssignmentCreationForm 
            onAssignmentCreate={addAssignment}
          />
        )}
        {activeTab === 'submissions' && (
          <SubmissionsList 
            assignments={assignments}
            submissions={submissions}
            onSubmissionAdd={addSubmission}
          />
        )}
        {activeTab === 'grading' && (
          <GradingInterface 
            assignments={assignments}
            submissions={submissions}
            onUpdateGrade={updateAssignmentGrade}
          />
        )}
        {activeTab === 'reports' && (
          <AssignmentReports 
            assignments={assignments}
            submissions={submissions}
          />
        )}
      </div>
    </div>
  );
};

export default AssignmentManagementDashboard; 