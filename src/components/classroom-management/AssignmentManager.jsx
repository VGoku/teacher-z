import React, { useState } from 'react';

const AssignmentManager = ({
  assignments,
  students,
  onAddAssignment,
  selectedClass
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    dueDate: '',
    totalPoints: '',
    instructions: '',
    attachments: []
  });

  const assignmentTypes = [
    'Homework',
    'Quiz',
    'Test',
    'Project',
    'Essay',
    'Lab Report',
    'Presentation'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAssignment({
      ...formData,
      id: Date.now(),
      classId: selectedClass,
      createdAt: new Date().toISOString(),
      completed: false,
      submissions: []
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: '',
      dueDate: '',
      totalPoints: '',
      instructions: '',
      attachments: []
    });
    setShowAddForm(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDueStatus = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: 'Overdue', class: 'bg-red-100 text-red-800' };
    if (diffDays === 0) return { text: 'Due Today', class: 'bg-yellow-100 text-yellow-800' };
    if (diffDays <= 3) return { text: 'Due Soon', class: 'bg-orange-100 text-orange-800' };
    return { text: 'Upcoming', class: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Assignment Manager</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showAddForm ? 'Cancel' : 'Add New Assignment'}
        </button>
      </div>

      {/* Add Assignment Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assignment Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                {assignmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="datetime-local"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Points
              </label>
              <input
                type="number"
                name="totalPoints"
                value={formData.totalPoints}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="2"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instructions
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attachments
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.attachments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Assignment
            </button>
          </div>
        </form>
      )}

      {/* Assignment List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments
          .filter(assignment => !selectedClass || assignment.classId === selectedClass)
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          .map(assignment => {
            const status = getDueStatus(assignment.dueDate);
            return (
              <div
                key={assignment.id}
                className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{assignment.title}</h3>
                  <span className={`px-2 py-1 rounded text-sm ${status.class}`}>
                    {status.text}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">{assignment.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-medium">{assignment.type}</span>
                    <span>•</span>
                    <span>{assignment.totalPoints} points</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div className="text-gray-500">
                    Due: {formatDate(assignment.dueDate)}
                  </div>
                  <div className="text-gray-500">
                    {assignment.submissions.length}/{students.length} submitted
                  </div>
                </div>

                {assignment.attachments.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Attachments ({assignment.attachments.length})
                    </h4>
                    <div className="space-y-1">
                      {assignment.attachments.map((file, index) => (
                        <div
                          key={index}
                          className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                        >
                          {file.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AssignmentManager; 