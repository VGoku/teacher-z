import React, { useState } from 'react';
import BehaviorForm from './BehaviorForm';
import BehaviorList from './BehaviorList';

const ClassroomManagementDashboard = () => {
  const [records, setRecords] = useState([]);

  const addRecord = (record) => {
    setRecords([...records, record]);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-yellow-50 to-purple-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">Classroom Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <BehaviorForm addRecord={addRecord} />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <BehaviorList records={records} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomManagementDashboard; 