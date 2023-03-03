const express = require('express')
const bodyParser = require('body-parser')
const { db } = require('./src/database/db')
const router = require('./src/routes/index')
const admin = require('firebase-admin')
const { serviceAccount } = require('./src/configs/system')
const app = express()

db.connect().then()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use('/api', router)

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  console.error(err.message, err.stack)
  res.status(statusCode).json({ message: err.message })

  return
})

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

module.exports = app
