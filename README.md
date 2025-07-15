# HamsterHeist

HamsterHeist is a competitive, physics-based web game where players build and program tiny, autonomous hamster-bots to sneak through a complex digital maze and steal a coveted golden sunflower seed. Design your bot's physical chassis and write simple, block-based or JavaScript code to control its logic and sensors for navigating traps, other bots, and dynamic obstacles. The core challenge lies in creating an AI that can adapt to changing environments and outsmart other players' creations in real-time, multiplayer heists. It's a hilarious blend of robotics simulation, coding puzzles, and chaotic multiplayer fun!

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Game](#running-the-game)
- [Gameplay](#gameplay)
- [Bot Programming](#bot-programming)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Gameplay

- **Physics-Based Movement**: Realistic bot movement and interactions powered by a robust physics engine.
- **Dynamic Mazes**: Procedurally generated mazes ensure every heist is a unique challenge.
- **Strategic Obstacles**: Navigate traps, dynamic barriers, and environmental hazards.
- **Multiplayer Heists**: Compete against other players' bots in real-time.

### Bot Customization & Programming

- **Chassis Design**: Customize your bot's physical chassis, affecting its weight, traction, and maneuverability.
- **Block-Based & JavaScript Coding**: Program your bot's AI using an intuitive block-based interface or direct JavaScript.
- **Sensor Suite**: Equip your bot with various sensors (e.g., proximity, vision) to gather environmental data.
- **Utility Modules**: Utilize modules for specific actions like boosting, shielding, or interacting with the environment.

### New in Version 6!

- **Team Heists (2v2 Mode)**: Form a team and queue for matches against other pairs. This introduces cooperative strategy, allowing bots to be programmed to work together. The bot API is extended with `bot.getTeamId()` and `bot.isAlly(otherBot)`, enabling advanced tactics like one bot creating a diversion while the other retrieves the golden seed.
- **Advanced Sensor & Utility Modules**: Deepen strategic programming with new high-skill modules:
    - **Lidar Scanner**: A high-energy active module providing a detailed grid-based snapshot of the bot's immediate surroundings.
    - **Hacking Module**: Interact with new 'Data Terminals' placed in the maze. A successful hack can yield rewards like disabling nearby traps or a small energy boost, creating valuable sub-objectives.
- **Post-Match Replay & Event Log**: After a heist concludes, players can access a full replay of the match. During the replay, select any bot to view a timestamped event log, showing all API calls made, sensor data received, and custom `console.log()` messages from their script. This is an invaluable tool for debugging AI logic and understanding bot behavior.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/en/) (LTS version recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/HamsterHeist.git
    cd HamsterHeist
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Game

To start the HamsterHeist server and access the game in your browser:

```bash
npm start
```

Once the server is running, open your web browser and navigate to `http://localhost:3000` (or the port indicated in your console).

## Gameplay

(This section would typically contain more detailed information about how to play the game, objectives, etc.)

## Bot Programming

(This section would typically contain more detailed information about the bot API, available functions, and how to write bot scripts.)

## Contributing

We welcome contributions to HamsterHeist! Please see our `CONTRIBUTING.md` for guidelines on how to get started.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.