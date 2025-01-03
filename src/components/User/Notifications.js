import React, { useState } from "react";
import './Notifications.css';

const NotificationPage = () => {
  const [notifications] = useState([
    { id: 1, company: "Company A", task: "Follow-up on proposal", dueDate: "2025-01-03", overdue: true },
    { id: 2, company: "Company B", task: "Send invoice", dueDate: "2025-01-03", overdue: false },
    { id: 3, company: "Company C", task: "Check project status", dueDate: "2025-01-03", overdue: false },
    { id: 4, company: "Company D", task: "Submit report", dueDate: "2025-01-02", overdue: true },
    { id: 5, company: "Company E", task: "Schedule meeting", dueDate: "2025-01-03", overdue: false }
  ]);

  // Function to get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="notification-container">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <div className="notification-badge">
          {notifications.filter((notif) => notif.dueDate === today || notif.overdue).length}
        </div>
      </div>

      <div className="notifications-grid">
        <h2>Overdue Communications</h2>
        <table className="notification-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            {notifications.filter((notif) => notif.overdue).map((notif) => (
              <tr key={notif.id} className="overdue">
                <td>{notif.company}</td>
                <td>{notif.task} (Due: {notif.dueDate})</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Today's Communications</h2>
        <table className="notification-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            {notifications.filter((notif) => notif.dueDate === today).map((notif) => (
              <tr key={notif.id} className="due-today">
                <td>{notif.company}</td>
                <td>{notif.task} (Due: {notif.dueDate})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationPage;
