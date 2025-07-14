const Physics = {
    // Basic AABB collision detection
    checkCollision: (obj1, obj2) => {
        return obj1.x < obj2.x + obj2.width &&
               obj1.x + obj1.width > obj2.x &&
               obj1.y < obj2.y + obj2.height &&
               obj1.y + obj1.height > obj2.y;
    },

    // Resolve collision by moving obj1 out of obj2
    resolveCollision: (obj1, obj2) => {
        const dx = (obj1.x + obj1.width / 2) - (obj2.x + obj2.width / 2);
        const dy = (obj1.y + obj1.height / 2) - (obj2.y + obj2.height / 2);

        const width = (obj1.width + obj2.width) / 2;
        const height = (obj1.height + obj2.height) / 2;

        const crossWidth = width * dy;
        const crossHeight = height * dx;

        if (Math.abs(dx) < width && Math.abs(dy) < height) {
            if (crossWidth > crossHeight) {
                if (crossWidth > -crossHeight) {
                    // bottom collision
                    obj1.y = obj2.y + obj2.height;
                } else {
                    // left collision
                    obj1.x = obj2.x - obj1.width;
                }
            } else {
                if (crossWidth > -crossHeight) {
                    // right collision
                    obj1.x = obj2.x + obj2.width;
                } else {
                    // top collision
                    obj1.y = obj2.y - obj1.height;
                }
            }
        }
    },

    applyMovement: (obj, deltaTime) => {
        obj.x += obj.vx * deltaTime;
        obj.y += obj.vy * deltaTime;
    }
};
