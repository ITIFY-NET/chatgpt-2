const express = require('express')
const router = express.Router()
import middleware from '../middlewares/common.middleware'
const historyController = require('../controllers/history.controller.js')

router.get('/', middleware.tokenExtractor, historyController.findAll)
router.get('/:id', middleware.tokenExtractor, historyController.findOne)

export { router }
