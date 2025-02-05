import React, { useState } from 'react';
import GradeEntryForm from './GradeEntryForm';
import GradebookList from './GradebookList';

const GradebookDashboard = () => {
  const [grades, setGrades] = useState([]);

  const addGrade = (gradeRecord) => {
    setGrades([...grades, gradeRecord]);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">Gradebook & Reporting Tool</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <GradeEntryForm addGrade={addGrade} />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <GradebookList grades={grades} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradebookDashboard; 