import { updateSettingModelUser, getModelSetting } from '../services/user'
import handleResponse from '../utils/handle-response'
import to from '../utils/to'

/**
 * Builds chat with user
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
export const setting = async (req, res, next) => {
  const { modelSettingId } = req.body
  const [error, result] = await to(
    updateSettingModelUser({ modelSettingId, accountId: req.currentUser.id })
  )
  return handleResponse(error, result, req, res)
}

export const getModels = async (req, res, next) => {
  const [error, result] = await to(getModelSetting())
  return handleResponse(error, result, req, res)
}
