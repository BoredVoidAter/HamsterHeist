// backend/game/BotAPI.js

class BotAPI {
  constructor(bot, gameEngine) {
    this.bot = bot;
    this.gameEngine = gameEngine;
    this.state = 'IDLE'; // Default state
    this.memory = {}; // Key-value store for bot memory
  }

  // Bot actions
  moveForward() {
    this.bot.move(1);
  }

  turn(angle) {
    this.bot.turn(angle);
  }

  // Module usage
  useModule(moduleType) {
    // This will be handled by the GameEngine based on bot's module inventory
    this.bot.moduleToUse = moduleType;
  }

  // Advanced AI Memory & State Management
  setState(newState) {
    this.state = newState;
    console.log(`Bot ${this.bot.id} state changed to: ${this.state}`);
  }

  getState() {
    return this.state;
  }

  setMemory(key, value) {
    this.memory[key] = value;
    console.log(`Bot ${this.bot.id} memory set: ${key} = ${value}`);
  }

  getMemory(key) {
    return this.memory[key];
  }

  // Sensor data (dummy for now)
  getSensorData() {
    return {
      // Example sensor data
      position: this.bot.position,
      orientation: this.bot.orientation,
      nearbyBots: [],
      obstacles: []
    };
  }

  getCurrentEvent() {
    return this.gameEngine.activeEvent;
  }
}

module.exports = BotAPI;
