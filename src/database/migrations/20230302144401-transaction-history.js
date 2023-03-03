'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transaction_History', {
      transactionId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
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
      amount: {
        type: Sequelize.DECIMAL
      },
      validFlag: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
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
    await queryInterface.dropTable('Transaction_History')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
}
