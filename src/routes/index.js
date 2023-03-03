// @ts-nocheck
const express = require('express')
const router = express.Router()
import { login } from '../controllers/auth.controller'

router.post('/login', login)

module.exports = router
