'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "diarists",
      "url_photo",
      {
        type: Sequelize.STRING(80),
        allowNull: true
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("diarists", "url_photo");
  }
};
