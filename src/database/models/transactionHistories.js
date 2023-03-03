'use strict'
import { DataTypes } from 'sequelize'
import { db } from '../db'

const TransactionHistory = db.sequelize().define(
  'Transaction_Histories',
  {
    transactionId: DataTypes.STRING,
    accountId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Account',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    amount: DataTypes.DECIMAL,
    createdAt: DataTypes.BIGINT,
    updatedAt: DataTypes.BIGINT
  },
  {
    timestamps: false
  }
)

export default TransactionHistory
