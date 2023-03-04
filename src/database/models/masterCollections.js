'use strict'
import { DataTypes } from 'sequelize'
import { db } from '../db'

const MasterCollection = db.sequelize().define(
  'Master_Collections',
  {
    category: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    modelName: DataTypes.STRING,
    metaData: DataTypes.JSON,
    validFlag: DataTypes.INTEGER,
    createdAt: DataTypes.BIGINT,
    updatedAt: DataTypes.BIGINT
  },
  {
    timestamps: false
  }
)

export default MasterCollection
