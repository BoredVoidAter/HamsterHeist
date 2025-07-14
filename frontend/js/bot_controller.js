
class BotController {
    constructor(bot) {
        this.bot = bot;
        this.userCode = "";
        this.botAPI = {
            setThrottle: (value) => this.bot.setThrottle(value),
            setSteering: (value) => this.bot.setSteering(value),
            // Add other bot control methods here as needed
        };
        this.sensorAPI = {}; // Will be populated by physics.js
    }

    setUserCode(code) {
        this.userCode = code;
    }

    update() {
        try {
            // Create a function from the user's code
            const userFunction = new Function('bot', 'sensors', this.userCode);
            // Execute the user's code, passing the bot and sensor APIs
            userFunction(this.botAPI, this.sensorAPI);
        } catch (error) {
            console.error("Error executing bot code:", error);
        }
    }
}
