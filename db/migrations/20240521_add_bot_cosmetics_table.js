module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BotCosmetics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // assuming a Users table exists
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cosmeticType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cosmeticId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      unlockedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BotCosmetics');
  }
};