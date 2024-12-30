import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const CalendarView = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Communication Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'LinkedIn Post', date: '2024-06-15' },
          { title: 'Follow-Up Call', date: '2024-06-20' },
        ]}
      />
    </div>
  );
};

export default CalendarView;
