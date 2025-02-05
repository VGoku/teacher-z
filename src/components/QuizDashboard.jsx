import React, { useState } from 'react';
import QuizForm from './QuizForm';
import QuizList from './QuizList';

const QuizDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);

  const addQuiz = (quiz) => {
    setQuizzes([...quizzes, quiz]);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-8">Online Quiz & Exam Creator</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <QuizForm addQuiz={addQuiz} />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <QuizList quizzes={quizzes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDashboard; 