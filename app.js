const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const programmingLanguagesRouter = require('./src/routes/programmingLanguages.route')
const { db } = require('./src/database/db')
const router = require('./src/routes/index')
db.connect().then()

const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use('/api', router)
app.get('/', (req, res) => {
  res.json({ message: 'ok' })
})

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  console.error(err.message, err.stack)
  res.status(statusCode).json({ message: err.message })

  return
})

module.exports = app
