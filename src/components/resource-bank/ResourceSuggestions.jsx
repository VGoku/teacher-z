import React from 'react';

const ResourceSuggestions = ({ userResources, onAddResource }) => {
  // Mock suggested resources (in a real app, these would come from an API based on user's preferences and history)
  const suggestedResources = [
    {
      id: 'sug1',
      title: 'Interactive Math Games Collection',
      description: 'A curated collection of engaging math games for various grade levels.',
      type: 'Activity',
      subject: 'Mathematics',
      grade: '6-8',
      tags: ['Interactive', 'Games', 'STEM'],
      rating: 4.8,
      downloads: 1250
    },
    {
      id: 'sug2',
      title: 'Science Lab Safety Guidelines',
      description: 'Comprehensive guide for maintaining safety in school science laboratories.',
      type: 'Reference',
      subject: 'Science',
      grade: '9-12',
      tags: ['Safety', 'Lab Work', 'Guidelines'],
      rating: 4.9,
      downloads: 2100
    },
    {
      id: 'sug3',
      title: 'Literature Analysis Framework',
      description: 'Structured approach to analyzing literary works with student worksheets.',
      type: 'Worksheet',
      subject: 'English',
      grade: '9-12',
      tags: ['Literature', 'Analysis', 'Critical Thinking'],
      rating: 4.7,
      downloads: 1800
    }
  ];

  const handleAddToLibrary = (resource) => {
    onAddResource({
      ...resource,
      id: Date.now(),
      uploadDate: new Date().toISOString(),
      ratings: [],
      reviews: [],
      shares: []
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Suggested Resources</h2>
        <p className="text-sm text-gray-500">
          Based on your teaching subjects and grade levels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestedResources.map(resource => (
          <div
            key={resource.id}
            className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{resource.title}</h3>
              <span className={`px-2 py-1 rounded text-sm ${
                resource.type === 'Activity' ? 'bg-green-100 text-green-800' :
                resource.type === 'Reference' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {resource.type}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {resource.description}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {resource.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span>
                {resource.subject} • Grade {resource.grade}
              </span>
              <span>
                ⭐ {resource.rating} ({resource.downloads} downloads)
              </span>
            </div>

            <button
              onClick={() => handleAddToLibrary(resource)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Add to My Library
            </button>
          </div>
        ))}
      </div>

      {/* More Suggestions Section */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Looking for More?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded shadow-sm">
            <h4 className="font-medium mb-2">Browse Categories</h4>
            <p className="text-sm text-gray-600">
              Explore resources by subject area or grade level
            </p>
          </div>
          <div className="p-4 bg-white rounded shadow-sm">
            <h4 className="font-medium mb-2">Popular This Week</h4>
            <p className="text-sm text-gray-600">
              See what other teachers are using
            </p>
          </div>
          <div className="p-4 bg-white rounded shadow-sm">
            <h4 className="font-medium mb-2">New Additions</h4>
            <p className="text-sm text-gray-600">
              Check out recently added resources
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceSuggestions; 