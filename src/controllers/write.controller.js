// @ts-nocheck
import { textCompletionGeneration } from '../services/openai.service'
import to from '../utils/to'
import handleResponse from '../utils/handle-response'

/**
 * Builds chat with user
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
export const create = async (req, res, next) => {
  const { question } = req.body
  const currentUser = req.currentUser
  const [error, result] = await to(
    textCompletionGeneration(question, currentUser)
  )
  return handleResponse(error, result, req, res)
}
