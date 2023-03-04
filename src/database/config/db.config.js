require('dotenv').config()
const env = process.env
const fs = require('fs')
module.exports = {
  development: {
    dialect: 'mysql',
    url: env.DB_URL,
    host: env.DB_HOST,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: env.DB_PORT || 3306,
    // ssl: {
    // mode: 'VERIFY_IDENTITY',
    // ca: fs.readFileSync('/etc/ssl/cert.pem', 'utf-8')
    // }
  }
}
