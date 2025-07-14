# HamsterHeist

## Description
HamsterHeist is a competitive, physics-based web game where players design and program autonomous hamster-bots to navigate complex digital mazes and steal a coveted golden sunflower seed. Players customize their bot's physical chassis, influencing its weight and traction, and then write simple, block-based or JavaScript code to control its logic and sensors. The core challenge lies in creating an AI that can adapt to changing environments, outsmart other bots, and overcome dynamic obstacles in real-time, multiplayer heists. It's a hilarious blend of robotics simulation, coding puzzles, and chaotic multiplayer fun, now enhanced with advanced AI capabilities and direct bot-to-bot interaction.

## Features

### Core Gameplay
*   **Bot Customization**: Design unique bot chassis affecting physics and performance.
*   **AI Programming**: Program bot logic using block-based or JavaScript coding interfaces.
*   **Dynamic Mazes**: Navigate through procedurally generated or pre-designed mazes with various traps and obstacles.
*   **Multiplayer Heists**: Compete against other players' bots in real-time, chaotic battles for the golden sunflower seed.

### Version 4 Enhancements
*   **Sabotage Modules & Bot-to-Bot Interaction**: Introduces two new Workshop modules for direct bot-to-bot interference.
    *   **EMP Emitter**: Temporarily disables the code execution of nearby enemy bots.
    *   **Goo Cannon**: Fires a projectile that creates a slowing puddle on the ground, hindering movement.
    These modules are activated via the `actions.useModule()` function, requiring players to integrate offensive or defensive strategies into their AI.
*   **Advanced AI Memory & State Management**: Enhances the bot programming API with persistent state and memory systems.
    *   `bot.setState('newState')`: Sets the bot's current operational state (e.g., 'PATROL', 'ATTACK', 'FLEE').
    *   `bot.getState()`: Retrieves the bot's current state.
    *   `bot.setMemory('key', value)`: Stores key-value pairs in the bot's persistent memory.
    *   `bot.getMemory('key')`: Retrieves values from the bot's memory.
    This allows bots to remember information between code executions (e.g., last known enemy position) and implement complex strategies based on internal state machines, moving beyond simple reactive logic.
*   **Heist Replays & Post-Match Analysis**: Adds a comprehensive system to record and replay entire heists.
    *   After a match, players can access a 'Post-Match Analysis' screen with a full replay viewer.
    *   The viewer includes playback controls (play, pause, speed control).
    *   Clicking on any bot during replay displays its current sensor data and internal state/memory in real-time, providing an invaluable tool for debugging AI, understanding heist outcomes, and learning from opponents' strategies.

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
*   Node.js (LTS version recommended)
*   npm (Node Package Manager, usually comes with Node.js)

### Installation
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/HamsterHeist.git
    cd HamsterHeist
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Running the Game
To start the HamsterHeist server and access the game:
1.  **Start the server**:
    ```bash
    npm start
    ```
    This will typically start the backend server and serve the frontend application.
2.  **Access the game**:
    Open your web browser and navigate to `http://localhost:3000` (or the port indicated in your console output).

## Development

### Project Structure
*   `backend/`: Contains the Node.js server, API endpoints, game engine, and database models.
*   `frontend/`: Contains the client-side game logic, UI components, and assets.
*   `assets/`: Game assets like level configurations.
*   `db/`: Database migrations.
*   `node_modules/`: Installed Node.js packages.
*   `static/`: Static files like CSS.

### Running Tests
(Instructions for running tests would go here, e.g., `npm test`)

## Contributing
We welcome contributions! Please see `CONTRIBUTING.md` for guidelines.

## License
This project is licensed under the MIT License - see the `LICENSE` file for details.