import React, { useState, useEffect } from 'react';
import './CustomizationBay.css'; // Assuming you'll create a CSS file for styling

const CustomizationBay = () => {
  const [selectedChassis, setSelectedChassis] = useState('default');
  const [selectedPaint, setSelectedPaint] = useState('red');
  const [selectedAccessory, setSelectedAccessory] = useState('none');
  const [unlockedItems, setUnlockedItems] = useState({
    chassis: ['default', 'sport'],
    paints: ['red', 'blue', 'green'],
    accessories: ['none', 'propeller_hat', 'racing_stripes']
  });

  useEffect(() => {
    // In a real application, you'd fetch unlocked items from the backend
    // For now, using dummy data
    console.log('Fetching unlocked items...');
  }, []);

  const handleSaveCustomization = () => {
    // In a real application, you'd send this to the backend
    console.log('Saving customization:', {
      selectedChassis,
      selectedPaint,
      selectedAccessory,
    });
    alert('Customization Saved!');
  };

  return (
    <div className="customization-bay">
      <h1>Hamster-Bot Customization Bay</h1>

      <div className="customization-section">
        <h2>Chassis</h2>
        <div className="options">
          {unlockedItems.chassis.map((chassis) => (
            <button
              key={chassis}
              className={selectedChassis === chassis ? 'selected' : ''}
              onClick={() => setSelectedChassis(chassis)}
            >
              {chassis.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="customization-section">
        <h2>Paint Color</h2>
        <div className="options">
          {unlockedItems.paints.map((paint) => (
            <button
              key={paint}
              className={selectedPaint === paint ? 'selected' : ''}
              onClick={() => setSelectedPaint(paint)}
              style={{ backgroundColor: paint }}
            >
              {paint}
            </button>
          ))}
        </div>
      </div>

      <div className="customization-section">
        <h2>Accessories</h2>
        <div className="options">
          {unlockedItems.accessories.map((accessory) => (
            <button
              key={accessory}
              className={selectedAccessory === accessory ? 'selected' : ''}
              onClick={() => setSelectedAccessory(accessory)}
            >
              {accessory.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      <button className="save-button" onClick={handleSaveCustomization}>
        Save Customization
      </button>

      {/* Visual preview of the bot would go here */}
      <div className="bot-preview">
        <h3>Your Hamster-Bot</h3>
        <div
          className="bot-model"
          style={{
            backgroundColor: selectedPaint,
            // Add more styles/components here to represent chassis and accessories
            border: selectedChassis === 'sport' ? '2px solid gold' : 'none',
          }}
        >
          {selectedAccessory === 'propeller_hat' && <span className="accessory">🎩</span>}
          {selectedAccessory === 'racing_stripes' && <span className="accessory">🏁</span>}
          {/* More complex rendering would involve 3D models or SVG */}
          <p>Bot Preview</p>
        </div>
      </div>
    </div>
  );
};

export default CustomizationBay;