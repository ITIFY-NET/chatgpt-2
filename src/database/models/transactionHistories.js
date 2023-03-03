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
    ammount: DataTypes.DECIMAL,
    credit: DataTypes.DECIMAL,
    createdAt: DataTypes.DATE
  },
  {
    timestamps: false
  }
)

export default TransactionHistory
