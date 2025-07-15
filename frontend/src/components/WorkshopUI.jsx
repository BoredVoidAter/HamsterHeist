import React, { useState, useEffect } from 'react';
import './WorkshopUI.css'; // Assuming you'll create a CSS file for styling

const consumableModules = [
  { id: 'nitro_boost', name: 'Nitro Boost', description: 'Grants a quick burst of speed.', scrapCost: 50 },
  { id: 'smokescreen', name: 'Smokescreen', description: 'Deploys a temporary smokescreen to obscure vision.', scrapCost: 75 },
  // Add more consumable modules here
];

const WorkshopUI = () => {
  const [playerScrap, setPlayerScrap] = useState(0);
  const [playerInventory, setPlayerInventory] = useState([]);

  useEffect(() => {
    // In a real application, fetch player's scrap and inventory from backend
    // For now, using dummy data
    setPlayerScrap(200);
    setPlayerInventory([
      { moduleType: 'nitro_boost', quantity: 1 },
    ]);
  }, []);

  const handleCraft = (moduleId) => {
    const moduleToCraft = consumableModules.find(mod => mod.id === moduleId);
    if (!moduleToCraft) return;

    if (playerScrap >= moduleToCraft.scrapCost) {
      setPlayerScrap(prevScrap => prevScrap - moduleToCraft.scrapCost);
      setPlayerInventory(prevInventory => {
        const existingModule = prevInventory.find(item => item.moduleType === moduleId);
        if (existingModule) {
          return prevInventory.map(item =>
            item.moduleType === moduleId ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevInventory, { moduleType: moduleId, quantity: 1 }];
        }
      });
      alert(`Crafted ${moduleToCraft.name}!`);
      // In a real app, send update to backend
    } else {
      alert('Not enough scrap!');
    }
  };

  return (
    <div className="workshop-ui">
      <h1>Hamster-Bot Workshop</h1>
      <div className="scrap-display">
        Current Scrap: <span>{playerScrap}</span>
      </div>

      <div className="crafting-section">
        <h2>Craft Consumable Modules</h2>
        <div className="module-list">
          {consumableModules.map(module => (
            <div key={module.id} className="module-card">
              <h3>{module.name}</h3>
              <p>{module.description}</p>
              <p>Cost: {module.scrapCost} Scrap</p>
              <button onClick={() => handleCraft(module.id)}>
                Craft
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="inventory-section">
        <h2>Your Inventory</h2>
        {playerInventory.length === 0 ? (
          <p>No consumable modules in your inventory.</p>
        ) : (
          <ul className="inventory-list">
            {playerInventory.map(item => (
              <li key={item.moduleType}>
                {consumableModules.find(mod => mod.id === item.moduleType)?.name || item.moduleType} x {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WorkshopUI;