'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('diarists', { 
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
      daily_rate: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      note: {
        type: Sequelize.STRING(80),
        allowNull: true
      },
      password_hash: {
        type: Sequelize.STRING(80),
        allowNull: false
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
    await queryInterface.dropTable("diarists");
  }
};
