# HamsterHeist

HamsterHeist is a competitive, physics-based web game where players build and program tiny, autonomous hamster-bots to sneak through a complex digital maze and steal a coveted golden sunflower seed. Design your bot's physical chassis and write simple, block-based or JavaScript code to control its logic and sensors for navigating traps, other bots, and dynamic obstacles. The core challenge lies in creating an AI that can adapt to changing environments and outsmart other players' creations in real-time, multiplayer heists. It's a hilarious blend of robotics simulation, coding puzzles, and chaotic multiplayer fun.

## Features

### Core Gameplay
*   **Physics-Based Movement**: Realistic physics simulation for bot movement, collisions, and interactions with the environment.
*   **Autonomous Bots**: Program your bot's AI using a block-based visual editor or JavaScript to navigate the maze and achieve objectives.
*   **Dynamic Mazes**: Procedurally generated or hand-crafted mazes with various obstacles, traps, and interactive elements.
*   **Multiplayer Heists**: Compete against other players' bots in real-time to steal the golden sunflower seed.

### Version 5 Updates

*   **Advanced Chassis & Power Core System**:
    *   Expanded bot customization by separating the chassis from the power source.
    *   Players now select a 'Chassis' (defining weight, armor, and module slots) and a 'Power Core' (defining total energy and recharge rate).
    *   Actions like moving, boosting, and using modules now consume energy. Bots must manage this new resource, and AIs can be programmed to conserve energy or go for powerful, high-consumption bursts.
    *   The bot API is updated with `bot.getEnergy()` and `bot.getEnergyRechargeRate()`.

*   **Dynamic Maze Events**:
    *   Introduces unpredictable, timed events that alter the maze during a heist.
    *   Events like 'Laser Grid Activation', 'Magnetic Pulse', and 'Floor Friction Change' create temporary deadly barriers or alter environmental properties.
    *   These events are announced shortly before they occur, giving adaptive AIs a chance to react.
    *   The bot API is enhanced with `world.onEventAnnouncement(callback)` and `world.getActiveEvents()` to allow bots to programmatically respond to these dynamic changes.

*   **Bot Blueprint & Community Sharing**:
    *   Allows players to save their complete bot designs (chassis, modules, and code) as a shareable 'Blueprint'.
    *   Players can publish their Blueprints to a new 'Community Hub' where others can browse, rate, and import them into their own workshop.
    *   This fosters a collaborative environment, helps new players learn effective strategies, and allows creators to gain recognition.
    *   The system includes endpoints for publishing, searching, and fetching blueprints.

## Getting Started

To get HamsterHeist up and running on your local machine, follow these steps:

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (comes with Node.js)
*   Python 3.x (for backend components)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/HamsterHeist.git
    cd HamsterHeist
    ```

2.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```

3.  **Install Python dependencies:**
    Navigate to the `backend` directory and install the required Python packages.
    ```bash
    cd backend
    pip install -r requirements.txt # Assuming a requirements.txt exists or will be created
    cd ..
    ```

### Running the Application

To start both the frontend and backend servers, run the following command from the project root directory:

```bash
npm start
```

This command will typically:
*   Start the Node.js backend server (e.g., `backend/server.js`).
*   Serve the frontend application (e.g., `index.html` and associated assets).

Once the servers are running, open your web browser and navigate to `http://localhost:3000` (or whatever port is indicated in your console output) to access the game.

## Development

### Project Structure

*   `frontend/`: Contains all client-side code (HTML, CSS, JavaScript for game logic, UI).
*   `backend/`: Contains server-side code (Node.js for API, Python for game simulation/blueprints).
*   `assets/`: Game assets like images, sounds, and level configurations.
*   `db/`: Database migrations and schema definitions.
*   `static/`: Static files served directly by the web server.
*   `templates/`: HTML templates.

### Running Tests

(Instructions for running tests would go here, e.g., `npm test` for JavaScript tests, `pytest` for Python tests)

## Contributing

We welcome contributions to HamsterHeist! Please see our `CONTRIBUTING.md` (if it exists) for guidelines on how to contribute.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.