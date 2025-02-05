import React, { useMemo } from 'react';

const AssignmentReports = ({ assignments, submissions }) => {
  const stats = useMemo(() => {
    const totalAssignments = assignments.length;
    const totalSubmissions = submissions.length;
    const gradedSubmissions = submissions.filter(sub => sub.status === 'graded').length;
    const pendingSubmissions = totalSubmissions - gradedSubmissions;
    
    // Calculate average grades per assignment
    const assignmentStats = assignments.map(assignment => {
      const assignmentSubmissions = submissions.filter(sub => 
        sub.assignmentId === assignment.id && sub.status === 'graded'
      );
      
      const totalGrades = assignmentSubmissions.reduce((sum, sub) => 
        sum + (parseInt(sub.grade) || 0), 0
      );
      
      const averageGrade = assignmentSubmissions.length > 0
        ? (totalGrades / assignmentSubmissions.length).toFixed(1)
        : 'N/A';

      return {
        ...assignment,
        submissionCount: assignmentSubmissions.length,
        averageGrade
      };
    });

    // Calculate overall class performance
    const allGrades = submissions
      .filter(sub => sub.status === 'graded')
      .map(sub => parseInt(sub.grade) || 0);
    
    const overallAverage = allGrades.length > 0
      ? (allGrades.reduce((sum, grade) => sum + grade, 0) / allGrades.length).toFixed(1)
      : 'N/A';

    return {
      totalAssignments,
      totalSubmissions,
      gradedSubmissions,
      pendingSubmissions,
      assignmentStats,
      overallAverage
    };
  }, [assignments, submissions]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Assignments</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.totalAssignments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Submissions</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.totalSubmissions}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Graded</h3>
          <p className="text-2xl font-bold text-green-600">{stats.gradedSubmissions}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">{stats.pendingSubmissions}</p>
        </div>
      </div>

      {/* Overall Performance */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h2 className="text-lg font-semibold mb-4">Overall Class Performance</h2>
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-sm text-gray-500">Average Grade</p>
            <p className="text-3xl font-bold text-blue-600">
              {stats.overallAverage}
              <span className="text-sm text-gray-500 ml-1">/ 100</span>
            </p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">Completion Rate</p>
            <p className="text-3xl font-bold text-green-600">
              {stats.totalSubmissions > 0
                ? Math.round((stats.gradedSubmissions / stats.totalSubmissions) * 100)
                : 0}
              <span className="text-sm text-gray-500 ml-1">%</span>
            </p>
          </div>
        </div>
      </div>

      {/* Assignment Details Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold p-6 border-b">Assignment Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submissions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Grade
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.assignmentStats.map(assignment => (
                <tr key={assignment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                    <div className="text-sm text-gray-500">{assignment.assignmentType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{assignment.submissionCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {assignment.averageGrade}
                      {assignment.averageGrade !== 'N/A' && (
                        <span className="text-gray-500 ml-1">/ 100</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignmentReports; 