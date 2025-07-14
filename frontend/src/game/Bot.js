class Bot {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.width = radius * 2;
        this.height = radius * 2;
        this.vx = 0;
        this.vy = 0;
        this.speed = speed;
        this.sensors = new BotSensors(this);
    }

    update(deltaTime) {
        // Bot AI logic will go here, using this.sensors
        // For now, basic movement
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
    }

    // This will be used by the bot's AI
    getTargetData(target) {
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx); // Radians

        return {
            distance: distance,
            angle: angle
        };
    }
}

class BotSensors {
    constructor(bot) {
        this.bot = bot;
    }

    getTargetData(target) {
        return this.bot.getTargetData(target);
    }
}
