'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const masterTokens = [
      {
        "name": "test",
        "token": "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",
        "type": "production",
        "validFlag": 1,
        "createdAt": 1677679481,
        "updatedAt": 1677679481
      }
    ]
    await queryInterface.bulkInsert(
      'Master_Tokens',
      masterTokens
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Master_Tokens', null, {})
  }
}
