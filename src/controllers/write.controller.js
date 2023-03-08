// @ts-nocheck
import { textCompletionGeneration } from '../services/openai.service'
import to from '../utils/to'
import handleResponse from '../utils/handle-response'
import { getModelSetting, getMasterCollection } from '../services/master'
/**
 * Builds chat with user
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
export const create = async (req, res, next) => {
  const { question, contextId } = req.body
  const currentUser = req.currentUser
  const arrayBuffer = await textCompletionGeneration(question, currentUser)
  const contentType = arrayBuffer.headers['content-type']
  res.setHeader('content-type', contentType)
  arrayBuffer.data.pipe(res)
}

export const getModels = async (req, res, next) => {
  const [error, result] = await to(getModelSetting())
  return handleResponse(error, result, req, res)
}

export const getCollection = async (req, res, next) => {
  const [error, result] = await to(getMasterCollection())
  return handleResponse(error, result, req, res)
}

export const getModels = async (req, res, next) => {
  const [error, result] = await to(getModelSetting())
  return handleResponse(error, result, req, res)
}

export const getCollection = async (req, res, next) => {
  const [error, result] = await to(getMasterCollection())
  return handleResponse(error, result, req, res)
}

export const getModels = async (req, res, next) => {
  const [error, result] = await to(getModelSetting())
  return handleResponse(error, result, req, res)
}

export const getCollection = async (req, res, next) => {
  const [error, result] = await to(getMasterCollection())
  return handleResponse(error, result, req, res)
}
