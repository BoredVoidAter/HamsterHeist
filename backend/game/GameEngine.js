// backend/game/GameEngine.js

class GameEngine {
  constructor(io) {
    this.io = io;
    this.bots = {};
    this.projectiles = [];
    this.puddles = [];
    this.gameLoopInterval = null;
    this.lastTickTime = Date.now();
  }

  addBot(botId, bot) {
    this.bots[botId] = bot;
  }

  removeBot(botId) {
    delete this.bots[botId];
  }

  startGameLoop() {
    this.gameLoopInterval = setInterval(() => this.gameTick(), 1000 / 60); // 60 ticks per second
  }

  stopGameLoop() {
    clearInterval(this.gameLoopInterval);
  }

  gameTick() {
    const currentTime = Date.now();
    const deltaTime = (currentTime - this.lastTickTime) / 1000; // in seconds
    this.lastTickTime = currentTime;

    // Update bot physics and states
    for (const botId in this.bots) {
      const bot = this.bots[botId];
      bot.update(deltaTime);

      // Check for module usage
      if (bot.moduleToUse) {
        this.activateModule(bot, bot.moduleToUse);
        bot.moduleToUse = null; // Reset after activation
      }
    }

    // Update projectiles
    this.projectiles = this.projectiles.filter(projectile => {
      projectile.update(deltaTime);
      // Check for collisions with bots or environment
      for (const botId in this.bots) {
        const bot = this.bots[botId];
        if (this.checkCollision(projectile, bot)) {
          this.applyGooEffect(bot, projectile.position);
          return false; // Remove projectile on collision
        }
      }
      // Remove if out of bounds or expired
      return projectile.isAlive();
    });

    // Update puddles (e.g., decay, check for bots in puddle)
    this.puddles = this.puddles.filter(puddle => {
      puddle.update(deltaTime);
      for (const botId in this.bots) {
        const bot = this.bots[botId];
        if (this.checkCollision(puddle, bot)) {
          this.applySlowEffect(bot, puddle.slowFactor);
        }
      }
      return puddle.isAlive();
    });

    // Emit game state to clients
    this.io.emit('gameState', this.getGameState());
  }

  activateModule(bot, moduleType) {
    switch (moduleType) {
      case 'EMP Emitter':
        this.activateEMPEmitter(bot);
        break;
      case 'Goo Cannon':
        this.activateGooCannon(bot);
        break;
      // Add other modules here
    }
  }

  activateEMPEmitter(activatingBot) {
    console.log(`EMP Emitter activated by ${activatingBot.id}`);
    for (const botId in this.bots) {
      const targetBot = this.bots[botId];
      if (activatingBot.id !== targetBot.id && this.getDistance(activatingBot, targetBot) <= activatingBot.moduleConfig['EMP Emitter'].effect_range) {
        targetBot.disableCode(activatingBot.moduleConfig['EMP Emitter'].duration);
        console.log(`Bot ${targetBot.id} disabled by EMP`);
      }
    }
  }

  activateGooCannon(activatingBot) {
    console.log(`Goo Cannon activated by ${activatingBot.id}`);
    const config = activatingBot.moduleConfig['Goo Cannon'];
    const projectile = new Projectile(activatingBot.position, activatingBot.direction, config.projectile_speed, config.effect_range, 'goo');
    this.projectiles.push(projectile);
  }

  applyGooEffect(bot, position) {
    console.log(`Goo effect applied to ${bot.id} at position ${position.x}, ${position.y}`);
    const config = bot.moduleConfig['Goo Cannon']; // Assuming bot has access to module configs
    const puddle = new Puddle(position, config.puddle_duration, config.puddle_slow_factor);
    this.puddles.push(puddle);
  }

  applySlowEffect(bot, slowFactor) {
    bot.applySlow(slowFactor);
  }

  checkCollision(obj1, obj2) {
    // Simple circular collision detection for now
    const dist = this.getDistance(obj1, obj2);
    return dist < (obj1.radius || 0) + (obj2.radius || 0);
  }

  getDistance(obj1, obj2) {
    const dx = obj1.position.x - obj2.position.x;
    const dy = obj1.position.y - obj2.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  getGameState() {
    const botsState = {};
    for (const botId in this.bots) {
      botsState[botId] = this.bots[botId].getState();
    }
    const projectilesState = this.projectiles.map(p => p.getState());
    const puddlesState = this.puddles.map(p => p.getState());
    return { bots: botsState, projectiles: projectilesState, puddles: puddlesState };
  }
}

// Dummy classes for now, will be properly defined elsewhere
class Projectile {
  constructor(position, direction, speed, range, type) {
    this.position = { ...position };
    this.direction = direction;
    this.speed = speed;
    this.range = range;
    this.type = type;
    this.distanceTraveled = 0;
    this.isAlive = () => this.distanceTraveled < this.range;
    this.radius = 5; // Example radius
  }

  update(deltaTime) {
    const moveAmount = this.speed * deltaTime;
    this.position.x += Math.cos(this.direction) * moveAmount;
    this.position.y += Math.sin(this.direction) * moveAmount;
    this.distanceTraveled += moveAmount;
  }

  getState() {
    return { position: this.position, type: this.type };
  }
}

class Puddle {
  constructor(position, duration, slowFactor) {
    this.position = { ...position };
    this.duration = duration;
    this.slowFactor = slowFactor;
    this.spawnTime = Date.now();
    this.isAlive = () => (Date.now() - this.spawnTime) < this.duration;
    this.radius = 20; // Example radius
  }

  update(deltaTime) {
    // Puddles don't move, just check for expiry
  }

  getState() {
    return { position: this.position, slowFactor: this.slowFactor, remainingTime: this.duration - (Date.now() - this.spawnTime) };
  }
}

module.exports = GameEngine;
