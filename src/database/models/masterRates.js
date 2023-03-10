'use strict'
import { DataTypes } from 'sequelize'
import { db } from '../db'

const MasterRate = db.sequelize().define(
  'Master_Rates',
  {
    type: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    credits: DataTypes.BIGINT,
    validFlag: DataTypes.INTEGER,
    createdAt: DataTypes.BIGINT,
    updatedAt: DataTypes.BIGINT
  },
  {
    timestamps: false
  }
)

export default MasterRate
