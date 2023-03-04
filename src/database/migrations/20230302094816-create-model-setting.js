'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Model_Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      modelName: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      subTitle: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      usage: {
        type: Sequelize.STRING
      },
      maxRequestToken: {
        type: Sequelize.INTEGER
      },
      validFlag: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        type: Sequelize.BIGINT,
        defaultValue: Math.floor(Date.now() / 1000)
      },
      updatedAt: {
        type: Sequelize.BIGINT,
        defaultValue: Math.floor(Date.now() / 1000)
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Model_Settings')
    /**
     * Add reverting commands here.
     *
     * Example:
    //  * await queryInterface.dropTable('users');
     */
  }
}
