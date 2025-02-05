import React, { useState } from 'react';

const LiveQuiz = ({ sessionData, onStartQuiz, onParticipantJoin, onScoreUpdate }) => {
  const [quizForm, setQuizForm] = useState({
    title: '',
    type: 'quiz', // quiz or poll
    questions: [],
    timeLimit: 30, // seconds per question
    showResults: true
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    text: '',
    type: 'multiple_choice',
    options: ['', '', '', ''],
    correctAnswer: 0
  });

  const questionTypes = [
    { id: 'multiple_choice', label: 'Multiple Choice' },
    { id: 'true_false', label: 'True/False' },
    { id: 'poll', label: 'Poll' }
  ];

  const handleQuestionChange = (field, value) => {
    setCurrentQuestion(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptionChange = (index, value) => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const addQuestion = () => {
    if (!currentQuestion.text || currentQuestion.options.some(opt => !opt)) {
      alert('Please fill in all fields');
      return;
    }

    setQuizForm(prev => ({
      ...prev,
      questions: [...prev.questions, { ...currentQuestion, id: Date.now() }]
    }));

    setCurrentQuestion({
      text: '',
      type: 'multiple_choice',
      options: ['', '', '', ''],
      correctAnswer: 0
    });
  };

  const startQuiz = () => {
    if (quizForm.questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    onStartQuiz({
      ...quizForm,
      id: Date.now(),
      status: 'active',
      currentQuestionIndex: 0,
      responses: {}
    });
  };

  return (
    <div className="space-y-6">
      {!sessionData.activeQuiz ? (
        <>
          {/* Quiz Setup Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={quizForm.title}
                onChange={(e) => setQuizForm(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter quiz title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={quizForm.type}
                  onChange={(e) => setQuizForm(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="quiz">Quiz</option>
                  <option value="poll">Poll</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Limit (seconds)
                </label>
                <input
                  type="number"
                  value={quizForm.timeLimit}
                  onChange={(e) => setQuizForm(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border rounded-md"
                  min="5"
                  max="300"
                />
              </div>
            </div>

            {/* Add Question Form */}
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium mb-3">Add Question</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Text
                  </label>
                  <input
                    type="text"
                    value={currentQuestion.text}
                    onChange={(e) => handleQuestionChange('text', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter your question"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Type
                  </label>
                  <select
                    value={currentQuestion.type}
                    onChange={(e) => handleQuestionChange('type', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    {questionTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {currentQuestion.type !== 'true_false' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Options
                    </label>
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          className="flex-1 px-3 py-2 border rounded-md"
                          placeholder={`Option ${index + 1}`}
                        />
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={currentQuestion.correctAnswer === index}
                          onChange={() => handleQuestionChange('correctAnswer', index)}
                          className="mt-3"
                          disabled={quizForm.type === 'poll'}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={addQuestion}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Add Question
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium mb-3">Questions ({quizForm.questions.length})</h3>
              <div className="space-y-2">
                {quizForm.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">Q{index + 1}:</span> {question.text}
                      </div>
                      <button
                        onClick={() => setQuizForm(prev => ({
                          ...prev,
                          questions: prev.questions.filter(q => q.id !== question.id)
                        }))}
                        className="text-red-500 hover:text-red-600"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {question.type === 'true_false' ? (
                        <p>True/False Question</p>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {question.options.map((opt, i) => (
                            <div
                              key={i}
                              className={`p-1 rounded ${
                                i === question.correctAnswer && quizForm.type !== 'poll'
                                  ? 'bg-green-100'
                                  : ''
                              }`}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={startQuiz}
              disabled={quizForm.questions.length === 0}
              className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 disabled:bg-gray-300"
            >
              Start {quizForm.type === 'quiz' ? 'Quiz' : 'Poll'}
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Active Quiz View */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{sessionData.activeQuiz.title}</h2>
            <p className="text-gray-600 mb-6">
              Share this code with your students: <span className="font-mono font-bold">{sessionData.activeQuiz.id}</span>
            </p>

            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <p className="text-lg font-medium">
                  Question {sessionData.activeQuiz.currentQuestionIndex + 1} of {sessionData.activeQuiz.questions.length}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${((sessionData.activeQuiz.currentQuestionIndex + 1) / sessionData.activeQuiz.questions.length) * 100}%`
                    }}
                  ></div>
                </div>
              </div>

              <div className="text-left mb-6">
                <h3 className="text-xl font-medium mb-4">
                  {sessionData.activeQuiz.questions[sessionData.activeQuiz.currentQuestionIndex].text}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {sessionData.activeQuiz.questions[sessionData.activeQuiz.currentQuestionIndex].options.map((option, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg text-center hover:bg-gray-50 cursor-pointer"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => {/* Handle previous question */}}
                  disabled={sessionData.activeQuiz.currentQuestionIndex === 0}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400"
                >
                  Previous
                </button>
                <button
                  onClick={() => {/* Handle next question */}}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {sessionData.activeQuiz.currentQuestionIndex === sessionData.activeQuiz.questions.length - 1
                    ? 'End Quiz'
                    : 'Next Question'
                  }
                </button>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Participants</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {sessionData.participants.map(participant => (
                  <div
                    key={participant.id}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                  >
                    {participant.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LiveQuiz; 