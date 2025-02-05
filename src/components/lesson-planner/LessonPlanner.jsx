import React, { useState } from 'react';

const LessonPlanner = ({ lessons, resources, onAddLesson, onUpdateLesson }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    class: '',
    subject: '',
    date: '',
    duration: '',
    objectives: '',
    activities: '',
    assessment: '',
    materials: [],
    status: 'planned'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMaterialsChange = (e) => {
    const selectedResources = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      materials: selectedResources
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedLesson) {
      onUpdateLesson({ ...formData, id: selectedLesson.id });
    } else {
      onAddLesson(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      class: '',
      subject: '',
      date: '',
      duration: '',
      objectives: '',
      activities: '',
      assessment: '',
      materials: [],
      status: 'planned'
    });
    setSelectedLesson(null);
    setIsEditing(false);
  };

  const editLesson = (lesson) => {
    setSelectedLesson(lesson);
    setFormData(lesson);
    setIsEditing(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Lesson Form */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Edit Lesson Plan' : 'Create New Lesson Plan'}
          </h2>
          {isEditing && (
            <button
              onClick={resetForm}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lesson Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class *
              </label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes) *
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Learning Objectives *
            </label>
            <textarea
              name="objectives"
              value={formData.objectives}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class Activities *
            </label>
            <textarea
              name="activities"
              value={formData.activities}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assessment Methods
            </label>
            <textarea
              name="assessment"
              value={formData.assessment}
              onChange={handleInputChange}
              rows="2"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teaching Materials
            </label>
            <select
              multiple
              name="materials"
              value={formData.materials}
              onChange={handleMaterialsChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              {resources.map(resource => (
                <option key={resource.id} value={resource.id}>
                  {resource.title}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Hold Ctrl/Cmd to select multiple items
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="planned">Planned</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {isEditing ? 'Update Lesson Plan' : 'Create Lesson Plan'}
          </button>
        </form>
      </div>

      {/* Lessons List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Lesson Plans</h2>
        <div className="space-y-4">
          {lessons.length === 0 ? (
            <p className="text-gray-500">No lesson plans created yet.</p>
          ) : (
            lessons.map(lesson => (
              <div
                key={lesson.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{lesson.title}</h3>
                    <p className="text-sm text-gray-600">
                      {lesson.class} - {lesson.subject}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(lesson.date).toLocaleDateString()} ({lesson.duration} mins)
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    lesson.status === 'completed' ? 'bg-green-100 text-green-800' :
                    lesson.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {lesson.status}
                  </span>
                </div>

                <div className="mt-2 pt-2 border-t">
                  <button
                    onClick={() => editLesson(lesson)}
                    className="text-blue-500 hover:text-blue-600 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onUpdateLesson({
                        ...lesson,
                        status: lesson.status === 'completed' ? 'planned' : 'completed'
                      });
                    }}
                    className="text-green-500 hover:text-green-600"
                  >
                    {lesson.status === 'completed' ? 'Reopen' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPlanner; 