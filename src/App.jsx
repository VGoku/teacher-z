import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LessonDashboard from './components/LessonDashboard';
import AttendanceDashboard from './components/AttendanceDashboard';
import AssignmentDashboard from './components/AssignmentDashboard';
import CommunicationDashboard from './components/CommunicationDashboard';
import ClassroomManagementDashboard from './components/ClassroomManagementDashboard';
import InteractiveLearningDashboard from './components/InteractiveLearningDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <ul className="flex space-x-4">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/lessons">Lesson Planner</Link></li>
            <li><Link to="/attendance">Attendance</Link></li>
            <li><Link to="/assignments">Assignments</Link></li>
            <li><Link to="/communication">Communication</Link></li>
            <li><Link to="/classroom">Classroom Management</Link></li>
            <li><Link to="/interactive">Interactive Learning</Link></li>
          </ul>
        </nav>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<div className="text-center text-2xl font-semibold">Welcome! Select a dashboard from the navigation above.</div>} />
            <Route path="/lessons" element={<LessonDashboard />} />
            <Route path="/attendance" element={<AttendanceDashboard />} />
            <Route path="/assignments" element={<AssignmentDashboard />} />
            <Route path="/communication" element={<CommunicationDashboard />} />
            <Route path="/classroom" element={<ClassroomManagementDashboard />} />
            <Route path="/interactive" element={<InteractiveLearningDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 