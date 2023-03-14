// @ts-nocheck
'use strict'
import { DataTypes } from 'sequelize'
import { db } from '../db'

const Messages = db.sequelize().define(
  'Messages',
  {
    conversationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Conversations',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    role: DataTypes.STRING,
    content: DataTypes.TEXT,
    validFlag: DataTypes.INTEGER,
    createdAt: DataTypes.BIGINT,
    updatedAt: DataTypes.BIGINT
  },
  {
    timestamps: false
  }
)

export default Messages
