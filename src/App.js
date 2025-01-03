import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserDashboard from './components/User/UserDashboard';
import Notifications from './components/User/Notifications';
import CalendarView from './components/User/CalenderView';
import LoginPage from './components/Login/Login';
import ForgotPassword from './components/Login/ForgotPassword';
import { AppRoutes } from './routes/AppRoutes';

const App = () => {
  return (
    <HashRouter>
      {/* <Navbar /> */}
      <div>
      <AppRoutes/> 
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path='/notifications' element={<Notifications/>} />
          <Route path='/calender' element={<CalendarView/>} />
          <Route path="/" element={<LoginPage/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
