import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const DashboardOverview = ({
  students,
  assignments,
  grades,
  notifications,
  selectedClass
}) => {
  // Calculate performance data for the line chart
  const performanceData = assignments.map(assignment => {
    const assignmentGrades = Object.values(grades).map(studentGrades => 
      studentGrades[assignment.id] || 0
    );
    const average = assignmentGrades.length > 0
      ? assignmentGrades.reduce((a, b) => a + b, 0) / assignmentGrades.length
      : 0;

    return {
      name: assignment.title,
      average: average.toFixed(1),
      highest: Math.max(...assignmentGrades, 0),
      lowest: Math.min(...assignmentGrades.filter(g => g > 0), 100)
    };
  });

  // Calculate grade distribution for the bar chart
  const gradeRanges = {
    'A (90-100)': 0,
    'B (80-89)': 0,
    'C (70-79)': 0,
    'D (60-69)': 0,
    'F (0-59)': 0
  };

  Object.values(grades).forEach(studentGrades => {
    const average = Object.values(studentGrades).reduce((a, b) => a + b, 0) / Object.values(studentGrades).length;
    if (average >= 90) gradeRanges['A (90-100)']++;
    else if (average >= 80) gradeRanges['B (80-89)']++;
    else if (average >= 70) gradeRanges['C (70-79)']++;
    else if (average >= 60) gradeRanges['D (60-69)']++;
    else gradeRanges['F (0-59)']++;
  });

  const gradeDistributionData = Object.entries(gradeRanges).map(([range, count]) => ({
    range,
    count
  }));

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div>
        <h2 className="text-xl font-bold mb-4">Class Performance Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="average" stroke="#8884d8" name="Class Average" />
              <Line type="monotone" dataKey="highest" stroke="#82ca9d" name="Highest Score" />
              <Line type="monotone" dataKey="lowest" stroke="#ff7300" name="Lowest Score" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grade Distribution */}
      <div>
        <h2 className="text-xl font-bold mb-4">Grade Distribution</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradeDistributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Number of Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity & Upcoming Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {notifications.slice(0, 5).map(notification => (
              <div
                key={notification.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div>
                  <p className="font-medium">{notification.message}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(notification.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${
                  notification.type === 'assignment' ? 'bg-blue-100 text-blue-800' :
                  notification.type === 'grade' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {notification.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-lg font-semibold mb-3">Upcoming Tasks</h3>
          <div className="space-y-3">
            {assignments
              .filter(assignment => !assignment.completed && new Date(assignment.dueDate) > new Date())
              .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
              .slice(0, 5)
              .map(assignment => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-gray-500">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                    {assignment.type}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Student Engagement */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-semibold mb-3">Student Engagement</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Assignment Completion</p>
            <p className="text-2xl font-bold text-blue-700">
              {((assignments.filter(a => a.completed).length / assignments.length) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Class Participation</p>
            <p className="text-2xl font-bold text-green-700">85%</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">Active Students</p>
            <p className="text-2xl font-bold text-purple-700">
              {students.filter(s => s.active).length}/{students.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview; 