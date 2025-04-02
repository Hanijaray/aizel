import React, { useState } from 'react';
import Announcement from '../components/Announcement/Announcement';
import Announcement1 from '../components/Announcement1';

const ParentComponent = () => {
  const [announcements, setAnnouncements] = useState([]);

  const handleAddAnnouncement = (newAnnouncement) => {
    setAnnouncements([...announcements, newAnnouncement]);
  };

  return (
    <div>
        {/* <Announcement1 announcements={announcements} /> */}
      <Announcement onAddAnnouncement={handleAddAnnouncement} />
      
    </div>
  );
};

export default ParentComponent;