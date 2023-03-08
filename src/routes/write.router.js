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

router.get('/setting', middleware.tokenExtractor, writeController.getModels)
router.get(
  '/collections',
  middleware.tokenExtractor,
  writeController.getCollection
)

export { router }
