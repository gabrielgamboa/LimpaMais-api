'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING(80),
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');

  }
};
