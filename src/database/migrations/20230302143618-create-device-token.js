'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Device_Tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accountId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Accounts',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      deviceType: {
        type: Sequelize.STRING
      },
      deviceToken: {
        type: Sequelize.STRING
      },
      deviceId: {
        type: Sequelize.STRING
      },
      deviceName: {
        type: Sequelize.STRING
      },
      appVersion: {
        type: Sequelize.STRING
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Device_Tokens')
  }
}
