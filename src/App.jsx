import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LessonDashboard from './components/LessonDashboard';
import AttendanceDashboard from './components/AttendanceDashboard';
import AssignmentManagementDashboard from './components/AssignmentManagementDashboard';
import CommunicationDashboard from './components/CommunicationDashboard';
import ClassroomManagementDashboard from './components/ClassroomManagementDashboard';
import InteractiveLearningDashboard from './components/interactive-learning/InteractiveEngagementDashboard';
import ParentCommunicationDashboard from './components/parent-communication/ParentCommunicationDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <ul className="flex space-x-4 flex-wrap">
            <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
            <li><Link to="/lessons" className="hover:text-blue-200">Lesson Planner</Link></li>
            <li><Link to="/attendance" className="hover:text-blue-200">Attendance</Link></li>
            <li><Link to="/assignments" className="hover:text-blue-200">Assignments</Link></li>
            <li><Link to="/communication" className="hover:text-blue-200">Communication</Link></li>
            <li><Link to="/classroom" className="hover:text-blue-200">Classroom Management</Link></li>
            <li><Link to="/interactive" className="hover:text-blue-200">Interactive Learning</Link></li>
            <li><Link to="/parent-communication" className="hover:text-blue-200">Parent Updates</Link></li>
          </ul>
        </nav>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<div className="text-center text-2xl font-semibold">Welcome! Select a dashboard from the navigation above.</div>} />
            <Route path="/lessons" element={<LessonDashboard />} />
            <Route path="/attendance" element={<AttendanceDashboard />} />
            <Route path="/assignments" element={<AssignmentManagementDashboard />} />
            <Route path="/communication" element={<CommunicationDashboard />} />
            <Route path="/classroom" element={<ClassroomManagementDashboard />} />
            <Route path="/interactive" element={<InteractiveLearningDashboard />} />
            <Route path="/parent-communication" element={<ParentCommunicationDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 