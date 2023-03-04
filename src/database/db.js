// @ts-nocheck
'user strict'
const { Sequelize } = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('./config/db.config')[env]

class Database {
  constructor() {
    this._sequelize = new Sequelize(config)
  }

  async connect() {
    try {
      await this._sequelize.authenticate()
      console.log('Connection has been established successfully.')
    } catch (err) {
      console.error('Unable to connect to the database:', err)
    }
  }

  sequelize() {
    return this._sequelize
  }
}

const db = new Database()
export { db }
