const express = require('express')
const router = express.Router()
import middleware from '../middlewares/common.middleware'
const userController = require('../controllers/user.controller.js')

router.get('/setting', middleware.tokenExtractor, userController.getModels)
router.patch('/setting', middleware.tokenExtractor, userController.setting)

export { router }
