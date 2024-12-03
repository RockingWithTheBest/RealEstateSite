'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(
      "ALTER TABLE \"Clients\" ADD CONSTRAINT passport_PN CHECK(passport_number LIKE \'ZN%\')"
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraints('Clients','passport_PN' );
  }
};
