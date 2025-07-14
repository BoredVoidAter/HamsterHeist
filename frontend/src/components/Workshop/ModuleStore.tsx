import React from 'react';

interface Module { 
  name: string;
  description: string;
  type: 'sabotage' | 'utility' | 'defense';
  cost: number;
  cooldown?: number;
  effect_range?: number;
  duration?: number;
  projectile_speed?: number;
  puddle_duration?: number;
  puddle_slow_factor?: number;
}

const modules: Module[] = [
  {
    name: 'EMP Emitter',
    description: 'Temporarily disables code execution of nearby bots.',
    type: 'sabotage',
    cost: 500,
    cooldown: 10000,
    effect_range: 150,
    duration: 3000,
  },
  {
    name: 'Goo Cannon',
    description: 'Fires a projectile that creates a slowing puddle.',
    type: 'sabotage',
    cost: 400,
    cooldown: 8000,
    effect_range: 200,
    projectile_speed: 500,
    puddle_duration: 5000,
    puddle_slow_factor: 0.5,
  },
  // Add other modules here as they are implemented
];

const ModuleStore: React.FC = () => {
  return (
    <div className="module-store">
      <h2>Module Store</h2>
      <div className="module-list">
        {modules.map((module) => (
          <div key={module.name} className="module-item">
            <h3>{module.name}</h3>
            <p>{module.description}</p>
            <p>Type: {module.type}</p>
            <p>Cost: {module.cost}</p>
            {module.cooldown && <p>Cooldown: {module.cooldown / 1000}s</p>}
            {module.effect_range && <p>Effect Range: {module.effect_range} units</p>}
            {module.duration && <p>Duration: {module.duration / 1000}s</p>}
            {module.projectile_speed && <p>Projectile Speed: {module.projectile_speed} units/s</p>}
            {module.puddle_duration && <p>Puddle Duration: {module.puddle_duration / 1000}s</p>}
            {module.puddle_slow_factor && <p>Puddle Slow Factor: {module.puddle_slow_factor}</p>}
            <button>Purchase</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleStore;
