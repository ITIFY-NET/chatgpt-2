const express = require('express')
const router = express.Router()
import middleware from '../middlewares/common.middleware'
const writeController = require('../controllers/write.controller.js')

router.post('/', middleware.tokenExtractor, writeController.create)

export { router }
