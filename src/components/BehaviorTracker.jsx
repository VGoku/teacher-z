import React, { useState } from 'react';

const BehaviorTracker = ({ students, searchQuery, selectedClass }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [behaviorType, setBehaviorType] = useState('positive');
  const [comment, setComment] = useState('');

  // Mock data (replace with actual data from your system)
  const mockBehaviorData = [
    {
      id: 1,
      studentName: 'John Doe',
      class: '1-A',
      behaviors: [
        {
          id: 1,
          type: 'positive',
          date: '2024-02-05',
          category: 'Participation',
          description: 'Actively participated in class discussion',
          points: 5
        },
        {
          id: 2,
          type: 'negative',
          date: '2024-02-03',
          category: 'Tardiness',
          description: 'Late to class',
          points: -2
        }
      ],
      behaviorScore: 85
    }
    // Add more mock students as needed
  ];

  const behaviorCategories = {
    positive: [
      'Participation',
      'Helping Others',
      'Good Work',
      'Leadership',
      'Initiative'
    ],
    negative: [
      'Disruption',
      'Tardiness',
      'Missing Work',
      'Inappropriate Behavior',
      'Off Task'
    ]
  };

  const handleAddBehavior = (e) => {
    e.preventDefault();
    if (!selectedStudent || !comment) {
      alert('Please select a student and provide a comment');
      return;
    }
    // Add behavior logic here
    alert('Behavior recorded successfully!');
    setComment('');
  };

  return (
    <div className="space-y-6">
      {/* Behavior Entry Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Record Behavior</h3>
        <form onSubmit={handleAddBehavior} className="space-y-4">
          {/* Student Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Student
            </label>
            <select
              value={selectedStudent || ''}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Choose a student...</option>
              {mockBehaviorData.map(student => (
                <option key={student.id} value={student.id}>
                  {student.studentName} - Class {student.class}
                </option>
              ))}
            </select>
          </div>

          {/* Behavior Type */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setBehaviorType('positive')}
              className={`flex-1 py-2 px-4 rounded-md ${
                behaviorType === 'positive'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Positive
            </button>
            <button
              type="button"
              onClick={() => setBehaviorType('negative')}
              className={`flex-1 py-2 px-4 rounded-md ${
                behaviorType === 'negative'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Negative
            </button>
          </div>

          {/* Behavior Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select category...</option>
              {behaviorCategories[behaviorType].map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the behavior..."
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Record Behavior
          </button>
        </form>
      </div>

      {/* Behavior History */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Behavior History</h3>
        {mockBehaviorData.map(student => (
          <div key={student.id} className="mb-6 last:mb-0">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="font-medium">{student.studentName}</h4>
                <p className="text-sm text-gray-600">Class {student.class}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Behavior Score</p>
                <p className={`text-lg font-bold ${
                  student.behaviorScore >= 80 ? 'text-green-600' :
                  student.behaviorScore >= 60 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {student.behaviorScore}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {student.behaviors.map(behavior => (
                <div
                  key={behavior.id}
                  className={`p-3 rounded-lg ${
                    behavior.type === 'positive'
                      ? 'bg-green-50 border border-green-100'
                      : 'bg-red-50 border border-red-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{behavior.category}</p>
                      <p className="text-sm text-gray-600">{behavior.description}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${
                        behavior.type === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {behavior.points > 0 ? '+' : ''}{behavior.points} points
                      </span>
                      <p className="text-xs text-gray-500">{behavior.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BehaviorTracker; 