import React, { useState, useEffect } from 'react';
import LessonTemplates from './LessonTemplates';
import ObjectiveTracker from './ObjectiveTracker';
import ResourceManager from './ResourceManager';
import { useNavigate } from 'react-router-dom';

const LessonPlanner = ({ lessons, resources, onAddLesson, onUpdateLesson }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('form');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    class: '',
    subject: '',
    date: '',
    duration: '',
    objectives: [],
    activities: '',
    assessment: '',
    materials: [],
    resources: [],
    status: 'planned',
    collaborators: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleObjectivesUpdate = (objectives) => {
    setFormData(prev => ({
      ...prev,
      objectives
    }));
  };

  const handleResourcesUpdate = (resources) => {
    setFormData(prev => ({
      ...prev,
      resources
    }));
  };

  const handleTemplateSelect = (template) => {
    setFormData(prev => ({
      ...prev,
      title: template.title,
      objectives: template.objectives.split('\n').map((obj, index) => ({
        id: Date.now() + index,
        description: obj.replace(/^\d+\.\s*/, ''),
        progress: 0,
        targetDate: formData.date,
        notes: '',
        successCriteria: [],
        resources: []
      })),
      activities: template.activities,
      assessment: template.assessment,
      duration: template.duration
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lessonData = {
      ...formData,
      id: selectedLesson?.id || Date.now().toString(),
      lastModified: new Date().toISOString()
    };

    if (selectedLesson) {
      await onUpdateLesson(lessonData);
    } else {
      await onAddLesson(lessonData);
    }

    resetForm();
    setActiveTab('form');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      class: '',
      subject: '',
      date: '',
      duration: '',
      objectives: [],
      activities: '',
      assessment: '',
      materials: [],
      resources: [],
      status: 'planned',
      collaborators: []
    });
    setSelectedLesson(null);
    setIsEditing(false);
  };

  const editLesson = (lesson) => {
    setSelectedLesson(lesson);
    setFormData(lesson);
    setIsEditing(true);
    setActiveTab('form');
  };

  const handleExport = () => {
    const lessonJson = JSON.stringify(formData, null, 2);
    const blob = new Blob([lessonJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.title.toLowerCase().replace(/\s+/g, '-')}-lesson-plan.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="border-b">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('form')}
            className={`py-2 px-4 ${activeTab === 'form'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Lesson Details
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-2 px-4 ${activeTab === 'templates'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('objectives')}
            className={`py-2 px-4 ${activeTab === 'objectives'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Objectives
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`py-2 px-4 ${activeTab === 'resources'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Resources
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'form' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {isEditing ? 'Edit Lesson Plan' : 'Create New Lesson Plan'}
              </h2>
              <div className="flex gap-2">
                {isEditing && (
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  disabled={!formData.title}
                >
                  Export
                </button>
              </div>
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
        )}

        {activeTab === 'templates' && (
          <LessonTemplates
            onApplyTemplate={handleTemplateSelect}
            onSaveTemplate={(templates) => {
              // Handle saving templates to backend/storage
              console.log('Saving templates:', templates);
            }}
          />
        )}

        {activeTab === 'objectives' && (
          <ObjectiveTracker
            objectives={formData.objectives}
            onUpdateObjectives={handleObjectivesUpdate}
          />
        )}

        {activeTab === 'resources' && (
          <ResourceManager
            resources={formData.resources}
            onAddResource={(resource) => {
              setFormData(prev => ({
                ...prev,
                resources: [...prev.resources, resource]
              }));
            }}
            onUpdateResource={(resource) => {
              setFormData(prev => ({
                ...prev,
                resources: prev.resources.map(r =>
                  r.id === resource.id ? resource : r
                )
              }));
            }}
            onDeleteResource={(resourceId) => {
              setFormData(prev => ({
                ...prev,
                resources: prev.resources.filter(r => r.id !== resourceId)
              }));
            }}
          />
        )}
      </div>

      {/* Lessons List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Lesson Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map(lesson => (
            <div
              key={lesson.id}
              className="border rounded-lg p-4 space-y-2 hover:border-blue-500 cursor-pointer"
              onClick={() => editLesson(lesson)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{lesson.title}</h3>
                <span
                  className={`text-sm px-2 py-1 rounded-md ${lesson.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : lesson.status === 'in-progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                >
                  {lesson.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {lesson.class} - {lesson.subject}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(lesson.date).toLocaleDateString()}
              </p>
              <div className="flex justify-between items-center pt-2 text-sm">
                <span>{lesson.duration} minutes</span>
                <span className="text-gray-500">
                  {lesson.objectives.length} objectives
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonPlanner; 