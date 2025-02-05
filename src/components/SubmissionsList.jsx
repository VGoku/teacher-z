import React, { useState } from 'react';

const SubmissionsList = ({ assignments, submissions, onSubmissionAdd }) => {
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [studentName, setStudentName] = useState('');
  const [submissionFile, setSubmissionFile] = useState(null);
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAssignment || !studentName || !submissionFile) {
      alert('Please fill in all required fields and attach a file');
      return;
    }

    const assignment = assignments.find(a => a.id === parseInt(selectedAssignment));
    if (!assignment) return;

    const newSubmission = {
      assignmentId: assignment.id,
      assignmentTitle: assignment.title,
      studentName,
      file: {
        name: submissionFile.name,
        type: submissionFile.type,
        size: submissionFile.size
      },
      comments,
      submittedAt: new Date().toISOString(),
      status: 'submitted'
    };

    onSubmissionAdd(newSubmission);
    
    // Reset form
    setSelectedAssignment('');
    setStudentName('');
    setSubmissionFile(null);
    setComments('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubmissionFile(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Submit Assignment</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Assignment Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Assignment *
            </label>
            <select
              value={selectedAssignment}
              onChange={(e) => setSelectedAssignment(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Choose an assignment...</option>
              {assignments.map(assignment => (
                <option key={assignment.id} value={assignment.id}>
                  {assignment.title} (Due: {new Date(assignment.dueDate).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          {/* Student Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Name *
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Assignment *
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comments
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Assignment
            </button>
          </div>
        </form>
      </div>

      {/* Submissions List */}
      <div>
        <h2 className="text-2xl font-bold mb-6">All Submissions</h2>
        {submissions.length === 0 ? (
          <p className="text-gray-500">No submissions yet.</p>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{submission.assignmentTitle}</h3>
                    <p className="text-sm text-gray-600">Student: {submission.studentName}</p>
                    <p className="text-sm text-gray-600">
                      Submitted: {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                    {submission.file && (
                      <p className="text-sm text-gray-600">
                        File: {submission.file.name} ({(submission.file.size / 1024).toFixed(2)} KB)
                      </p>
                    )}
                    {submission.comments && (
                      <p className="text-sm text-gray-700 mt-2">
                        Comments: {submission.comments}
                      </p>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    submission.status === 'graded' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                  </span>
                </div>
                {submission.grade && (
                  <div className="mt-2 pt-2 border-t">
                    <p className="text-sm font-medium">
                      Grade: {submission.grade}
                      {submission.feedback && ` - ${submission.feedback}`}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionsList; 