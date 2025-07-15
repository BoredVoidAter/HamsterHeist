import React from 'react';

function ModuleSelector({ onSelectModule }) {
    const modules = [
        { id: 'lidar', name: 'Lidar Scanner', description: 'Provides a detailed grid-based snapshot of surroundings.' },
        { id: 'hacking', name: 'Hacking Module', description: 'Allows interaction with Data Terminals to disable traps or gain energy.' },
        // Add other modules here
    ];

    return (
        <div className="module-selector">
            <h3>Available Modules</h3>
            {modules.map(module => (
                <div key={module.id} className="module-item" onClick={() => onSelectModule(module.id)}>
                    <h4>{module.name}</h4>
                    <p>{module.description}</p>
                </div>
            ))}
        </div>
    );
}

export default ModuleSelector;
