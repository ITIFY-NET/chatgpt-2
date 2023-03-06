const express = require('express');
const router = express.Router();
import middleware from '../middlewares/common.middleware';
const chatController = require('../controllers/chat.controller');
const { chatSchemas } = require('../schemas')

router.post('/',
  middleware.tokenExtractor,
  middleware.inputValidator(chatSchemas.chat, 'body'),
  chatController.create
);

export { router }
