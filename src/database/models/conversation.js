// @ts-nocheck
'use strict'
import { DataTypes } from 'sequelize'
import { db } from '../db'

const Conversations = db.sequelize().define(
  'Conversations',
  {
    type: DataTypes.ENUM('write', 'chat'),
    accountId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'accounts',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    firstQuestion: DataTypes.STRING,
    validFlag: DataTypes.INTEGER,
    createdAt: DataTypes.BIGINT,
    updatedAt: DataTypes.BIGINT
  },
  {
    timestamps: false
  }
)

export default Conversations
