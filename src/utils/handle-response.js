import {
  BAD_REQUEST_CODE,
  ACCEPT_ERROR_STATUS,
  ISE_CODE,
  SUCCESS_CODE
} from '../constants/responseCode'

import errorUtil from './error'
import responseBuilder from './response-builder'

export const handleMessageResponse = (
  error,
  req,
  res,
  status = BAD_REQUEST_CODE,
  success = false,
  data
) => {
  return !error
    ? res.status(status).jsonp(
        responseBuilder.build(success, data, {
          code: status,
          message: 'success'
        })
      )
    : res.status(status).jsonp(
        responseBuilder.build(success, data, {
          ...error,
          success,
          code: status
        })
      )
}

const handleResponse = (error, result, req, res) => {
  if (error) {
    error = errorUtil.parseError(error)
    if (error.code) {
      return handleMessageResponse(
        error,
        req,
        res,
        ACCEPT_ERROR_STATUS.includes(error.code) ? error.code : BAD_REQUEST_CODE
      )
    }
    return handleMessageResponse(error, req, res, ISE_CODE)
  }
  handleMessageResponse(null, req, res, SUCCESS_CODE, true, result)
}

export default handleResponse
