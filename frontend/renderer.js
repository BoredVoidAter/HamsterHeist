class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    drawCircle(x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawMaze(maze, wallSize, wallColor) {
        maze.forEach(wall => {
            this.drawRect(wall.x, wall.y, wall.width, wall.height, wallColor);
        });
    }

    drawHazard(hazard, color) {
        this.drawRect(hazard.position.x, hazard.position.y, hazard.size.width, hazard.size.height, color);
        // You might want to add more sophisticated rendering for different hazard types
        // e.g., for Piston Crushers, draw a different shape or add animation.
    }

    drawHamster(hamster, color) {
        this.drawCircle(hamster.x, hamster.y, hamster.radius, color);
    }

    drawSunflowerSeed(seed, color) {
        this.drawCircle(seed.x, seed.y, seed.radius, color);
    }

    drawText(text, x, y, color, font) {
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(text, x, y);
    }
}
