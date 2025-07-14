import React from 'react';

const ApiDocs: React.FC = () => {
  return (
    <div className="api-docs">
      <h2>Bot API Documentation</h2>

      <h3>Movement & Actions</h3>
      <ul>
        <li>
          <code>bot.moveForward()</code>
          <p>Moves the bot forward by a small increment.</p>
        </li>
        <li>
          <code>bot.turn(angle)</code>
          <p>Turns the bot by the specified <code>angle</code> in radians.</p>
        </li>
        <li>
          <code>bot.useModule(moduleType)</code>
          <p>Activates the specified module (e.g., 'EMP Emitter', 'Goo Cannon') if available and off cooldown.</p>
        </li>
      </ul>

      <h3>Sensor Data</h3>
      <ul>
        <li>
          <code>bot.getSensorData()</code>
          <p>Returns an object containing current sensor readings, including position, orientation, and information about nearby bots and obstacles.</p>
        </li>
      </ul>

      <h3>Advanced AI: Memory & State Management</h3>
      <ul>
        <li>
          <code>bot.setState(newState)</code>
          <p>Sets the bot's internal state to <code>newState</code> (string). Useful for implementing state machines (e.g., 'PATROL', 'ATTACK', 'FLEE').</p>
          <pre><code>bot.setState('ATTACK');</code></pre>
        </li>
        <li>
          <code>bot.getState()</code>
          <p>Returns the bot's current internal state (string).</p>
          <pre><code>const currentState = bot.getState();
if (currentState === 'FLEE') {
  // ... run away logic
}</code></pre>
        </li>
        <li>
          <code>bot.setMemory(key, value)</code>
          <p>Stores a <code>value</code> associated with a <code>key</code> in the bot's persistent memory. The memory persists between code executions.</p>
          <pre><code>bot.setMemory('lastEnemyPosition', bot.getSensorData().nearbyBots[0].position);
bot.setMemory('ammoCount', 5);</code></pre>
        </li>
        <li>
          <code>bot.getMemory(key)</code>
          <p>Retrieves a value from the bot's persistent memory using the specified <code>key</code>.</p>
          <pre><code>const lastKnownPos = bot.getMemory('lastEnemyPosition');
const currentAmmo = bot.getMemory('ammoCount');</code></pre>
        </li>
      </ul>
    </div>
  );
};

export default ApiDocs;
