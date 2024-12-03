'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.sequelize.query(
      "ALTER TABLE \"Agents\" ADD CONSTRAINT check_alphabet CHECK(full_name ~ '\[^A-Za-z ]+$'\)"
    )


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraints('Agents','check_alphabet')
  }
};
