import React, { useState } from 'react';

const ResourceLibrary = ({
  resources,
  searchQuery,
  filters,
  onUpdateResource,
  onRateResource,
  onShareResource
}) => {
  const [selectedResource, setSelectedResource] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [shareRecipients, setShareRecipients] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Filter resources based on search query and filters
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchQuery
      ? resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;

    const matchesSubject = filters.subject
      ? resource.subject === filters.subject
      : true;

    const matchesGrade = filters.grade
      ? resource.grade === filters.grade
      : true;

    const matchesType = filters.type
      ? resource.type === filters.type
      : true;

    const matchesTags = filters.tags.length > 0
      ? filters.tags.every(tag => resource.tags.includes(tag))
      : true;

    return matchesSearch && matchesSubject && matchesGrade && matchesType && matchesTags;
  });

  const handleRatingSubmit = () => {
    if (!rating) return;
    onRateResource(selectedResource.id, rating, review);
    setShowRatingModal(false);
    setRating(0);
    setReview('');
  };

  const handleShareSubmit = () => {
    if (shareRecipients.length === 0) return;
    onShareResource(selectedResource.id, shareRecipients);
    setShowShareModal(false);
    setShareRecipients([]);
  };

  const getAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 'Not rated';
    const avg = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
    return avg.toFixed(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      {/* View Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Resources ({filteredResources.length})</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${
              viewMode === 'grid'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${
              viewMode === 'list'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Resources Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
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
                  Rating: {getAverageRating(resource.ratings)}
                </span>
                <span>
                  {formatDate(resource.uploadDate)}
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedResource(resource);
                    setShowRatingModal(true);
                  }}
                  className="flex-1 px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                >
                  Rate
                </button>
                <button
                  onClick={() => {
                    setSelectedResource(resource);
                    setShowShareModal(true);
                  }}
                  className="flex-1 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                >
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResources.map(resource => (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{resource.title}</h3>
                  <p className="text-sm text-gray-600">
                    {resource.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    resource.type === 'Lesson Plan' ? 'bg-blue-100 text-blue-800' :
                    resource.type === 'Worksheet' ? 'bg-green-100 text-green-800' :
                    resource.type === 'Assessment' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {resource.type}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(resource.uploadDate)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 my-2">
                {resource.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  Rating: {getAverageRating(resource.ratings)}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedResource(resource);
                      setShowRatingModal(true);
                    }}
                    className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                  >
                    Rate
                  </button>
                  <button
                    onClick={() => {
                      setSelectedResource(resource);
                      setShowShareModal(true);
                    }}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">
              Rate "{selectedResource.title}"
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-2xl ${
                        rating >= star ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review (optional)
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleRatingSubmit}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
                <button
                  onClick={() => {
                    setShowRatingModal(false);
                    setRating(0);
                    setReview('');
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">
              Share "{selectedResource.title}"
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Share with
                </label>
                <select
                  multiple
                  value={shareRecipients}
                  onChange={(e) => {
                    const values = Array.from(
                      e.target.selectedOptions,
                      option => option.value
                    );
                    setShareRecipients(values);
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                  size="5"
                >
                  <option value="teacher1">John Doe (Mathematics)</option>
                  <option value="teacher2">Jane Smith (Science)</option>
                  <option value="teacher3">Bob Wilson (English)</option>
                  <option value="teacher4">Alice Brown (History)</option>
                  <option value="teacher5">Charlie Davis (Art)</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleShareSubmit}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Share
                </button>
                <button
                  onClick={() => {
                    setShowShareModal(false);
                    setShareRecipients([]);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No resources found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ResourceLibrary; 