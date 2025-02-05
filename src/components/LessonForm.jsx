import React, { useState } from 'react';

const LessonForm = ({ addLesson }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) {
      alert('Please provide a title and date for the lesson.');
      return;
    }
    const lesson = { title, date, description };
    addLesson(lesson);
    setTitle('');
    setDate('');
    setDescription('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Lesson</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2"
        />
        <textarea
          placeholder="Lesson Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Lesson
        </button>
      </form>
    </div>
  );
};

export default LessonForm; 