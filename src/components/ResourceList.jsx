import React from 'react';

const ResourceList = ({ resources }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Resource Library</h2>
      {resources.length === 0 ? (
        <p>No resources uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {resources.map((resource, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <p className="font-semibold">Title: {resource.title}</p>
              <p>Subject: {resource.subject}</p>
              {resource.gradeLevel && <p>Grade Level: {resource.gradeLevel}</p>}
              {resource.description && <p>Description: {resource.description}</p>}
              {resource.file && <p>File: {resource.file}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResourceList; 