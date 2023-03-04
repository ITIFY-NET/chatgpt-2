'use strict'
import { DataTypes } from 'sequelize'
import { db } from '../db'

const DeviceToken = db.sequelize().define(
  'Device_Token',
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
    deviceType: DataTypes.STRING,
    deviceToken: DataTypes.STRING,
    deviceId: DataTypes.STRING,
    deviceName: DataTypes.STRING,
    appVersion: DataTypes.STRING
  },
  {
    timestamps: false
  }
)

export default DeviceToken
