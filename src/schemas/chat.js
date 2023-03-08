const Joi = require('joi')

const schemas = {
  chat: Joi.object({
    question: Joi.string().max(512).required()
  }),
  write: Joi.object({
    question: Joi.string().max(2048).required(),
    contextId: Joi.number().required()
  })
}

module.exports = schemas
