import React from 'react';

const AttendanceList = ({ records }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
      {records.length === 0 ? (
        <p>No attendance records yet.</p>
      ) : (
        <ul className="space-y-4">
          {records.map((record, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <p className="font-semibold">Name: {record.studentName}</p>
              <p>Date: {record.date}</p>
              <p>Status: {record.present ? 'Present' : 'Absent'}</p>
              {record.remarks && <p>Remarks: {record.remarks}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendanceList; 