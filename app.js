/* eslint-disable no-undef */
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const bodyParser = require('body-parser')
const { db } = require('./src/database/db')
const router = require('./src/routes/index')
const admin = require('firebase-admin')
const { serviceAccount } = require('./src/configs/system')
const app = express()

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

const originalSend = app.response.send
app.response.send = function sendOverWrite(body) {
  originalSend.call(this, body)
  this.__custombody__ = body
}

morgan.token('timed', function (tokens, req, res) {
  return [
    new Date().toISOString(),
    tokens['remote-addr'](req),
    req.method,
    req.url,
    res.statusCode,
    tokens['response-time'](req, res), 'ms',
    "\r\n    Body:",
    req.headers['authorization'],
    JSON.stringify(req.body),
    "\r\n    Response",
    res.__custombody__,
  ].join(' ')
})

db.connect().then()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(morgan('timed', { stream: accessLogStream }))

app.use('/api', router)

/* Error handler middleware */
app.use((err, _req, res, next) => {
  const statusCode = err.statusCode || 500
  console.error(err.message, err.stack)
  res.status(statusCode).json({ message: err.message })

  return
})

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

module.exports = app
