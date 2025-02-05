import React, { useState } from 'react';
import LessonCalendar from './LessonCalendar';
import LessonForm from './LessonForm';

const LessonDashboard = () => {
  const [lessons, setLessons] = useState([]);

  const addLesson = (lesson) => {
    setLessons([...lessons, lesson]);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">Lesson Planner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <LessonForm addLesson={addLesson} />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <LessonCalendar lessons={lessons} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDashboard; 