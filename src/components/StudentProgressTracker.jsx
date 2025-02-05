import React, { useState } from 'react';

const StudentProgressTracker = ({ students, searchQuery, selectedClass }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock data (replace with actual data from your system)
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Art'];
  
  const mockStudentData = [
    {
      id: 1,
      name: 'John Doe',
      class: '1-A',
      grades: {
        Mathematics: [85, 90, 88],
        Science: [92, 88, 90],
        English: [78, 82, 85],
        History: [88, 85, 89],
        Art: [95, 92, 94]
      },
      participation: 85,
      attendance: 95,
      recentActivities: [
        { date: '2024-02-01', type: 'Assignment', subject: 'Mathematics', score: 90 },
        { date: '2024-02-03', type: 'Quiz', subject: 'Science', score: 88 },
        { date: '2024-02-05', type: 'Project', subject: 'English', score: 85 }
      ]
    }
    // Add more mock students as needed
  ];

  const calculateAverageGrade = (grades) => {
    return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
  };

  const getPerformanceTrend = (grades) => {
    if (grades.length < 2) return 'stable';
    const lastGrade = grades[grades.length - 1];
    const previousGrade = grades[grades.length - 2];
    if (lastGrade > previousGrade) return 'improving';
    if (lastGrade < previousGrade) return 'declining';
    return 'stable';
  };

  return (
    <div className="space-y-6">
      {/* Subject Filter */}
      <div className="flex gap-4 mb-6">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Subjects</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      {/* Progress Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStudentData.map(student => (
          <div
            key={student.id}
            className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedStudent(student)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{student.name}</h3>
                <p className="text-sm text-gray-600">Class {student.class}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  Attendance: <span className="text-green-600">{student.attendance}%</span>
                </p>
                <p className="text-sm font-medium">
                  Participation: <span className="text-blue-600">{student.participation}%</span>
                </p>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="space-y-2">
              {Object.entries(student.grades).map(([subject, grades]) => {
                const average = calculateAverageGrade(grades);
                const trend = getPerformanceTrend(grades);
                
                if (selectedSubject === 'all' || selectedSubject === subject) {
                  return (
                    <div key={subject} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{average.toFixed(1)}</span>
                        <span className={`text-sm ${
                          trend === 'improving' ? 'text-green-500' :
                          trend === 'declining' ? 'text-red-500' :
                          'text-gray-500'
                        }`}>
                          {trend === 'improving' ? '↑' :
                           trend === 'declining' ? '↓' :
                           '→'}
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* Recent Activities */}
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Activities</h4>
              <div className="space-y-1">
                {student.recentActivities.slice(0, 3).map((activity, index) => (
                  <div key={index} className="text-sm flex justify-between">
                    <span className="text-gray-600">
                      {activity.type} - {activity.subject}
                    </span>
                    <span className="font-medium">{activity.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Detailed Performance View */}
            <div className="space-y-6">
              {/* Add detailed charts and statistics here */}
              <p className="text-gray-600">
                Detailed performance view coming soon...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProgressTracker; 