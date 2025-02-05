import React, { useState } from 'react';

const AttendanceForm = ({ addRecord }) => {
  const [studentName, setStudentName] = useState('');
  const [date, setDate] = useState('');
  const [present, setPresent] = useState(true);
  const [remarks, setRemarks] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName || !date) {
      alert('Student name and date are required.');
      return;
    }
    const record = { studentName, date, present, remarks };
    addRecord(record);
    setStudentName('');
    setDate('');
    setPresent(true);
    setRemarks('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Record Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <div className="flex items-center">
          <label className="mr-2">Present:</label>
          <select
            value={present}
            onChange={(e) => setPresent(e.target.value === 'true')}
            className="border p-2 rounded"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <textarea
          placeholder="Remarks (optional)"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Record
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm; 