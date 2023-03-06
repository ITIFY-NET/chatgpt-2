const Joi = require('joi')

const schemas = {
  chat: Joi.object({
    question: Joi.string().max(512).required()
  })
}

module.exports = schemas
