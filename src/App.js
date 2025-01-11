import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserDashboard from './components/User/UserDashboard';
import Notifications from './components/User/Notifications';
import LoginPage from './components/Login/Login';
import { AppRoutes } from './routes/AppRoutes';
import CalendarView from './components/User/CalendarView';
import strings from './components/utils/App.json';

const App = () => {
  return (
    <HashRouter>
      {/* <Navbar /> */}
      <div>
      <AppRoutes/> 
        <Routes>
          <Route path={strings.main} element={<LoginPage/>} />
          <Route path={strings.admin} element={<AdminDashboard />} />
          <Route path={strings.user}element={<UserDashboard />} />
          <Route path={strings.notifications} element={<Notifications/>} />
          <Route path={strings.calendar} element={<CalendarView/>} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
