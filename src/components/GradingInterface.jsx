import React, { useState } from 'react';

const GradingInterface = ({ assignments, submissions, onUpdateGrade }) => {
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');

  const filteredSubmissions = selectedAssignment
    ? submissions.filter(sub => sub.assignmentId === parseInt(selectedAssignment))
    : [];

  const handleGradeSubmit = (e) => {
    e.preventDefault();
    if (!selectedSubmission || !grade) {
      alert('Please select a submission and provide a grade');
      return;
    }

    onUpdateGrade(selectedSubmission.id, grade, feedback);
    
    // Reset form
    setSelectedSubmission(null);
    setGrade('');
    setFeedback('');
  };

  const getAssignmentDetails = (id) => {
    return assignments.find(a => a.id === parseInt(id)) || {};
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Assignment Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Assignment to Grade
        </label>
        <select
          value={selectedAssignment}
          onChange={(e) => {
            setSelectedAssignment(e.target.value);
            setSelectedSubmission(null);
          }}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Choose an assignment...</option>
          {assignments.map(assignment => (
            <option key={assignment.id} value={assignment.id}>
              {assignment.title}
            </option>
          ))}
        </select>
      </div>

      {selectedAssignment && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Submissions List */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Submissions</h3>
            {filteredSubmissions.length === 0 ? (
              <p className="text-gray-500">No submissions for this assignment.</p>
            ) : (
              <div className="space-y-4">
                {filteredSubmissions.map(submission => (
                  <div
                    key={submission.id}
                    onClick={() => setSelectedSubmission(submission)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedSubmission?.id === submission.id
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{submission.studentName}</p>
                        <p className="text-sm text-gray-600">
                          Submitted: {new Date(submission.submittedAt).toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-sm ${
                        submission.status === 'graded'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Grading Form */}
          {selectedSubmission && (
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Grade Submission</h3>
              <div className="mb-4">
                <h4 className="font-medium">Submission Details</h4>
                <p className="text-sm text-gray-600">Student: {selectedSubmission.studentName}</p>
                <p className="text-sm text-gray-600">
                  Assignment: {getAssignmentDetails(selectedSubmission.assignmentId).title}
                </p>
                {selectedSubmission.file && (
                  <p className="text-sm text-gray-600">
                    File: {selectedSubmission.file.name}
                  </p>
                )}
                {selectedSubmission.comments && (
                  <p className="text-sm text-gray-700 mt-2">
                    Student Comments: {selectedSubmission.comments}
                  </p>
                )}
              </div>

              <form onSubmit={handleGradeSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade *
                  </label>
                  <input
                    type="number"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    min="0"
                    max={getAssignmentDetails(selectedSubmission.assignmentId).maxPoints || 100}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Provide feedback to the student..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit Grade
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GradingInterface; 