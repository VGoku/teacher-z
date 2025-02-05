import React, { useState } from 'react';

const BehaviorForm = ({ addRecord }) => {
  const [studentName, setStudentName] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [rewardPoints, setRewardPoints] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName || !date || !note) {
      alert('Student name, date, and behavior note are required.');
      return;
    }
    const record = { studentName, date, note, rewardPoints };
    addRecord(record);
    setStudentName('');
    setDate('');
    setNote('');
    setRewardPoints('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Record Student Behavior</h2>
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
        <textarea
          placeholder="Behavior Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Reward Points (optional)"
          value={rewardPoints}
          onChange={(e) => setRewardPoints(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
          Add Record
        </button>
      </form>
    </div>
  );
};

export default BehaviorForm; 