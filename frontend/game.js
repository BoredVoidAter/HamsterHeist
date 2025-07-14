document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    const renderer = new Renderer(canvas);
    const input = new InputHandler();
    const gameUI = new GameUI();
    const entityManager = new EntityManager();

    const initialHamsterX = 50;
    const initialHamsterY = 50;
    const hamsterSpeed = 200;
    const hamsterRadius = 15;
    const hamsterBot = new Bot(initialHamsterX, initialHamsterY, hamsterRadius, hamsterSpeed);
    entityManager.addEntity(hamsterBot);

    const sunflowerSeed = {
        x: 700,
        y: 500,
        radius: 20,
        width: 40, // for AABB collision
        height: 40 // for AABB collision
    };

    const maze = [
        // Outer walls
        { x: 0, y: 0, width: canvas.width, height: 10 },
        { x: 0, y: canvas.height - 10, width: canvas.width, height: 10 },
        { x: 0, y: 0, width: 10, height: canvas.height },
        { x: canvas.width - 10, y: 0, width: 10, height: canvas.height },

        // Inner maze walls
        { x: 100, y: 100, width: 10, height: 200 },
        { x: 100, y: 300, width: 200, height: 10 },
        { x: 300, y: 100, width: 10, height: 200 },
        { x: 200, y: 400, width: 200, height: 10 },
        { x: 400, y: 200, width: 10, height: 200 },
        { x: 500, y: 100, width: 10, height: 200 },
        { x: 500, y: 300, width: 200, height: 10 },
        { x: 600, y: 400, width: 10, height: 200 }
    ];

    let gameWon = false;
    let startTime = performance.now();
    let endTime = 0;

    let lastTime = 0;

    function gameLoop(currentTime) {
        const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
        lastTime = currentTime;

        if (gameWon) {
            gameUI.showMessage(`You Win! Time: ${((endTime - startTime) / 1000).toFixed(2)} seconds`);
            return;
        }

        // Handle Input
        hamsterBot.vx = 0;
        hamsterBot.vy = 0;
        if (input.isKeyDown('ArrowUp')) {
            hamsterBot.vy = -hamsterBot.speed;
        }
        if (input.isKeyDown('ArrowDown')) {
            hamsterBot.vy = hamsterBot.speed;
        }
        if (input.isKeyDown('ArrowLeft')) {
            hamsterBot.vx = -hamsterBot.speed;
        }
        if (input.isKeyDown('ArrowRight')) {
            hamsterBot.vx = hamsterBot.speed;
        }

        // Update bot (AI will eventually go here)
        hamsterBot.update(deltaTime);

        // Apply Physics
        Physics.applyMovement(hamsterBot, deltaTime);

        // Collision with maze walls
        maze.forEach(wall => {
            if (Physics.checkCollision(hamsterBot, wall)) {
                Physics.resolveCollision(hamsterBot, wall);
            }
        });

        // Collision with sunflower seed
        if (Physics.checkCollision(hamsterBot, sunflowerSeed)) {
            gameWon = true;
            endTime = performance.now();
        }

        // Render
        renderer.clear();
        renderer.drawMaze(maze, 10, '#555');
        renderer.drawHamster(hamsterBot, 'orange');
        renderer.drawSunflowerSeed(sunflowerSeed, 'yellow');

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
});

// Import statements for new classes
import { EntityManager } from './src/game/EntityManager.js';
import { Bot } from './src/game/Bot.js';
import { GameUI } from './src/game/GameUI.js';
