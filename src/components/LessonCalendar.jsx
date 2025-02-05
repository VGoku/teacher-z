import React from 'react';

const LessonCalendar = ({ lessons }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lesson Calendar</h2>
      {lessons.length === 0 ? (
        <p>No lessons scheduled yet.</p>
      ) : (
        <ul>
          {lessons.map((lesson, index) => (
            <li key={index} className="border p-2 my-2 rounded shadow">
              <h3 className="font-semibold">{lesson.title}</h3>
              <p>Date: {lesson.date}</p>
              <p>Description: {lesson.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LessonCalendar; 