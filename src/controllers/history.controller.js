import { getHistories, getHistory } from '../services/history.service'
import handleResponse from '../utils/handle-response'
import to from '../utils/to'

/**
 * Builds all histories
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
export const findAll = async (req, res, next) => {
  const query = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 5
  }
  const [error, result] = await to(
    getHistories(query, req.currentUser.id)
  )
  return handleResponse(error, result, req, res)
}

/**
 * Builds histories
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
export const findOne = async (req, res, next) => {
  const [error, result] = await to(
    getHistory(req.params.id, req.currentUser.id)
  )
  return handleResponse(error, result, req, res)
}
