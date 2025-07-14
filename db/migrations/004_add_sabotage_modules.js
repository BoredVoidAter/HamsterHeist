
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Modules', [
      {
        name: 'EMP Emitter',
        description: 'Temporarily disables code execution of nearby bots.',
        type: 'sabotage',
        cost: 500,
        cooldown: 10000, // 10 seconds
        effect_range: 150,
        duration: 3000, // 3 seconds
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Goo Cannon',
        description: 'Fires a projectile that creates a slowing puddle.',
        type: 'sabotage',
        cost: 400,
        cooldown: 8000, // 8 seconds
        effect_range: 200,
        projectile_speed: 500,
        puddle_duration: 5000, // 5 seconds
        puddle_slow_factor: 0.5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Modules', { name: { [Sequelize.Op.in]: ['EMP Emitter', 'Goo Cannon'] } }, {});
  }
};
