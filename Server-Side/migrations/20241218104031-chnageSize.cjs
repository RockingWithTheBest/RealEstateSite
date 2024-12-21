'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Alter the 'Agents' table to change column sizes
    await queryInterface.changeColumn('Agents', 'full_name', {
      type: Sequelize.STRING(50),
      allowNull: false,
    });

    await queryInterface.changeColumn('Agents', 'email_address', {
      type: Sequelize.STRING(50),
      allowNull: true, // Adjust if you want to make it NOT NULL
    });
  },

  async down (queryInterface, Sequelize) {
    // Revert the changes by changing the column sizes back to the original
    await queryInterface.changeColumn('Agents', 'full_name', {
      type: Sequelize.STRING(255), // or the original length
      allowNull: false,
    });

    await queryInterface.changeColumn('Agents', 'email_address', {
      type: Sequelize.STRING(255), // or the original length
      allowNull: true, // Adjust if you want to make it NOT NULL
    });
  }
};