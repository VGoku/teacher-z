import React, { useState } from 'react';
import AttendanceForm from './AttendanceForm';
import AttendanceList from './AttendanceList';
import StudentProgressTracker from './StudentProgressTracker';
import BehaviorTracker from './BehaviorTracker';
import StudentSearch from './StudentSearch';
import ProgressReports from './ProgressReports';

const AttendanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const addRecord = (record) => {
    setRecords([...records, { ...record, id: Date.now() }]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClassFilter = (classId) => {
    setSelectedClass(classId);
  };

  const tabs = [
    { id: 'attendance', label: 'Attendance' },
    { id: 'progress', label: 'Student Progress' },
    { id: 'behavior', label: 'Behavior Tracking' },
    { id: 'reports', label: 'Reports & Analytics' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Student Attendance & Progress Dashboard
        </h1>
        
        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-wrap gap-4">
          <StudentSearch 
            onSearch={handleSearch}
            onClassFilter={handleClassFilter}
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6 border-b">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium rounded-t-lg transition-colors
                ${activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'attendance' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <AttendanceForm addRecord={addRecord} />
              </div>
              <div className="md:col-span-2">
                <AttendanceList 
                  records={records}
                  searchQuery={searchQuery}
                  selectedClass={selectedClass}
                />
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <StudentProgressTracker 
              students={students}
              searchQuery={searchQuery}
              selectedClass={selectedClass}
            />
          )}

          {activeTab === 'behavior' && (
            <BehaviorTracker 
              students={students}
              searchQuery={searchQuery}
              selectedClass={selectedClass}
            />
          )}

          {activeTab === 'reports' && (
            <ProgressReports 
              attendanceRecords={records}
              students={students}
              selectedClass={selectedClass}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard; 