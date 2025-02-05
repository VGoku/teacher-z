import React, { useState } from 'react';
import CommunicationForm from './CommunicationForm';
import CommunicationList from './CommunicationList';

const CommunicationDashboard = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Communication Platform Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <CommunicationForm addMessage={addMessage} />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <CommunicationList messages={messages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationDashboard; 