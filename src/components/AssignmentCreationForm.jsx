import React, { useState } from 'react';

const AssignmentCreationForm = ({ onAssignmentCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [maxPoints, setMaxPoints] = useState('');
  const [assignmentType, setAssignmentType] = useState('homework');
  const [attachments, setAttachments] = useState([]);
  const [allowedFileTypes, setAllowedFileTypes] = useState(['pdf', 'doc', 'docx']);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    const newAssignment = {
      title,
      description,
      dueDate,
      maxPoints: parseInt(maxPoints) || 100,
      assignmentType,
      attachments,
      allowedFileTypes,
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    onAssignmentCreate(newAssignment);
    
    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setMaxPoints('');
    setAssignmentType('homework');
    setAttachments([]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified
    })));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Assignment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assignment Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date *
          </label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Assignment Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assignment Type
          </label>
          <select
            value={assignmentType}
            onChange={(e) => setAssignmentType(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="homework">Homework</option>
            <option value="quiz">Quiz</option>
            <option value="project">Project</option>
            <option value="essay">Essay</option>
          </select>
        </div>

        {/* Max Points */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Maximum Points
          </label>
          <input
            type="number"
            value={maxPoints}
            onChange={(e) => setMaxPoints(e.target.value)}
            placeholder="100"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* File Attachments */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attach Files
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Allowed file types: PDF, DOC, DOCX
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Assignment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentCreationForm; 