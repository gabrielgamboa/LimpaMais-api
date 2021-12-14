'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "users",
      "url_photo",
      {
        type: Sequelize.STRING(80),
        allowNull: true
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("users", "url_photo");
  }
};
