import React, { useState } from 'react';

const ResourceUploadForm = ({ addResource }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !subject) {
      alert('Resource title and subject are required.');
      return;
    }
    const resource = {
      title,
      subject,
      gradeLevel,
      description,
      file: file ? file.name : ''
    };
    addResource(resource);
    setTitle('');
    setSubject('');
    setGradeLevel('');
    setDescription('');
    setFile(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upload New Resource</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Resource Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Grade Level (optional)"
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
          Upload Resource
        </button>
      </form>
    </div>
  );
};

export default ResourceUploadForm; 