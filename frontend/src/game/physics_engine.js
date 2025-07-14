
// physics_engine.js

import { Bodies, Composite, Engine, World } from './matter.js'; // Assuming matter.js is available

class PhysicsEngine {
    constructor() {
        this.engine = Engine.create();
        this.world = this.engine.world;
        this.hazards = [];

        // Configure gravity or other world properties if needed
        this.engine.world.gravity.y = 0; // No gravity for top-down game
    }

    addBot(botBody) {
        Composite.add(this.world, botBody);
    }

    addMaze(mazeBodies) {
        Composite.add(this.world, mazeBodies);
    }

    addHazard(hazardConfig) {
        let hazardBody;
        switch (hazardConfig.type) {
            case 'Piston Crusher':
                hazardBody = Bodies.rectangle(
                    hazardConfig.position.x,
                    hazardConfig.position.y,
                    hazardConfig.size.width,
                    hazardConfig.size.height,
                    { isStatic: true, label: 'piston' }
                );
                // Add logic for piston movement/activation over time
                break;
            case 'Floor Vent':
                hazardBody = Bodies.rectangle(
                    hazardConfig.position.x,
                    hazardConfig.position.y,
                    hazardConfig.size.width,
                    hazardConfig.size.height,
                    { isStatic: true, label: 'floorVent' }
                );
                // Add logic for air blast activation over time
                break;
            // Add other hazard types as needed
        }
        if (hazardBody) {
            Composite.add(this.world, hazardBody);
            this.hazards.push({ ...hazardConfig, body: hazardBody, isActive: false });
        }
    }

    update(deltaTime) {
        Engine.update(this.engine, deltaTime);

        // Update hazard states (e.g., activate/deactivate pistons, vents)
        this.hazards.forEach(hazard => {
            // Example: Simple timer-based activation
            if (hazard.activation_interval) {
                // This is a simplified example. Real implementation would need a proper timer.
                // For now, just toggle active state for demonstration.
                hazard.isActive = !hazard.isActive; // Toggle for demo
            }
        });
    }

    getEngine() {
        return this.engine;
    }

    getWorld() {
        return this.world;
    }
}

export default PhysicsEngine;
