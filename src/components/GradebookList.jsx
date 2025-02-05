import React from 'react';

const GradebookList = ({ grades }) => {
  // Filter valid numeric grades and calculate average
  const validGrades = grades.filter(record => !isNaN(parseFloat(record.grade)) && record.grade !== '');
  const averageGrade = validGrades.length > 0 ? (validGrades.reduce((sum, record) => sum + parseFloat(record.grade), 0) / validGrades.length).toFixed(2) : 'N/A';

  const handleExport = () => {
    alert('Export functionality is not implemented yet.');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Grade Records</h2>
      {grades.length === 0 ? (
        <p>No grade records yet.</p>
      ) : (
        <div>
          <p className="mb-4 font-semibold">Average Grade: {averageGrade}</p>
          <ul className="space-y-4">
            {grades.map((record, index) => (
              <li key={index} className="border p-4 rounded shadow">
                <p className="font-semibold">Student: {record.studentName}</p>
                <p>Assignment: {record.assignmentName}</p>
                <p>Grade: {record.grade}</p>
                {record.comments && <p>Comments: {record.comments}</p>}
              </li>
            ))}
          </ul>
          <button onClick={handleExport} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Export Report
          </button>
        </div>
      )}
    </div>
  );
};

export default GradebookList; 