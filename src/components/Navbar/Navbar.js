import React from "react";
import { useNavigate } from "react-router-dom";
import { BellDot, Calendar, LogOut } from "lucide-react";
import "./Navbar.css";
import constants from "../utils/config/config";
import toast from "react-hot-toast";

const Navbar = ({ showExtras }) => {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  const handleCalendarClick = () => {
    navigate("/calendar");
  };

  const handleLogout = async () => {
    localStorage.removeItem(constants.localStorage.userToken);
    localStorage.removeItem(constants.localStorage.adminToken);
    localStorage.removeItem(constants.localStorage.AdminEmail);
    toast.success("Logged out successfully!");
    navigate("/");
  };
  let name;
  if (showExtras === true) {
    name = "User";
  } else {
    name = "Admin";
  }

  return (
    <div className="navbar">
      <>
        <h1 className="Nav-Heading">Welcome {name}</h1>
      </>

      <div className="navbar-buttons">
        {showExtras && (
          <>
            <button
              className="navbar-button notification-button"
              onClick={handleNotificationClick}
              title="Notifications"
            >
              <BellDot />
            </button>
            <button
              className="navbar-button calendar-button"
              onClick={handleCalendarClick}
              title="Calendar"
            >
              <Calendar />
            </button>
          </>
        )}
        <button
          className="navbar-button logout-button"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
