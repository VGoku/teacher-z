import React, { useState } from 'react';
import AttendanceForm from './AttendanceForm';
import AttendanceList from './AttendanceList';

const AttendanceDashboard = () => {
  const [records, setRecords] = useState([]);

  const addRecord = (record) => {
    setRecords([...records, record]);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-8">Student Attendance Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <AttendanceForm addRecord={addRecord} />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <AttendanceList records={records} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard; 