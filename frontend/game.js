document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    const renderer = new Renderer(canvas);
    const input = new InputHandler();
    const gameUI = new GameUI();
    const entityManager = new EntityManager();
    const physicsEngine = new PhysicsEngine();

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

    let maze = [];
    let hazards = [];

    // Load level configuration
    fetch('./assets/levels/level_config.json')
        .then(response => response.json())
        .then(data => {
            const levelData = data.level1; // Assuming we load level1 for now
            maze = levelData.maze.map((row, rIdx) => 
                row.split('').map((cell, cIdx) => {
                    if (cell === 'X') {
                        return { x: cIdx * 50, y: rIdx * 50, width: 50, height: 50 }; // Assuming 50x50 grid cells
                    }
                    return null;
                }).filter(Boolean)
            ).flat();
            hazards = levelData.hazards;

            hamsterBot.x = levelData.start_position.x * 50; // Adjust for grid size
            hamsterBot.y = levelData.start_position.y * 50;

            sunflowerSeed.x = levelData.seed_position.x * 50;
            sunflowerSeed.y = levelData.seed_position.y * 50;

            // Add maze and hazards to physics engine
            physicsEngine.addMaze(maze.map(wall => Bodies.rectangle(wall.x + wall.width / 2, wall.y + wall.height / 2, wall.width, wall.height, { isStatic: true })));
            hazards.forEach(hazard => physicsEngine.addHazard(hazard));

            requestAnimationFrame(gameLoop);
        })
        .catch(error => console.error('Error loading level config:', error));

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

        // Update physics engine
        physicsEngine.update(deltaTime);

        // Collision with sunflower seed
        if (Physics.checkCollision(hamsterBot, sunflowerSeed)) {
            gameWon = true;
            endTime = performance.now();
        }

        // Render
        renderer.clear();
        renderer.drawMaze(maze, 10, '#555');
        hazards.forEach(hazard => renderer.drawHazard(hazard, 'red')); // Draw hazards
        renderer.drawHamster(hamsterBot, 'orange');
        renderer.drawSunflowerSeed(sunflowerSeed, 'yellow');

        requestAnimationFrame(gameLoop);
    }

    // Initial call to start the game loop is now inside the fetch callback
});

// Import statements for new classes
import { EntityManager } from './src/game/EntityManager.js';
import { Bot } from './src/game/Bot.js';
import { GameUI } from './src/game/GameUI.js';
import PhysicsEngine from './src/game/physics_engine.js';
import sensors from './src/game/sensor_suite.js';
import actions from './src/game/bot_actions.js';
