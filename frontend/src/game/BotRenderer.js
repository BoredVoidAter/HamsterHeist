// frontend/src/game/BotRenderer.js

class BotRenderer {
  constructor(context) {
    this.ctx = context;
  }

  draw(bot, customization = {}) {
    const { x, y, radius } = bot;
    const { paint = 'gray', accessory = 'none' } = customization;

    this.ctx.save();
    this.ctx.translate(x, y);

    // Draw bot body (chassis and paint)
    this.ctx.beginPath();
    this.ctx.arc(0, 0, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = paint;
    this.ctx.fill();
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Draw accessory
    if (accessory === 'propeller_hat') {
      this.ctx.fillStyle = 'brown';
      this.ctx.fillRect(-5, -radius - 10, 10, 10); // Hat base
      this.ctx.beginPath();
      this.ctx.moveTo(0, -radius - 10);
      this.ctx.lineTo(5, -radius - 15);
      this.ctx.lineTo(-5, -radius - 15);
      this.ctx.closePath();
      this.ctx.fill(); // Propeller
    } else if (accessory === 'racing_stripes') {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(-radius, -radius / 4, radius * 2, radius / 2);
    }

    this.ctx.restore();
  }
}

export default BotRenderer;