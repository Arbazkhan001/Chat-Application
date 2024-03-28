import React, { useState, useEffect } from 'react';
import { BsGearFill } from 'react-icons/bs';

const Settings = ({ userId }) => {
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    // Fetch user preferences when the component mounts
    const fetchUserPreferences = async () => {
      try {
        const response = await fetch(`/api/preferences/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch preferences');
        }
        const data = await response.json();
        setBgImage(data.bgImage || '');
        document.body.style.backgroundImage = `url(${data.bgImage || ''})`;
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchUserPreferences();
    }
  }, [userId]);

  const handleImageChange = async (imageUrl) => {
    setBgImage(imageUrl);
    document.body.style.backgroundImage = `url(${imageUrl})`;

    try {
      const response = await fetch('/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, bgImage: imageUrl }),
      });
      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }
      console.log('Preferences updated');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ position: 'fixed', top: '10px', right: '10px' }}>
      <div className="settings-button dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <BsGearFill />
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button className="dropdown-item" onClick={() => handleImageChange('../../../bg.png')}>Image 1</button>
          <button className="dropdown-item" onClick={() => handleImageChange('../../../add.jpg')}>Image 2</button>
          <button className="dropdown-item" onClick={() => handleImageChange('../../../New-Project-99.jpg')}>Image 3</button>
          <button className="dropdown-item" onClick={() => handleImageChange('../../../add2.jpg')}>Image 4</button>
          <button className="dropdown-item" onClick={() => handleImageChange('../../../add3.jpg')}>Image 5</button>
          {/* Add more buttons for other images */}
        </div>
      </div>
    </div>
  );
}

export default Settings;
