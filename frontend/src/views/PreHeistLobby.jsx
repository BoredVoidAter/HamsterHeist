import React, { useState, useEffect } from 'react';
import './PreHeistLobby.css'; // Assuming you'll create a CSS file for styling

const PreHeistLobby = () => {
  const [playerInventory, setPlayerInventory] = useState([]);
  const [selectedConsumables, setSelectedConsumables] = useState({});

  useEffect(() => {
    // In a real application, fetch player's inventory from backend
    // For now, using dummy data
    setPlayerInventory([
      { moduleType: 'nitro_boost', quantity: 2 },
      { moduleType: 'smokescreen', quantity: 1 },
    ]);
  }, []);

  const handleSelectConsumable = (moduleId) => {
    setSelectedConsumables(prevSelected => {
      const newSelected = { ...prevSelected };
      if (newSelected[moduleId]) {
        delete newSelected[moduleId];
      } else {
        newSelected[moduleId] = true;
      }
      return newSelected;
    });
  };

  const handleStartHeist = () => {
    // In a real application, send selected consumables to the backend
    console.log('Starting heist with consumables:', selectedConsumables);
    alert('Heist Started!');
  };

  return (
    <div className="pre-heist-lobby">
      <h1>Prepare for Heist!</h1>

      <div className="consumables-section">
        <h2>Your Consumable Modules</h2>
        {playerInventory.length === 0 ? (
          <p>No consumable modules in your inventory. Visit the Workshop to craft some!</p>
        ) : (
          <div className="consumable-list">
            {playerInventory.map(item => (
              <div
                key={item.moduleType}
                className={`consumable-card ${selectedConsumables[item.moduleType] ? 'selected' : ''}`}
                onClick={() => handleSelectConsumable(item.moduleType)}
              >
                <h3>{item.moduleType.replace(/_/g, ' ')}</h3>
                <p>Quantity: {item.quantity}</p>
                {/* Add description if available */}
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="start-heist-button" onClick={handleStartHeist}>
        Start Heist
      </button>
    </div>
  );
};

export default PreHeistLobby;