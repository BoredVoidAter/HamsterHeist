# HamsterHeist

HamsterHeist is a competitive, physics-based web game where players build and program tiny, autonomous hamster-bots to sneak through a complex digital maze and steal a coveted golden sunflower seed. It's a hilarious blend of robotics simulation, coding puzzles, and chaotic multiplayer fun.

## Features

### Core Gameplay
Players design their bot's physical chassis (affecting weight and traction) and then write simple, block-based or JavaScript code to control its logic and sensors for navigating traps, other bots, and dynamic obstacles. The core challenge lies in creating an AI that can adapt to changing environments and outsmart other players' creations in real-time, multiplayer heists.

### Dynamic Maze Events (New in v7)
During a heist, random global events can trigger, altering the rules of the maze for a short period. This forces players to write more robust, adaptive AI that can handle unexpected conditions. Events could include 'Magnetic Pulse' (temporarily scrambles sensors), 'Low Gravity Zone' (alters physics), or 'Trap Malfunction' (disables all traps for 15 seconds). The active event is displayed on the HUD, and a new API function `bot.getCurrentEvent()` becomes available to the bot's script.

### Hamster-Bot Customization Bay (New in v7)
A new 'Garage' section in the main menu where players can apply cosmetic items to their hamster-bots. Players can unlock new chassis paints, trail effects, and accessories (e.g., tiny propeller hats, racing stripes, small flags) by completing challenges or using in-game currency earned from successful heists. These customizations are purely visual and do not affect bot performance, allowing for player expression without impacting competitive balance.

### Scrap & Crafting System (New in v7)
Adds a simple economy around bot parts. After matches, players earn 'Scrap' based on performance (time, objectives, etc.). This Scrap can be used in a new 'Workshop' UI to craft single-use 'Consumable Modules' like a 'Nitro Boost' for a quick burst of speed or a 'Smokescreen' to temporarily obscure vision. This provides a way to spend earned currency and make strategic one-shot decisions before a match begins.

## Getting Started

To get the HamsterHeist project up and running on your local machine, follow these steps:

### Prerequisites

Make sure you have the following installed:
*   Node.js (LTS version recommended)
*   npm (comes with Node.js)

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

### Running the Application

To start the HamsterHeist server, run the following command:

```bash
npm start
```

This will start the Node.js server, which serves the game's frontend and handles backend logic, including WebSocket connections for real-time gameplay.

Once the server is running, open your web browser and navigate to `http://localhost:3000` (or the port indicated in your server console) to play HamsterHeist!

## Project Structure

```
.
├── index.html              # Main HTML file for the game
├── package.json            # Project dependencies and scripts
├── README.md               # This file
├── assets/                 # Game assets (images, sounds, level configs)
│   └── levels/
│       └── level_config.json # Configuration for maze levels
├── backend/                # Server-side code (Node.js, Python for specific services)
│   ├── heist_recorder.py   # Records heist simulations
│   ├── matchmaking_service.py # Handles player matchmaking
│   ├── server.js           # Main Node.js server entry point
│   ├── api/                # Backend API routes
│   ├── database/           # Database models and utilities
│   ├── game/               # Game logic (engine, bot API, simulation)
│   ├── game_engine/        # Maze generation and core game mechanics
│   ├── models/             # Data models for bots and components
│   └── services/           # Backend services (e.g., rewards)
├── db/                     # Database migrations and schemas
│   ├── migrations/         # Database migration scripts
│   └── schemas/            # Database schemas
├── frontend/               # Client-side code (JavaScript, React components)
│   ├── game.js             # Core game client logic
│   ├── input.js            # Input handling
│   ├── physics.js          # Physics simulation (client-side)
│   ├── renderer.js         # Game rendering
│   ├── ui.js               # General UI logic
│   ├── js/                 # JavaScript utilities
│   └── src/                # React components and main application logic
│       ├── api/            # Frontend API interactions
│       ├── components/     # Reusable UI components (Lobby, Workshop, HUD)
│       ├── game/           # Client-side game entities (Bot, EntityManager)
│       ├── pages/          # Main application pages (Community Hub, Replay Viewer)
│       ├── services/       # Frontend services
│       └── views/          # Specific views (Customization Bay, Pre-Heist Lobby)
├── node_modules/           # Installed Node.js modules
├── static/                 # Static files (CSS, images)
│   └── css/
│       ├── game_hud.css    # Styles for the game HUD
│       └── style.css       # General styles
└── templates/              # HTML templates
    └── community_hub.html  # Template for the community hub
```

## Contributing

We welcome contributions to HamsterHeist! Please see our `CONTRIBUTING.md` (if available) for guidelines on how to submit issues, propose features, and make pull requests.

## License

This project is licensed under the ISC License. See the `LICENSE` file for details.

## Contact

For any questions or inquiries, please open an issue on the GitHub repository.