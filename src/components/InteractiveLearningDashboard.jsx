import React from 'react';
import FlashcardsTool from './FlashcardsTool';
import VirtualWhiteboard from './VirtualWhiteboard';

const InteractiveLearningDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Interactive Learning Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <FlashcardsTool />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <VirtualWhiteboard />
        </div>
      </div>
    </div>
  );
};

export default InteractiveLearningDashboard; 