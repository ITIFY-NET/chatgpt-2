'use strict'
import { DataTypes } from 'sequelize'
import { db } from '../db'

const ModelSetting = db.sequelize().define(
  'Model_Settings',
  {
    modelName: DataTypes.STRING,
    title: DataTypes.STRING,
    subTitle: DataTypes.STRING,
    description: DataTypes.STRING,
    maxRequestToken: DataTypes.INTEGER,
    validFlag: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    timestamps: false
  }
)

export default ModelSetting
