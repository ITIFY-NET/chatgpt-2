'use strict'
import { DataTypes } from 'sequelize'
import { db } from '../db'

const Notification = db.sequelize().define(
  'Notifications',
  {
    accountId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Account',
        key: 'id'
      }
    },
    title: DataTypes.STRING,
    detail: DataTypes.STRING,
    url: DataTypes.STRING,
    createdAt: DataTypes.BIGINT,
    updatedAt: DataTypes.BIGINT
  },
  {
    timestamps: false
  }
)

export default Notification
