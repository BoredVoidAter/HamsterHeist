// backend/game/SandboxExecutor.js

const vm = require('vm');
const BotAPI = require('./BotAPI');

class SandboxExecutor {
  constructor(gameEngine) {
    this.gameEngine = gameEngine;
  }

  executeBotCode(bot, code) {
    const botAPI = new BotAPI(bot, this.gameEngine);

    const sandbox = {
      bot: botAPI,
      // Expose other necessary global objects or functions to the sandbox
      console: {
        log: (...args) => console.log(`Bot ${bot.id} LOG:`, ...args)
      },
      // Prevent access to Node.js globals
      require: undefined,
      process: undefined,
      module: undefined,
      __filename: undefined,
      __dirname: undefined,
    };

    const script = new vm.Script(code);
    try {
      script.runInNewContext(sandbox, { timeout: 50 }); // 50ms timeout for bot code execution
    } catch (error) {
      console.error(`Bot ${bot.id} code execution error:`, error);
      // Handle errors, e.g., disable bot, log to player
    }
  }
}

module.exports = SandboxExecutor;
