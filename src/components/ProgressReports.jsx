import React, { useState } from 'react';

const ProgressReports = ({ attendanceRecords, students, selectedClass }) => {
  const [reportType, setReportType] = useState('attendance');
  const [timeRange, setTimeRange] = useState('month');

  // Mock data (replace with actual data from your system)
  const mockReportData = {
    attendance: {
      overall: 92,
      trend: [
        { date: '2024-01', rate: 94 },
        { date: '2024-02', rate: 92 },
        { date: '2024-03', rate: 90 },
      ],
      byClass: [
        { class: '1-A', rate: 94 },
        { class: '1-B', rate: 91 },
        { class: '2-A', rate: 89 },
        { class: '2-B', rate: 93 },
      ]
    },
    performance: {
      averageGrade: 85,
      gradeDistribution: [
        { range: '90-100', count: 15 },
        { range: '80-89', count: 25 },
        { range: '70-79', count: 18 },
        { range: '60-69', count: 8 },
        { range: 'Below 60', count: 4 },
      ],
      subjectPerformance: [
        { subject: 'Mathematics', average: 83 },
        { subject: 'Science', average: 86 },
        { subject: 'English', average: 88 },
        { subject: 'History', average: 82 },
        { subject: 'Art', average: 90 },
      ]
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="attendance">Attendance Report</option>
          <option value="performance">Performance Report</option>
          <option value="behavior">Behavior Report</option>
        </select>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
          <option value="quarter">Past Quarter</option>
          <option value="year">Past Year</option>
        </select>

        <button
          onClick={() => alert('Report downloaded!')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Download Report
        </button>
      </div>

      {/* Report Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Summary Cards */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Summary</h3>
          {reportType === 'attendance' ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Overall Attendance Rate</span>
                <span className="text-2xl font-bold text-blue-600">
                  {mockReportData.attendance.overall}%
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Attendance by Class</h4>
                {mockReportData.attendance.byClass.map(item => (
                  <div key={item.class} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Class {item.class}</span>
                    <span className="font-medium">{item.rate}%</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Grade</span>
                <span className="text-2xl font-bold text-green-600">
                  {mockReportData.performance.averageGrade}%
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Grade Distribution</h4>
                {mockReportData.performance.gradeDistribution.map(item => (
                  <div key={item.range} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{item.range}</span>
                    <span className="font-medium">{item.count} students</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Detailed Analysis */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Detailed Analysis</h3>
          {reportType === 'attendance' ? (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Attendance Trend</h4>
              <div className="h-48 flex items-end justify-between">
                {mockReportData.attendance.trend.map(item => (
                  <div key={item.date} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-blue-500 rounded-t"
                      style={{ height: `${item.rate}%` }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-1">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Subject Performance</h4>
              {mockReportData.performance.subjectPerformance.map(item => (
                <div key={item.subject} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{item.subject}</span>
                    <span>{item.average}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 rounded-full h-2"
                      style={{ width: `${item.average}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Recommended Actions</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-yellow-500">⚠️</span>
            <span>Follow up with students who have attendance below 85%</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">📊</span>
            <span>Schedule parent-teacher meetings for students showing declining performance</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>Recognize students with perfect attendance this month</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProgressReports; 