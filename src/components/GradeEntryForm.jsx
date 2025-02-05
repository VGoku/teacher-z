import React, { useState } from 'react';

const GradeEntryForm = ({ addGrade }) => {
  const [studentName, setStudentName] = useState('');
  const [assignmentName, setAssignmentName] = useState('');
  const [grade, setGrade] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName || !assignmentName || !grade) {
      alert('Please provide student name, assignment, and grade.');
      return;
    }
    const gradeRecord = { studentName, assignmentName, grade, comments };
    addGrade(gradeRecord);
    setStudentName('');
    setAssignmentName('');
    setGrade('');
    setComments('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Grade Record</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Assignment"
          value={assignmentName}
          onChange={(e) => setAssignmentName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Comments (optional)"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Add Grade
        </button>
      </form>
    </div>
  );
};

export default GradeEntryForm; 