import React, { useState } from 'react';

const StudentSearch = ({ onSearch, onClassFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClassChange = (e) => {
    const value = e.target.value;
    setSelectedClass(value);
    onClassFilter(value);
  };

  // Mock class data (replace with actual data from your system)
  const classes = [
    { id: '1', name: 'Class 1-A' },
    { id: '2', name: 'Class 1-B' },
    { id: '3', name: 'Class 2-A' },
    { id: '4', name: 'Class 2-B' },
  ];

  return (
    <div className="w-full flex flex-wrap gap-4">
      {/* Search Input */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Search Students
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name, ID, or subject..."
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-10"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            {/* Search Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
      </div>

      {/* Class Filter */}
      <div className="w-48">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Class
        </label>
        <select
          value={selectedClass}
          onChange={handleClassChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Classes</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      {/* Quick Filters */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quick Filters
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => onSearch('absent')}
            className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full hover:bg-red-200"
          >
            Recent Absences
          </button>
          <button
            onClick={() => onSearch('low_performance')}
            className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200"
          >
            Low Performance
          </button>
          <button
            onClick={() => onSearch('high_performance')}
            className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full hover:bg-green-200"
          >
            High Performance
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentSearch; 