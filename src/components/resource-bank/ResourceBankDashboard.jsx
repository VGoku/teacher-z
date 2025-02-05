import React, { useState } from 'react';
import ResourceUploader from './ResourceUploader';
import ResourceLibrary from './ResourceLibrary';
import ResourceSearch from './ResourceSearch';
import SharedResources from './SharedResources';
import ResourceSuggestions from './ResourceSuggestions';

const ResourceBankDashboard = () => {
  const [activeTab, setActiveTab] = useState('library');
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    subject: '',
    grade: '',
    type: '',
    tags: []
  });

  const tabs = [
    { id: 'library', label: 'My Resources', icon: '📚' },
    { id: 'upload', label: 'Upload New', icon: '⬆️' },
    { id: 'shared', label: 'Shared With Me', icon: '🤝' },
    { id: 'suggestions', label: 'Suggested', icon: '💡' }
  ];

  const handleAddResource = (newResource) => {
    setResources(prev => [...prev, {
      ...newResource,
      id: Date.now(),
      uploadedBy: 'Current User',
      uploadDate: new Date().toISOString(),
      ratings: [],
      reviews: [],
      shares: []
    }]);
  };

  const handleUpdateResource = (updatedResource) => {
    setResources(prev => prev.map(resource => 
      resource.id === updatedResource.id ? updatedResource : resource
    ));
  };

  const handleRateResource = (resourceId, rating, review = '') => {
    setResources(prev => prev.map(resource => {
      if (resource.id === resourceId) {
        return {
          ...resource,
          ratings: [...resource.ratings, { rating, timestamp: new Date().toISOString() }],
          ...(review && {
            reviews: [...resource.reviews, {
              text: review,
              rating,
              timestamp: new Date().toISOString(),
              author: 'Current User'
            }]
          })
        };
      }
      return resource;
    }));
  };

  const handleShareResource = (resourceId, recipients) => {
    setResources(prev => prev.map(resource => {
      if (resource.id === resourceId) {
        return {
          ...resource,
          shares: [...resource.shares, {
            recipients,
            timestamp: new Date().toISOString(),
            sharedBy: 'Current User'
          }]
        };
      }
      return resource;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Subject Resource Bank
          </h1>

          {/* Quick Search */}
          <div className="flex gap-4">
            <ResourceSearch
              onSearch={setSearchQuery}
              onFilterChange={setSelectedFilters}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Total Resources</h3>
            <p className="text-2xl font-bold text-blue-600">{resources.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Shared Resources</h3>
            <p className="text-2xl font-bold text-green-600">
              {resources.filter(r => r.shares.length > 0).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {resources.length > 0
                ? (resources.reduce((acc, r) => {
                    const avg = r.ratings.reduce((sum, rating) => sum + rating.rating, 0) / r.ratings.length;
                    return acc + (avg || 0);
                  }, 0) / resources.length).toFixed(1)
                : 'N/A'}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Most Used Subject</h3>
            <p className="text-2xl font-bold text-purple-600">
              {resources.length > 0
                ? Object.entries(
                    resources.reduce((acc, r) => {
                      acc[r.subject] = (acc[r.subject] || 0) + 1;
                      return acc;
                    }, {})
                  ).sort(([,a], [,b]) => b - a)[0][0]
                : 'N/A'}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 font-medium rounded-t-lg transition-colors
                ${activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'library' && (
            <ResourceLibrary
              resources={resources}
              searchQuery={searchQuery}
              filters={selectedFilters}
              onUpdateResource={handleUpdateResource}
              onRateResource={handleRateResource}
              onShareResource={handleShareResource}
            />
          )}

          {activeTab === 'upload' && (
            <ResourceUploader
              onAddResource={handleAddResource}
            />
          )}

          {activeTab === 'shared' && (
            <SharedResources
              resources={resources.filter(r => 
                r.shares.some(share => 
                  share.recipients.includes('Current User')
                )
              )}
              onRateResource={handleRateResource}
            />
          )}

          {activeTab === 'suggestions' && (
            <ResourceSuggestions
              userResources={resources}
              onAddResource={handleAddResource}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceBankDashboard; 