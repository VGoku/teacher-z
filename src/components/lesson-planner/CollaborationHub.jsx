import React, { useState } from 'react';

const CollaborationHub = ({ lessons, resources, onLessonUpdate }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [comment, setComment] = useState('');
  const [collaborators, setCollaborators] = useState([
    { id: 1, name: 'Jane Smith', subject: 'Mathematics' },
    { id: 2, name: 'John Doe', subject: 'Science' },
    { id: 3, name: 'Alice Johnson', subject: 'English' }
  ]);

  const handleAddComment = () => {
    if (!comment.trim() || !selectedLesson) return;

    const updatedLesson = {
      ...selectedLesson,
      comments: [
        ...(selectedLesson.comments || []),
        {
          id: Date.now(),
          text: comment,
          author: 'Current User',
          timestamp: new Date().toISOString()
        }
      ]
    };

    onLessonUpdate(updatedLesson);
    setComment('');
  };

  const handleShareLesson = (collaboratorId) => {
    if (!selectedLesson) return;

    const updatedLesson = {
      ...selectedLesson,
      sharedWith: [
        ...(selectedLesson.sharedWith || []),
        collaboratorId
      ]
    };

    onLessonUpdate(updatedLesson);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Lessons List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Your Lessons</h2>
        <div className="space-y-3">
          {lessons.map(lesson => (
            <div
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedLesson?.id === lesson.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:border-gray-300'
              }`}
            >
              <h3 className="font-medium">{lesson.title}</h3>
              <p className="text-sm text-gray-600">
                {lesson.class} - {lesson.subject}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(lesson.date).toLocaleDateString()}
              </p>
              {lesson.sharedWith && lesson.sharedWith.length > 0 && (
                <div className="mt-2 flex gap-1">
                  {lesson.sharedWith.map(id => {
                    const collaborator = collaborators.find(c => c.id === id);
                    return collaborator ? (
                      <span
                        key={id}
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full"
                      >
                        {collaborator.name}
                      </span>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Collaboration Panel */}
      <div className="space-y-6 md:col-span-2">
        {selectedLesson ? (
          <>
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">
                Collaboration for: {selectedLesson.title}
              </h2>

              {/* Share with Collaborators */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Share with Teachers</h3>
                <div className="space-y-2">
                  {collaborators.map(collaborator => (
                    <div
                      key={collaborator.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{collaborator.name}</p>
                        <p className="text-sm text-gray-600">
                          {collaborator.subject}
                        </p>
                      </div>
                      <button
                        onClick={() => handleShareLesson(collaborator.id)}
                        disabled={selectedLesson.sharedWith?.includes(collaborator.id)}
                        className={`px-4 py-2 rounded-md ${
                          selectedLesson.sharedWith?.includes(collaborator.id)
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        {selectedLesson.sharedWith?.includes(collaborator.id)
                          ? 'Shared'
                          : 'Share'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div>
                <h3 className="text-lg font-medium mb-3">Comments</h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 px-3 py-2 border rounded-md"
                    />
                    <button
                      onClick={handleAddComment}
                      disabled={!comment.trim()}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
                    >
                      Add
                    </button>
                  </div>

                  <div className="space-y-3">
                    {selectedLesson.comments?.map(comment => (
                      <div
                        key={comment.id}
                        className="p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium">
                            {comment.author}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Shared Resources */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-medium mb-3">Shared Resources</h3>
              <div className="space-y-2">
                {resources
                  .filter(resource => selectedLesson.materials?.includes(resource.id))
                  .map(resource => (
                    <div
                      key={resource.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{resource.title}</p>
                        <p className="text-sm text-gray-600">
                          {resource.type} • {resource.subject}
                        </p>
                      </div>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                      >
                        View
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a lesson to start collaborating
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationHub; 