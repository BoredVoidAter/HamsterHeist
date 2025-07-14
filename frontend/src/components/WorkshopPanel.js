
import React, { useState, useEffect } from 'react';

const WorkshopPanel = () => {
    const [modules, setModules] = useState([]);
    const [playerModules, setPlayerModules] = useState([]);
    const playerId = 1; // Placeholder for current player ID

    useEffect(() => {
        // Fetch all available modules
        fetch('/api/workshop/modules')
            .then(response => response.json())
            .then(data => setModules(data))
            .catch(error => console.error('Error fetching modules:', error));

        // Fetch player's owned modules
        fetch(`/api/workshop/player/${playerId}/modules`)
            .then(response => response.json())
            .then(data => setPlayerModules(data))
            .catch(error => console.error('Error fetching player modules:', error));
    }, [playerId]);

    const handleBuyModule = (moduleId) => {
        fetch(`/api/workshop/player/${playerId}/buy_module/${moduleId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            // Refresh player modules after purchase
            fetch(`/api/workshop/player/${playerId}/modules`)
                .then(response => response.json())
                .then(data => setPlayerModules(data));
        })
        .catch(error => console.error('Error buying module:', error));
    };

    const handleEquipModule = (playerModuleId) => {
        fetch(`/api/workshop/player/${playerId}/equip_module/${playerModuleId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            // Refresh player modules after equip/unequip
            fetch(`/api/workshop/player/${playerId}/modules`)
                .then(response => response.json())
                .then(data => setPlayerModules(data));
        })
        .catch(error => console.error('Error equipping module:', error));
    };

    return (
        <div className="workshop-panel">
            <h2>The Workshop</h2>
            <div className="available-modules">
                <h3>Available Modules</h3>
                <ul>
                    {modules.map(module => (
                        <li key={module.id}>
                            {module.name} - {module.description} (Cost: {module.cost} Scrap)
                            <button onClick={() => handleBuyModule(module.id)}>Buy</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="player-modules">
                <h3>Your Modules</h3>
                <ul>
                    {playerModules.map(pModule => (
                        <li key={pModule.id}>
                            {pModule.name} - {pModule.description} ({pModule.is_equipped ? 'Equipped' : 'Unequipped'})
                            <button onClick={() => handleEquipModule(pModule.id)}>
                                {pModule.is_equipped ? 'Unequip' : 'Equip'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WorkshopPanel;
