import React from 'react';

const CommunicationList = ({ messages }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sent Messages</h2>
      {messages.length === 0 ? (
        <p>No messages sent yet.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <p className="font-semibold">To: {msg.recipient}</p>
              <p>Subject: {msg.subject}</p>
              <p>Message: {msg.body}</p>
              <p>Type: {msg.messageType}</p>
              {msg.scheduleDate && <p>Scheduled At: {msg.scheduleDate}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommunicationList; 