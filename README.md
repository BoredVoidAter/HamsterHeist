# HamsterHeist

HamsterHeist is a competitive, physics-based web game where players build and program tiny, autonomous hamster-bots to sneak through a complex digital maze and steal a coveted golden sunflower seed. Players design their bot's physical chassis (affecting weight and traction) and then write simple, block-based or JavaScript code to control its logic and sensors for navigating traps, other bots, and dynamic obstacles. The core challenge lies in creating an AI that can adapt to changing environments and outsmart other players' creations in real-time, multiplayer heists. It's a hilarious blend of robotics simulation, coding puzzles, and chaotic multiplayer fun.

## Features (Version 1)

This initial version lays the groundwork for the HamsterHeist experience, focusing on core mechanics and a basic playable state:

*   **Project Scaffolding & Basic Web Server**: A foundational Node.js/Express backend is set up to serve the main `index.html` page and all static assets (like CSS and client-side JavaScript files), establishing the web application's base.
*   **Game Canvas & Static Scene Rendering**: The game's visual core is built upon an HTML5 Canvas. Client-side JavaScript manages a game loop to render a static scene, which includes a predefined maze layout, the player's hamster-bot, and the golden sunflower seed objective.
*   **Keyboard-Based Hamster Control & Simple Physics**: Players can directly control the hamster-bot using keyboard arrow keys. A rudimentary physics engine handles basic movement (velocity, position updates) and implements Axis-Aligned Bounding Box (AABB) collision detection to prevent the hamster-bot from passing through maze walls.
*   **Win Condition and Basic UI**: The primary game objective is implemented. The game detects when the hamster-bot collides with the golden sunflower seed. Upon a successful "heist," the game state updates to "won," pausing the game and displaying a simple "You Win!" message directly over the canvas.

## Features (Version 2)

Building upon the foundation, Version 2 introduces key enhancements for strategic gameplay, persistence, and competitive multiplayer:

*   **The Heist Objective: Golden Sunflower Seed & Target Sensor**: Introduces the primary game objective: a 'Golden Sunflower Seed' placed at the end of the maze. To facilitate goal-oriented programming, bots are upgraded with a new 'Target Sensor'. This sensor provides the AI with the distance and angle to the seed via the API (e.g., `sensors.getTargetData()`), shifting the challenge from pure navigation to strategic pathfinding. The game loop is updated to detect when a bot reaches the seed, stopping the timer and marking the run as a success.
*   **Code Persistence with Backend Storage**: Players can now save their hard-earned bot AI scripts to a server. This feature introduces a backend with a simple database to store user code. The coding UI panel is enhanced with 'Save' and 'Load' buttons, allowing players to create, name, and retrieve their scripts across sessions. This encourages the development of more complex and refined bot logic without the fear of losing work on a browser refresh.
*   **Asynchronous Multiplayer 'Ghost' Racing**: Introduces a competitive asynchronous multiplayer mode. When a player successfully completes a heist, their bot's entire run (as a sequence of position/rotation data over time) is saved. Players can then choose to race against a 'ghost' of another player's successful run. The ghost bot appears in the maze as a visible, physical object, replaying its recorded path. This requires updating the physics engine to handle bot-on-bot collisions, turning other players' ghosts into dynamic, unpredictable obstacles.

## Features (Version 3)

Version 3 introduces significant new gameplay mechanics, focusing on player progression and dynamic environments:

*   **The Workshop & Swappable Bot Modules**: Introduces a player progression system where completing heists earns a currency called 'Scrap'. Players can spend Scrap in a new 'Workshop' UI to unlock and equip persistent modules for their hamster-bot. These modules provide new active or passive abilities, creating strategic trade-offs. Examples include a 'Grappling Hook' for new movement options (activated via `actions.useModule()`), or 'High-Traction Treads' that passively increase grip at the cost of speed. This adds a 'bot-building' meta-game, requiring players to synchronize their bot's hardware with its AI software.
*   **Dynamic Environmental Hazards & Proximity Sensor**: Upgrades the maze from a static layout to a dynamic environment filled with new hazards. This includes traps like 'Piston Crushers' that activate on a timer and 'Floor Vents' that periodically release a blast of air, pushing bots off course. To counteract these, a new 'Proximity Sensor' is added to the bot's API. The `sensors.getProximityData()` function allows the AI to detect the type, distance, and state (e.g., active/inactive) of the nearest object in its forward path, forcing players to evolve their code from simple pathfinding to reactive, timing-based logic.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

*   **Node.js**: (LTS version recommended)
*   **npm**: (Node Package Manager, which comes bundled with Node.js)
*   **Python 3**: (For the Workshop backend)
*   **pip**: (Python Package Installer, which comes bundled with Python)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/HamsterHeist.git
    cd HamsterHeist
    ```
    *(Note: Replace `your-username` with the actual GitHub username if this project were hosted.)*

2.  **Install Node.js dependencies**:
    ```bash
    npm install
    ```
    This command reads the `package.json` file and installs all necessary server-side and client-side dependencies.

3.  **Install Python dependencies**:
    ```bash
    pip install Flask SQLAlchemy
    ```

### Running the Game

1.  **Start the Node.js development server**:
    ```bash
    npm start
    ```
    This command executes the `start` script defined in `package.json`, which runs the Node.js backend server. You should see output in your console indicating that the server has started and is listening on a specific port.

2.  **Start the Python Workshop backend**:
    Open a new terminal window and navigate to the project root directory. Then run:
    ```bash
    python backend/routes/workshop_api.py
    ```
    *(Note: This is a simplified way to run the Flask app for development. For production, you would use a WSGI server like Gunicorn or uWSGI.)*

3.  **Open in your browser**:
    Once both servers are running, open your web browser and navigate to:
    `http://localhost:3000`

    *(Note: If port 3000 is already in use on your system, the server might automatically select an alternative port, such as `3001`. Check your console output for the exact URL.)*

## How to Play

*   Use the **arrow keys** (Up, Down, Left, Right) to control your hamster-bot's movement.
*   Navigate your hamster-bot through the maze, avoiding obstacles.
*   Your primary objective is to reach and collide with the **golden sunflower seed**.
*   Upon successfully collecting the seed, a "You Win!" message will appear, and the game will pause.
*   **Program your bot**: Utilize the in-game coding UI to write JavaScript logic for your bot. Use the `sensors.getTargetData()` API to help your bot find the golden sunflower seed, and the new `sensors.getProximityData()` for reactive navigation around hazards.
*   **Save and Load Scripts**: Use the 'Save' and 'Load' buttons in the coding UI to manage your bot AI scripts.
*   **Race against Ghosts**: After completing a heist, you can race against the recorded "ghosts" of other players' successful runs. These ghosts will appear as physical obstacles in the maze.
*   **Workshop**: Earn 'Scrap' by completing heists and spend it in the Workshop to unlock and equip new modules for your bot, enhancing its abilities. Activate active modules using `actions.useModule()`.

## Technologies Used

*   **Backend**:
    *   Node.js
    *   Express.js (for serving web content and API endpoints)
    *   Python (for Workshop backend)
    *   Flask (for Workshop backend)
    *   SQLAlchemy (for Workshop backend ORM)
*   **Frontend**:
    *   HTML5 Canvas (for game rendering)
    *   JavaScript (ES6+)
    *   CSS3
    *   Matter.js (for physics simulation)

## Future Plans

HamsterHeist is planned to evolve with exciting new features:

*   Integration of a more robust physics engine (e.g., `matter.js`).
*   Development of a programmable hamster-bot AI, allowing players to write logic using block-based or JavaScript coding.
*   Implementation of real-time multiplayer functionality for competitive play.
*   Extensive customization options for bot chassis design and sensor integration.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository, create a new branch for your features or bug fixes, and submit a pull request.

## License

This project is currently under development. Licensing information will be provided in a future update.