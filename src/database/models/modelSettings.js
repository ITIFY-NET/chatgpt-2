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
    usage: DataTypes.STRING,
    maxRequestToken: DataTypes.INTEGER,
    requestCredit: DataTypes.BIGINT,
    validFlag: DataTypes.INTEGER,
    createdAt: DataTypes.BIGINT,
    updatedAt: DataTypes.BIGINT
  },
  {
    timestamps: false
  }
)

export default ModelSetting
