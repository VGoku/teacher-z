import React from 'react';

const AssignmentList = ({ assignments }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Assignments</h2>
      {assignments.length === 0 ? (
        <p>No assignments posted yet.</p>
      ) : (
        <ul className="space-y-4">
          {assignments.map((assignment, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <p className="font-semibold">Title: {assignment.title}</p>
              <p>Due Date: {assignment.dueDate}</p>
              {assignment.marks && <p>Marks: {assignment.marks}</p>}
              {assignment.description && <p>Description: {assignment.description}</p>}
              {assignment.file && <p>File: {assignment.file}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignmentList; 