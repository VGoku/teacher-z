import React, { useState } from 'react';
import ResourceUploadForm from './ResourceUploadForm';
import ResourceList from './ResourceList';

const ResourceDashboard = () => {
  const [resources, setResources] = useState([]);

  const addResource = (resource) => {
    setResources([...resources, resource]);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">Resource Sharing & Collaboration Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <ResourceUploadForm addResource={addResource} />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <ResourceList resources={resources} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDashboard; 