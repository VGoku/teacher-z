import React, { useState } from 'react';

const GradebookManager = ({
  students,
  assignments,
  grades,
  onUpdateGrades,
  selectedClass
}) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [editingGrade, setEditingGrade] = useState(null);
  const [gradeInput, setGradeInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    student: '',
    assignment: '',
    gradeRange: 'all'
  });

  const filteredStudents = students
    .filter(student => !selectedClass || student.classId === selectedClass)
    .filter(student => {
      if (!filters.student) return true;
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      return fullName.includes(filters.student.toLowerCase());
    });

  const filteredAssignments = assignments
    .filter(assignment => !selectedClass || assignment.classId === selectedClass)
    .filter(assignment => {
      if (!filters.assignment) return true;
      return assignment.title.toLowerCase().includes(filters.assignment.toLowerCase());
    });

  const calculateGradePercentage = (studentId) => {
    const studentGrades = grades[studentId] || {};
    const totalPoints = assignments.reduce((sum, assignment) => sum + Number(assignment.totalPoints), 0);
    const earnedPoints = assignments.reduce((sum, assignment) => {
      return sum + (Number(studentGrades[assignment.id]) || 0);
    }, 0);
    return totalPoints === 0 ? 0 : (earnedPoints / totalPoints) * 100;
  };

  const getLetterGrade = (percentage) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const handleGradeSubmit = (studentId, assignmentId) => {
    const grade = Number(gradeInput);
    if (isNaN(grade) || grade < 0) return;
    
    const assignment = assignments.find(a => a.id === assignmentId);
    if (grade > assignment.totalPoints) return;

    onUpdateGrades(studentId, assignmentId, grade);
    setEditingGrade(null);
    setGradeInput('');
  };

  const handleGradeClick = (studentId, assignmentId, currentGrade) => {
    setEditingGrade({ studentId, assignmentId });
    setGradeInput(currentGrade?.toString() || '');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Gradebook</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Name
            </label>
            <input
              type="text"
              value={filters.student}
              onChange={(e) => setFilters(prev => ({ ...prev, student: e.target.value }))}
              placeholder="Search by name..."
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignment
            </label>
            <input
              type="text"
              value={filters.assignment}
              onChange={(e) => setFilters(prev => ({ ...prev, assignment: e.target.value }))}
              placeholder="Search assignments..."
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade Range
            </label>
            <select
              value={filters.gradeRange}
              onChange={(e) => setFilters(prev => ({ ...prev, gradeRange: e.target.value }))}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Grades</option>
              <option value="90-100">A (90-100%)</option>
              <option value="80-89">B (80-89%)</option>
              <option value="70-79">C (70-79%)</option>
              <option value="60-69">D (60-69%)</option>
              <option value="0-59">F (0-59%)</option>
            </select>
          </div>
        </div>
      )}

      {/* Gradebook Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
                Student
              </th>
              {filteredAssignments.map(assignment => (
                <th
                  key={assignment.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="space-y-1">
                    <div>{assignment.title}</div>
                    <div className="text-gray-400">{assignment.totalPoints} pts</div>
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Overall Grade
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map(student => {
              const percentage = calculateGradePercentage(student.id);
              const letterGrade = getLetterGrade(percentage);
              
              if (filters.gradeRange !== 'all') {
                const [min, max] = filters.gradeRange.split('-').map(Number);
                if (percentage < min || percentage > max) return null;
              }

              return (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white">
                    <div className="text-sm font-medium text-gray-900">
                      {student.firstName} {student.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {student.studentId}
                    </div>
                  </td>
                  {filteredAssignments.map(assignment => {
                    const currentGrade = grades[student.id]?.[assignment.id];
                    const isEditing = editingGrade?.studentId === student.id && 
                                    editingGrade?.assignmentId === assignment.id;

                    return (
                      <td
                        key={assignment.id}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {isEditing ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={gradeInput}
                              onChange={(e) => setGradeInput(e.target.value)}
                              min="0"
                              max={assignment.totalPoints}
                              className="w-20 px-2 py-1 border rounded"
                              autoFocus
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleGradeSubmit(student.id, assignment.id);
                                }
                              }}
                            />
                            <button
                              onClick={() => handleGradeSubmit(student.id, assignment.id)}
                              className="text-green-600 hover:text-green-800"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => setEditingGrade(null)}
                              className="text-red-600 hover:text-red-800"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => handleGradeClick(student.id, assignment.id, currentGrade)}
                            className="cursor-pointer hover:bg-gray-50 p-1 rounded"
                          >
                            {currentGrade !== undefined ? (
                              <div className="text-sm">
                                <span className="font-medium">{currentGrade}</span>
                                <span className="text-gray-500">
                                  /{assignment.totalPoints}
                                </span>
                                <span className="ml-1 text-gray-500">
                                  ({((currentGrade / assignment.totalPoints) * 100).toFixed(1)}%)
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-400">--</span>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${letterGrade === 'A' ? 'bg-green-100 text-green-800' :
                          letterGrade === 'B' ? 'bg-blue-100 text-blue-800' :
                          letterGrade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                          letterGrade === 'D' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {letterGrade}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradebookManager; 