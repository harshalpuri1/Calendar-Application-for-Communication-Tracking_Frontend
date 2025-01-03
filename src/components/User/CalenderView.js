import React, { useState } from 'react';
import './CalenderView.css';

const CalenderView = () => {
  // Static data for past and upcoming communications
  const communications = {
    past: [
      { date: '2025-01-02', method: 'Email', details: 'Follow-up email sent to client.' },
      { date: '2025-01-10', method: 'Call', details: 'Discussed project requirements.' },
    ],
    upcoming: [
      { date: '2025-01-15', method: 'Meeting', details: 'Team meeting to discuss milestones.' },
      { date: '2025-01-25', method: 'Presentation', details: 'Client presentation.' },
    ],
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(0); // 0 represents January 2025

  const months = [
    { name: 'January 2025', days: 31, startDay: new Date('2025-01-01').getDay() },
    { name: 'February 2025', days: 28, startDay: new Date('2025-02-01').getDay() }, // Not a leap year
    // Add other months if needed
  ];

  const getCommunicationDetails = (date) => {
    return (
      communications.past.find((comm) => comm.date === date) ||
      communications.upcoming.find((comm) => comm.date === date) ||
      null
    );
  };

  const handlePrevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1);
      setSelectedDate(null);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth < months.length - 1) {
      setCurrentMonth((prev) => prev + 1);
      setSelectedDate(null);
    }
  };

  const renderDays = () => {
    const { days, startDay } = months[currentMonth];
  
    const calendarCells = [];
    for (let i = 0; i < startDay; i++) {
      calendarCells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }
  
    for (let day = 1; day <= days; day++) {
      const dateString = `2025-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const communication = getCommunicationDetails(dateString);
  
      calendarCells.push(
        <div
          key={dateString}
          className={`calendar-cell ${communication ? 'highlight' : ''}`}
          onClick={() => setSelectedDate(dateString)}
        >
          <span>{day}</span>
        </div>
      );
    }
  
    return calendarCells;
  };
  

  return (
    <div className="calendar-container">
      <h1>Communication Calendar</h1>
      <div className="navigation-buttons">
        <button
          className="navigation-button"
          onClick={handlePrevMonth}
          disabled={currentMonth === 0}
        >
          Previous
        </button>
        <button
          className="navigation-button"
          onClick={handleNextMonth}
          disabled={currentMonth === months.length - 1}
        >
          Next
        </button>
      </div>
      <div className="calendar-header">{months[currentMonth].name}</div>
      <div className="calendar-grid">{renderDays()}</div>

      {selectedDate && (
        <div className="details-popup">
          <h2>Details for {selectedDate}</h2>
          {(() => {
            const communication = getCommunicationDetails(selectedDate);
            if (communication) {
              return (
                <div>
                  <p><strong>Method:</strong> {communication.method}</p>
                  <p><strong>Details:</strong> {communication.details}</p>
                </div>
              );
            }
            return <p>No communications on this date.</p>;
          })()}
          <button onClick={() => setSelectedDate(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CalenderView;
