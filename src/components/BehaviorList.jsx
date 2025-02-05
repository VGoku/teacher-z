import React from 'react';

const BehaviorList = ({ records }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Behavior Records</h2>
      {records.length === 0 ? (
        <p>No behavior records yet.</p>
      ) : (
        <ul className="space-y-4">
          {records.map((record, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <p className="font-semibold">Student: {record.studentName}</p>
              <p>Date: {record.date}</p>
              <p>Note: {record.note}</p>
              {record.rewardPoints && <p>Reward Points: {record.rewardPoints}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BehaviorList; 