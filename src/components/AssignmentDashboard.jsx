import React, { useState } from 'react';
import AssignmentForm from './AssignmentForm';
import AssignmentList from './AssignmentList';

const AssignmentDashboard = () => {
  const [assignments, setAssignments] = useState([]);

  const addAssignment = (assignment) => {
    setAssignments([...assignments, assignment]);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">Assignment Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <AssignmentForm addAssignment={addAssignment} />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <AssignmentList assignments={assignments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDashboard; 