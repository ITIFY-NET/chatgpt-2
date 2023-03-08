const express = require('express')
const router = express.Router()
import middleware from '../middlewares/common.middleware'
const userController = require('../controllers/user.controller.js')

router.patch('/setting', middleware.tokenExtractor, userController.setting)

export { router }
