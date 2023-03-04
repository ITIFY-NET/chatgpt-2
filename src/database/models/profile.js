'use strict'
import { DataTypes } from 'sequelize'
import { db } from '../db'
const Profile = db.sequelize().define(
  'Profile',
  {
    accountId: DataTypes.INTEGER,
    modelSettingId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ModelSetting',
        key: 'id'
      }
    },
    avatar: DataTypes.STRING,
    bio: DataTypes.TEXT,
    validFlag: DataTypes.INTEGER,
    createdAt: DataTypes.BIGINT,
    updatedAt: DataTypes.BIGINT
  },
  {
    timestamps: false
  }
)

export default Profile
