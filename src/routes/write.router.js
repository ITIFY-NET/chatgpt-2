const express = require('express')
const router = express.Router()
import { chatSchemas } from '../schemas'
import middleware from '../middlewares/common.middleware'
const writeController = require('../controllers/write.controller.js')

router.post(
  '/',
  middleware.tokenExtractor,
  middleware.inputValidator(chatSchemas.write, 'body'),
  writeController.create
)

export { router }
