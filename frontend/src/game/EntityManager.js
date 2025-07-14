class EntityManager {
    constructor() {
        this.entities = {};
        this.nextId = 0;
    }

    addEntity(entity) {
        const id = this.nextId++;
        this.entities[id] = entity;
        return id;
    }

    getEntity(id) {
        return this.entities[id];
    }

    removeEntity(id) {
        delete this.entities[id];
    }

    getAllEntities() {
        return Object.values(this.entities);
    }
}
