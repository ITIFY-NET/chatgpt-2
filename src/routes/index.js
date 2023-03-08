/* eslint-disable no-undef */
// @ts-nocheck
const express = require('express')
const router = express.Router()
import { router as chatRouter } from './chat.router'
import { router as writeRouter } from './write.router'
import { login } from '../controllers/auth.controller'

router.post('/login', login)
router.use('/chat', chatRouter)
router.use('/write', writeRouter)

module.exports = router
