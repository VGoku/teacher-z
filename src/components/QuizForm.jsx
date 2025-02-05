import React, { useState } from 'react';

const QuizForm = ({ addQuiz }) => {
  const [title, setTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  // State for a new question
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("multiple_choice");
  const [answerOptions, setAnswerOptions] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const addQuestion = () => {
    if (!questionText) {
      alert("Please enter a question text.");
      return;
    }
    const newQuestion = { questionText, questionType, answerOptions, correctAnswer };
    setQuestions([...questions, newQuestion]);
    // Clear question fields
    setQuestionText("");
    setQuestionType("multiple_choice");
    setAnswerOptions("");
    setCorrectAnswer("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !timeLimit) {
      alert("Quiz title and time limit are required.");
      return;
    }
    const quiz = { title, timeLimit, description, questions };
    addQuiz(quiz);
    // Clear the quiz form fields
    setTitle("");
    setTimeLimit("");
    setDescription("");
    setQuestions([]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create New Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Time Limit (minutes)"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <div className="border p-4 rounded">
          <h3 className="text-lg font-bold mb-2">Add Question</h3>
          <input
            type="text"
            placeholder="Question Text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          >
            <option value="multiple_choice">Multiple Choice</option>
            <option value="true_false">True/False</option>
            <option value="short_answer">Short Answer</option>
          </select>
          {questionType === "multiple_choice" && (
            <input
              type="text"
              placeholder="Answer Options (comma separated)"
              value={answerOptions}
              onChange={(e) => setAnswerOptions(e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />
          )}
          <input
            type="text"
            placeholder="Correct Answer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <button type="button" onClick={addQuestion} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Question
          </button>
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-bold">Added Questions:</h3>
          {questions.length === 0 ? (
            <p>No questions added.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {questions.map((q, index) => (
                <li key={index}>{q.questionText} ({q.questionType})</li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizForm; 