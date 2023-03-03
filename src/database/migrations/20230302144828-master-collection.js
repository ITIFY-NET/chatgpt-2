'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Master_Collections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      modelName: {
        type: Sequelize.STRING
      },
      metaData: {
        type: Sequelize.JSON
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
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Master_Collections')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
}
