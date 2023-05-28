'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableName = 'Users'; 

    const table = await queryInterface.describeTable(tableName);
    if (!table.createdAt) {
      await queryInterface.addColumn(tableName, 'createdAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableName = 'Users'; 
    await queryInterface.removeColumn(tableName, 'createdAt');
  },
};
