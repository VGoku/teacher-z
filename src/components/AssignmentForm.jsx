import React, { useState } from 'react';

const AssignmentForm = ({ addAssignment }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [marks, setMarks] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert('Assignment title and due date are required.');
      return;
    }
    const assignment = {
      title,
      dueDate,
      marks,
      description,
      file: file ? file.name : ''
    };
    addAssignment(assignment);
    setTitle('');
    setDueDate('');
    setMarks('');
    setDescription('');
    setFile(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Post New Assignment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Assignment Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Post Assignment
        </button>
      </form>
    </div>
  );
};

export default AssignmentForm; 