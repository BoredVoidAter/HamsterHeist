# HamsterHeist

HamsterHeist is a competitive, physics-based web game where players build and program tiny, autonomous hamster-bots to sneak through a complex digital maze and steal a coveted golden sunflower seed. It's a hilarious blend of robotics simulation, coding puzzles, and chaotic multiplayer fun.

## Features (Version 1)

This initial version lays the groundwork for the HamsterHeist experience, focusing on core mechanics and a basic playable state:

*   **Project Scaffolding & Basic Web Server**: A foundational Node.js/Express backend is set up to serve the main `index.html` page and all static assets (like CSS and client-side JavaScript files), establishing the web application's base.
*   **Game Canvas & Static Scene Rendering**: The game's visual core is built upon an HTML5 Canvas. Client-side JavaScript manages a game loop to render a static scene, which includes a predefined maze layout, the player's hamster-bot, and the golden sunflower seed objective.
*   **Keyboard-Based Hamster Control & Simple Physics**: Players can directly control the hamster-bot using keyboard arrow keys. A rudimentary physics engine handles basic movement (velocity, position updates) and implements Axis-Aligned Bounding Box (AABB) collision detection to prevent the hamster-bot from passing through maze walls.
*   **Win Condition and Basic UI**: The primary game objective is implemented. The game detects when the hamster-bot collides with the golden sunflower seed. Upon a successful "heist," the game state updates to "won," pausing the game and displaying a simple "You Win!" message directly over the canvas.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

*   **Node.js**: (LTS version recommended)
*   **npm**: (Node Package Manager, which comes bundled with Node.js)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/HamsterHeist.git
    cd HamsterHeist
    ```
    *(Note: Replace `your-username` with the actual GitHub username if this project were hosted.)*

2.  **Install dependencies**:
    ```bash
    npm install
    ```
    This command reads the `package.json` file and installs all necessary server-side and client-side dependencies.

### Running the Game

1.  **Start the development server**:
    ```bash
    npm start
    ```
    This command executes the `start` script defined in `package.json`, which typically runs the Node.js backend server. You should see output in your console indicating that the server has started and is listening on a specific port.

2.  **Open in your browser**:
    Once the server is running, open your web browser and navigate to:
    `http://localhost:3000`

    *(Note: If port 3000 is already in use on your system, the server might automatically select an alternative port, such as `3001`. Check your console output for the exact URL.)*

## How to Play

*   Use the **arrow keys** (Up, Down, Left, Right) to control your hamster-bot's movement.
*   Navigate your hamster-bot through the maze, avoiding obstacles.
*   Your primary objective is to reach and collide with the **golden sunflower seed**.
*   Upon successfully collecting the seed, a "You Win!" message will appear, and the game will pause.

## Technologies Used

*   **Backend**:
    *   Node.js
    *   Express.js (for serving web content)
*   **Frontend**:
    *   HTML5 Canvas (for game rendering)
    *   JavaScript (ES6+)
    *   CSS3

## Future Plans

HamsterHeist is planned to evolve with exciting new features:

*   Integration of a more robust physics engine (e.g., `matter.js`).
*   Development of a programmable hamster-bot AI, allowing players to write logic using block-based or JavaScript coding.
*   Introduction of dynamic obstacles, traps, and interactive maze elements.
*   Implementation of real-time multiplayer functionality for competitive play.
*   Extensive customization options for bot chassis design and sensor integration.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository, create a new branch for your features or bug fixes, and submit a pull request.

## License

This project is currently under development. Licensing information will be provided in a future update.