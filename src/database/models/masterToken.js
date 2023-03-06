'use strict'
import { DataTypes } from 'sequelize'
import { db } from '../db'

const MasterToken = db.sequelize().define(
  'Master_Tokens',
  {
    name: DataTypes.STRING,
    token: DataTypes.STRING,
    type: DataTypes.STRING,
    validFlag: DataTypes.INTEGER,
    createdAt: DataTypes.BIGINT,
    updatedAt: DataTypes.BIGINT
  },
  {
    timestamps: false
  }
)

export default MasterToken
