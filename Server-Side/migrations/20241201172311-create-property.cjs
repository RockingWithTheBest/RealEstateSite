'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      number_of_rooms: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      price: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      agent_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      client_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      coordinates_id:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Properties');
  }
};