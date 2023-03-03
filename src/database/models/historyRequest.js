'use strict'
import { DataTypes } from 'sequelize'
import { db } from '../db'

const HistoryRequest = db.sequelize().define(
  'History_Request',
  {
    accountId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'accounts',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    type: DataTypes.STRING,
    question: DataTypes.TEXT,
    status: DataTypes.STRING,
    result: DataTypes.TEXT,
    validFlag: DataTypes.INTEGER,
    createdAt: DataTypes.BIGINT,
    updatedAt: DataTypes.BIGINT
  },
  {
    timestamps: false
  }
)

export default HistoryRequest
