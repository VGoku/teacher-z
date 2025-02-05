import React from 'react';

const SharedResources = ({ resources, onRateResource }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Shared Resources</h2>
      
      {resources.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No resources have been shared with you yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(resource => (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{resource.title}</h3>
                <span className={`px-2 py-1 rounded text-sm ${
                  resource.type === 'Lesson Plan' ? 'bg-blue-100 text-blue-800' :
                  resource.type === 'Worksheet' ? 'bg-green-100 text-green-800' :
                  resource.type === 'Assessment' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
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

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                  Shared by: {resource.shares[0].sharedBy}
                </span>
                <span>
                  {formatDate(resource.shares[0].timestamp)}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t">
                <button
                  onClick={() => onRateResource(resource.id)}
                  className="w-full px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                >
                  Rate Resource
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SharedResources; 