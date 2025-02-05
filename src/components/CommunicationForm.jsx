import React, { useState } from 'react';

const CommunicationForm = ({ addMessage }) => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [messageType, setMessageType] = useState('student');
  const [scheduleDate, setScheduleDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recipient || !subject || !body) {
      alert('Recipient, subject, and message body are required.');
      return;
    }
    const message = { recipient, subject, body, messageType, scheduleDate };
    addMessage(message);
    setRecipient('');
    setSubject('');
    setBody('');
    setMessageType('student');
    setScheduleDate('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Send Message</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Recipient (e.g., student name, parent email, group)"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Message body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <div className="flex items-center space-x-4">
          <div>
            <label className="mr-2">Type:</label>
            <select
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="student">Student-Teacher</option>
              <option value="parent">Parent Update</option>
              <option value="group">Group Message</option>
            </select>
          </div>
          <div>
            <label className="mr-2">Schedule (optional):</label>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default CommunicationForm; 