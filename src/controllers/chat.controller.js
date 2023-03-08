// @ts-nocheck
import {
  ACCEPT_ERROR_STATUS,
  BAD_REQUEST_CODE
} from '../constants/responseCode'
import { chatCompletionGeneration } from '../services/openai.service'
import { handleMessageResponse } from '../utils/handle-response'

/**
 * Builds chat with user
 * @param {any} request
 * @param {any} response
 * @param {any} next
 */
export const create = async (request, response, next) => {
  const { question } = request.body
  const currentUser = request.currentUser
  try {
    const arrayBuffer = await chatCompletionGeneration(question, currentUser)
    const contentType = arrayBuffer.headers['content-type']
    response.setHeader('content-type', contentType)
    arrayBuffer.data.pipe(response)
    // Làm sao tính tiền
  } catch (error) {
    console.log(error)
    return handleMessageResponse(
      error,
      request,
      response,
      ACCEPT_ERROR_STATUS.includes(error.code) ? error.code : BAD_REQUEST_CODE
    )
  }
}
