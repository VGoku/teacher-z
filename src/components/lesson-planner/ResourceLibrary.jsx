import React, { useState } from 'react';

const ResourceLibrary = ({ resources, onAddResource }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'document',
    subject: '',
    description: '',
    url: '',
    tags: []
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [filterSubject, setFilterSubject] = useState('');
  const [filterType, setFilterType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const resourceTypes = [
    'document',
    'presentation',
    'video',
    'worksheet',
    'quiz',
    'link',
    'other'
  ];

  const commonTags = [
    'homework',
    'exam',
    'practice',
    'reading',
    'writing',
    'group work',
    'individual',
    'interactive'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      }
      return [...prev, tag];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddResource({
      ...formData,
      tags: selectedTags,
      id: Date.now(),
      dateAdded: new Date().toISOString()
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'document',
      subject: '',
      description: '',
      url: '',
      tags: []
    });
    setSelectedTags([]);
  };

  const filteredResources = resources.filter(resource => {
    const matchesSubject = !filterSubject || resource.subject.toLowerCase() === filterSubject.toLowerCase();
    const matchesType = !filterType || resource.type === filterType;
    const matchesSearch = !searchQuery || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesType && matchesSearch;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Resource Form */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Add New Resource</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resource Title *
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
                Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                {resourceTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resource URL *
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {commonTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Resource
          </button>
        </form>
      </div>

      {/* Resources List */}
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Resource Library</h2>
          
          {/* Filters */}
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
            
            <div className="grid grid-cols-2 gap-3">
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="">All Subjects</option>
                {Array.from(new Set(resources.map(r => r.subject))).map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="">All Types</option>
                {resourceTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredResources.length === 0 ? (
            <p className="text-gray-500">No resources found.</p>
          ) : (
            filteredResources.map(resource => (
              <div
                key={resource.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-gray-600">
                      {resource.subject} - {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </p>
                    {resource.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {resource.description}
                      </p>
                    )}
                  </div>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Open
                  </a>
                </div>

                {resource.tags && resource.tags.length > 0 && (
                  <div className="mt-2 pt-2 border-t">
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary; 