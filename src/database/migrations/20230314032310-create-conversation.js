'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Conversations', {
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.ENUM,
        values: ['write', 'chat'],
        defaultValue: 'write'
      },
      firstQuestion: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Conversations')
  }
}
