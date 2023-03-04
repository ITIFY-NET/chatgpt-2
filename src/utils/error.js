/* eslint-disable prefer-destructuring */
import { ISE_CODE } from 'src/constants/responseCode'

function parseError(error) {
  if (!error) {
    return error
  }
  let message = ''
  let code = ISE_CODE
  let err = ''
  if (error.errors) {
    const keys = Object.keys(error.errors)
    message = error.errors[keys[0]]
      ? error.errors[keys[0]].message
      : {
          code: ISE_CODE,
          message: 'Internal Server Error'
        }
  } else {
    err = error.message
    message = error.message
    code = error.code ? error.code : ISE_CODE
  }

  return {
    success: false,
    message,
    code,
    err
  }
}
export default {
  parseError
}
