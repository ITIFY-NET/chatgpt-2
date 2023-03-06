/* eslint-disable no-undef */
// @ts-nocheck
const express = require('express')
const router = express.Router()
import { router as chatRouter } from './chat.router'
import { login } from '../controllers/auth.controller'

router.post('/login', login)
router.use('/chat', chatRouter)

module.exports = router
