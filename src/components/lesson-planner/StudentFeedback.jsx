import React, { useState } from 'react';

const StudentFeedback = ({ lessons, onLessonUpdate }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 5,
    understanding: 5,
    engagement: 5,
    comment: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackForm(prev => ({
      ...prev,
      [name]: name === 'comment' ? value : Number(value)
    }));
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!selectedLesson) return;

    const updatedLesson = {
      ...selectedLesson,
      feedback: [
        ...(selectedLesson.feedback || []),
        {
          id: Date.now(),
          ...feedbackForm,
          timestamp: new Date().toISOString()
        }
      ]
    };

    onLessonUpdate(updatedLesson);
    resetForm();
  };

  const resetForm = () => {
    setFeedbackForm({
      rating: 5,
      understanding: 5,
      engagement: 5,
      comment: ''
    });
  };

  const calculateAverages = (feedback) => {
    if (!feedback || feedback.length === 0) return null;

    const sum = feedback.reduce(
      (acc, curr) => ({
        rating: acc.rating + curr.rating,
        understanding: acc.understanding + curr.understanding,
        engagement: acc.engagement + curr.engagement
      }),
      { rating: 0, understanding: 0, engagement: 0 }
    );

    return {
      rating: (sum.rating / feedback.length).toFixed(1),
      understanding: (sum.understanding / feedback.length).toFixed(1),
      engagement: (sum.engagement / feedback.length).toFixed(1)
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Lessons List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Select Lesson</h2>
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
              {lesson.feedback && (
                <div className="mt-2 text-sm text-gray-600">
                  {lesson.feedback.length} feedback(s)
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Panel */}
      <div className="space-y-6 md:col-span-2">
        {selectedLesson ? (
          <>
            {/* Feedback Summary */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">
                Feedback Summary: {selectedLesson.title}
              </h2>

              {selectedLesson.feedback && selectedLesson.feedback.length > 0 ? (
                <>
                  {/* Average Ratings */}
                  {(() => {
                    const averages = calculateAverages(selectedLesson.feedback);
                    return (
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {averages.rating}
                          </div>
                          <div className="text-sm text-gray-600">
                            Overall Rating
                          </div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {averages.understanding}
                          </div>
                          <div className="text-sm text-gray-600">
                            Understanding
                          </div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {averages.engagement}
                          </div>
                          <div className="text-sm text-gray-600">
                            Engagement
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Individual Feedback */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Student Comments</h3>
                    {selectedLesson.feedback.map(feedback => (
                      <div
                        key={feedback.id}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex gap-4 mb-2">
                          <span className="text-sm">
                            Rating: {feedback.rating}/10
                          </span>
                          <span className="text-sm">
                            Understanding: {feedback.understanding}/10
                          </span>
                          <span className="text-sm">
                            Engagement: {feedback.engagement}/10
                          </span>
                        </div>
                        {feedback.comment && (
                          <p className="text-gray-700">{feedback.comment}</p>
                        )}
                        <div className="mt-2 text-sm text-gray-500">
                          {new Date(feedback.timestamp).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-500">No feedback received yet.</p>
              )}
            </div>

            {/* Feedback Form */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-medium mb-4">Submit Feedback</h3>
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Overall Rating (1-10)
                  </label>
                  <input
                    type="range"
                    name="rating"
                    min="1"
                    max="10"
                    value={feedbackForm.rating}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">
                    {feedbackForm.rating}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Understanding Level (1-10)
                  </label>
                  <input
                    type="range"
                    name="understanding"
                    min="1"
                    max="10"
                    value={feedbackForm.understanding}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">
                    {feedbackForm.understanding}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Engagement Level (1-10)
                  </label>
                  <input
                    type="range"
                    name="engagement"
                    min="1"
                    max="10"
                    value={feedbackForm.engagement}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">
                    {feedbackForm.engagement}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Comments
                  </label>
                  <textarea
                    name="comment"
                    value={feedbackForm.comment}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Share your thoughts about the lesson..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a lesson to view or submit feedback
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentFeedback; 