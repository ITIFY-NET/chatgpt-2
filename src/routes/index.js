// @ts-nocheck
const express = require('express')
const router = express.Router()
import { login } from '../controllers/auth.controller'


router.get('/test', login)



module.exports = router 