document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    const renderer = new Renderer(canvas);
    const input = new InputHandler();
    const ui = new UI();

    let gameState = {
        hamster: {
            x: 50,
            y: 50,
            radius: 15,
            width: 30, // for AABB collision
            height: 30, // for AABB collision
            vx: 0,
            vy: 0,
            speed: 200
        },
        sunflowerSeed: {
            x: 700,
            y: 500,
            radius: 20,
            width: 40, // for AABB collision
            height: 40 // for AABB collision
        },
        maze: [
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
        ],
        gameWon: false
    };

    let lastTime = 0;

    function gameLoop(currentTime) {
        const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
        lastTime = currentTime;

        if (gameState.gameWon) {
            ui.showMessage('You Win!');
            return;
        }

        // Handle Input
        gameState.hamster.vx = 0;
        gameState.hamster.vy = 0;
        if (input.isKeyDown('ArrowUp')) {
            gameState.hamster.vy = -gameState.hamster.speed;
        }
        if (input.isKeyDown('ArrowDown')) {
            gameState.hamster.vy = gameState.hamster.speed;
        }
        if (input.isKeyDown('ArrowLeft')) {
            gameState.hamster.vx = -gameState.hamster.speed;
        }
        if (input.isKeyDown('ArrowRight')) {
            gameState.hamster.vx = gameState.hamster.speed;
        }

        // Apply Physics
        Physics.applyMovement(gameState.hamster, deltaTime);

        // Collision with maze walls
        gameState.maze.forEach(wall => {
            if (Physics.checkCollision(gameState.hamster, wall)) {
                Physics.resolveCollision(gameState.hamster, wall);
            }
        });

        // Collision with sunflower seed
        if (Physics.checkCollision(gameState.hamster, gameState.sunflowerSeed)) {
            gameState.gameWon = true;
        }

        // Render
        renderer.clear();
        renderer.drawMaze(gameState.maze, 10, '#555');
        renderer.drawHamster(gameState.hamster, 'orange');
        renderer.drawSunflowerSeed(gameState.sunflowerSeed, 'yellow');

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
});
