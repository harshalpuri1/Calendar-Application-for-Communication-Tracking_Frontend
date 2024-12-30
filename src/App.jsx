import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/User/Dashboard';
import CalendarView from './components/User/CalendarView';
import CompanyForm from './components/Admin/CompanyForm';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/admin" element={<CompanyForm />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
