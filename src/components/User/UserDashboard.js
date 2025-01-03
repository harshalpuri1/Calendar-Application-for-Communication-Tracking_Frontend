// src/components/UserDashboard.jsx
import React, { useState } from 'react';
import './UserDashboard.css';
import { useNavigate } from "react-router-dom";
import { Bell, Calendar } from 'lucide-react';

// Sample data for companies and communications
const sampleData = [
  {
    companyName: 'Tech Innovators',
    recentCommunications: [
      { type: 'LinkedIn Post', date: '5th September', notes: 'Initial outreach' },
      { type: 'Email', date: '10th September', notes: 'Follow up on LinkedIn post' },
      { type: 'Phone Call', date: '15th September', notes: 'Discussed project details' },
      { type: 'LinkedIn Message', date: '20th September', notes: 'Project update' },
      { type: 'Email', date: '25th September', notes: 'Final follow up' },
    ],
    nextCommunication: { type: 'Phone Call', date: '30th September' },
    lastCommunicationDate: '25th September',
  },
  {
    companyName: 'Innovative Solutions',
    recentCommunications: [
      { type: 'Phone Call', date: '12th October', notes: 'Introductory call' },
      { type: 'Email', date: '20th October', notes: 'Follow-up on intro call' },
      { type: 'LinkedIn Message', date: '25th October', notes: 'Discussing opportunities' },
    ],
    nextCommunication: { type: 'LinkedIn Post', date: '5th November' },
    lastCommunicationDate: '25th October',
  },
  {
    companyName: 'Future Tech Enterprises',
    recentCommunications: [
      { type: 'Email', date: '15th November', notes: 'Initial proposal' },
      { type: 'Phone Call', date: '18th November', notes: 'Follow-up on proposal' },
      { type: 'LinkedIn Message', date: '22nd November', notes: 'Setting up meeting' },
    ],
    nextCommunication: { type: 'Phone Call', date: '28th November' },
    lastCommunicationDate: '22nd November',
  },
  {
    companyName: 'Creative Labs',
    recentCommunications: [
      { type: 'LinkedIn Post', date: '30th November', notes: 'Initial connection' },
      { type: 'Phone Call', date: '3rd December', notes: 'Discussing project scope' },
    ],
    nextCommunication: { type: 'Email', date: '10th December' },
    lastCommunicationDate: '3rd December',
  },
  {
    companyName: 'Global Enterprises',
    recentCommunications: [
      { type: 'Email', date: '15th December', notes: 'Initial outreach' },
      { type: 'Phone Call', date: '20th December', notes: 'Follow-up call' },
    ],
    nextCommunication: { type: 'LinkedIn Message', date: '30th December' },
    lastCommunicationDate: '20th December',
  },
];

const UserDashboard = () => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [communicationData, setCommunicationData] = useState({
    type: '',
    date: '',
    notes: '',
  });

  // Handle row selection
  const handleCompanySelection = (companyName) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyName)
        ? prev.filter((company) => company !== companyName)
        : [...prev, companyName]
    );
  };

  // Handle modal input changes
  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setCommunicationData({
      ...communicationData,
      [name]: value,
    });
  };

  // Submit communication and reset highlights
  const handleSubmitCommunication = () => {
    setShowModal(false);
    setCommunicationData({
      type: '',
      date: '',
      notes: '',
    });
  };

  const navigate = useNavigate();
  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  const handleCalendarClick = () => {
    navigate("/calender");
  };

  // Helper function to check for overdue or due today communication
  const getHighlightClass = (company) => {
    const nextCommunicationDate = new Date(company.nextCommunication.date);
    const currentDate = new Date();
    const diffInTime = nextCommunicationDate - currentDate;
    if (diffInTime < 0) return 'highlight-red'; // Overdue
    if (diffInTime <= 86400000) return 'highlight-yellow'; // Due today
    return '';
  };

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>

      <table className="company-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Company Name</th>
            <th>Last Five Communications</th>
            <th>Next Scheduled Communication</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((company, index) => (
            <tr key={index} className={getHighlightClass(company)}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCompanySelection(company.companyName)}
                />
              </td>
              <td>{company.companyName}</td>
              <td>
                <ul>
                  {company.recentCommunications.map((comm, idx) => (
                    <li key={idx} className="communication-item">
                      <span>{comm.type}</span> - <span>{comm.date}</span>
                      <div className="tooltip">{comm.notes}</div>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <div>
                  {company.nextCommunication.type} - {company.nextCommunication.date}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className='addCommButton'
        onClick={() => setShowModal(true)}
        disabled={selectedCompanies.length === 0}
      >
        Communication Performed
      </button>

      {showModal && (
        <>
          <div className="modal-backdrop"></div>
          <div className="modal">
            <h3>Log New Communication</h3>
            <form>
              <label>
                Type of Communication:
                <select
                  name="type"
                  value={communicationData.type}
                  onChange={handleModalInputChange}
                >
                  <option value="LinkedIn Post">LinkedIn Post</option>
                  <option value="Email">Email</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="LinkedIn Message">LinkedIn Message</option>
                </select>
              </label>

              <label>
                Date of Communication:
                <input
                  type="date"
                  name="date"
                  value={communicationData.date}
                  onChange={handleModalInputChange}
                />
              </label>

              <label>
                Notes:
                <textarea
                  name="notes"
                  value={communicationData.notes}
                  onChange={handleModalInputChange}
                ></textarea>
              </label>

              <button type="button" onClick={handleSubmitCommunication}>
                Submit
              </button>
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </>
      )}

      {/* Updated Navbar Floating Buttons */}
      <div className="navbar-buttons">
        <button className="navbar-button notification-button" onClick={handleNotificationClick} title="Notifications">
              <Bell />
        </button>
        <button className="navbar-button calendar-button" onClick={handleCalendarClick} title="Calendar">
        <Calendar />
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
