import React, { useState } from 'react';

const ObjectiveTracker = ({ objectives, onUpdateObjectives }) => {
    const [expandedObjective, setExpandedObjective] = useState(null);

    const handleProgressUpdate = (objectiveId, progress) => {
        const updatedObjectives = objectives.map(obj =>
            obj.id === objectiveId ? { ...obj, progress } : obj
        );
        onUpdateObjectives(updatedObjectives);
    };

    const handleNotesUpdate = (objectiveId, notes) => {
        const updatedObjectives = objectives.map(obj =>
            obj.id === objectiveId ? { ...obj, notes } : obj
        );
        onUpdateObjectives(updatedObjectives);
    };

    const getProgressColor = (progress) => {
        if (progress >= 80) return 'bg-green-500';
        if (progress >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Learning Objectives Progress</h2>

            <div className="space-y-4">
                {objectives.map(objective => (
                    <div
                        key={objective.id}
                        className="border rounded-lg p-4 space-y-3"
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h3 className="font-medium">{objective.description}</h3>
                                <p className="text-sm text-gray-500">
                                    Target Date: {new Date(objective.targetDate).toLocaleDateString()}
                                </p>
                            </div>
                            <button
                                onClick={() => setExpandedObjective(
                                    expandedObjective === objective.id ? null : objective.id
                                )}
                                className="text-blue-500 hover:text-blue-600"
                            >
                                {expandedObjective === objective.id ? 'Less' : 'More'}
                            </button>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className={`h-2.5 rounded-full ${getProgressColor(objective.progress)}`}
                                style={{ width: `${objective.progress}%` }}
                            ></div>
                        </div>

                        {expandedObjective === objective.id && (
                            <div className="space-y-3 pt-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Progress (%)
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={objective.progress}
                                        onChange={(e) => handleProgressUpdate(objective.id, parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                    <div className="text-sm text-gray-500 text-right">
                                        {objective.progress}%
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Notes & Observations
                                    </label>
                                    <textarea
                                        value={objective.notes || ''}
                                        onChange={(e) => handleNotesUpdate(objective.id, e.target.value)}
                                        rows="3"
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="Add notes about progress, challenges, or achievements..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium">Success Criteria:</span>
                                        <ul className="list-disc list-inside mt-1 text-gray-600">
                                            {objective.successCriteria?.map((criteria, index) => (
                                                <li key={index}>{criteria}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="font-medium">Resources:</span>
                                        <ul className="list-disc list-inside mt-1 text-gray-600">
                                            {objective.resources?.map((resource, index) => (
                                                <li key={index}>
                                                    <a
                                                        href={resource.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        {resource.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ObjectiveTracker; 