import React, { useState, useEffect } from 'react';

const EventAnnouncer = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // In a real application, this would listen to WebSocket events or a game state update
    // For now, we'll simulate some announcements
    const simulateAnnouncements = () => {
      setTimeout(() => {
        setAnnouncements(prev => [...prev, { id: Date.now(), message: 'Laser Grid Activation in 10 seconds!' }]);
      }, 5000);
      setTimeout(() => {
        setAnnouncements(prev => [...prev, { id: Date.now() + 1, message: 'Magnetic Pulse in 5 seconds!' }]);
      }, 10000);
    };
    simulateAnnouncements();
  }, []);

  return (
    <div className="event-announcer">
      {announcements.map(announcement => (
        <div key={announcement.id} className="announcement-item">
          {announcement.message}
        </div>
      ))}
    </div>
  );
};

export default EventAnnouncer;
