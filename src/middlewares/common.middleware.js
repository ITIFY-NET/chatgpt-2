const jwt = require('jsonwebtoken')
const config = require('../configs/general.config')
import { Account, Profile, Balance, ModelSetting } from '../database/models'
import handleResponse from '../utils/handle-response'
const BEARER_LENGTH = 7

const {
  UNPROCESSABLE_CODE,
  BAD_REQUEST_CODE,
  UNAUTHORIZED_CODE,
  NOT_FOUND_CODE,
  ISE_CODE
} = require('../constants/responseCode')

const requestLogger = (request, _response, next) => {
  try {
    console.log('----')
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Query: ', request.query)
    console.log('Body: ', request.body)
    console.log('Query: ', JSON.stringify(request.headers))
    console.log('----')
    next()
  } catch (error) {
    console.log(error)
  }
}

const responseLogger = (request, response, next) => {
  console.log('----')
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  // console.log('Body: ', request.body)
  console.log('Response: ', response.statusMessage)
  console.log('----')
  next()
}

const inputValidator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property])
    console.log(error)
    const valid = error == null
    if (valid) {
      next()
    } else {
      const { details } = error
      console.log({
        details
      })
      const message = details.map((i) => i.message).join(',')
      console.log({
        message
      })
      error.code = 400
      error.message = message
      return handleResponse(error, null, req, res)
    }
  }
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({
      status: UNAUTHORIZED_CODE,
      success: false,
      message: 'invalid_token'
    })
  }
  try {
    const decodedToken = jwt.verify(
      authorization.substring(BEARER_LENGTH),
      config.SECRET
    )

    const currentUser = await Account.findOne({
      where: {
        // @ts-ignore
        id: decodedToken.data.accountInfo.id,
        validFlag: 1
      },
      include: [
        {
          model: Profile,
          as: 'profile',
          attributes: ['modelSettingId'],
          include: [
            {
              model: ModelSetting,
              as: 'setting',
              attributes: ['modelName', 'maxRequestToken']
            }
          ]
        },
        {
          model: Balance,
          as: 'balance',
          attributes: ['credits']
        }
      ]
    })
    if (!currentUser) {
      return res.status(401).json({
        status: UNAUTHORIZED_CODE,
        success: false,
        message: 'invalid_token'
      })
    }
    req.currentUser = currentUser
    next()
  } catch (error) {
    next(error)
  }
}

const unknownEndpoint = (_req, res) => {
  res.status(404).json({
    status: NOT_FOUND_CODE,
    success: false,
    message: 'unknown_endpoint'
  })
}

const errorHandler = (error, _req, res, next) => {
  if (error.name === 'ValidationError') {
    return res
      .status(UNPROCESSABLE_CODE)
      .json({ success: false, message: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(UNAUTHORIZED_CODE).json({
      status: UNAUTHORIZED_CODE,
      success: false,
      message: 'invalid_token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(UNAUTHORIZED_CODE).json({
      status: UNAUTHORIZED_CODE,
      success: false,
      message: 'token_expired'
    })
  } else if (error.name === 'TypeError') {
    return res
      .status(NOT_FOUND_CODE)
      .json({ status: NOT_FOUND_CODE, success: false, message: 'not_found' })
  } else if (error.name === 'SyntaxError') {
    return res.status(BAD_REQUEST_CODE).json({
      status: BAD_REQUEST_CODE,
      success: false,
      message: 'bad_request'
    })
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    return res
      .status(ISE_CODE)
      .json({ status: ISE_CODE, success: false, message: 'ISE' })
  } else if (error.name === 'SequelizeDatabaseError') {
    return res
      .status(ISE_CODE)
      .json({ status: ISE_CODE, success: false, message: 'ISE' })
  } else if (error.name === 'Error') {
    return res
      .status(BAD_REQUEST_CODE)
      .json({ status: BAD_REQUEST_CODE, success: false, message: 'ISE' })
  }
  next(error)
}

const tokenExtractorV1 = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    next()
    return
  }
  try {
    const decodedToken = jwt.verify(
      authorization.substring(BEARER_LENGTH),
      config.SECRET
    )

    const currentUser = await models.Account.findOne({
      where: {
        // @ts-ignore
        id: decodedToken.data.accountInfo.id,
        validFlag: 1
      }
    })

    if (!currentUser) {
      return res.status(401).json({
        status: UNAUTHORIZED_CODE,
        success: false,
        message: 'invalid_token'
      })
    }
    req.currentUser = currentUser
    next()
  } catch (error) {
    next(error)
  }
}

export default {
  requestLogger,
  tokenExtractor,
  responseLogger,
  errorHandler,
  unknownEndpoint,
  inputValidator,
  tokenExtractorV1
}
