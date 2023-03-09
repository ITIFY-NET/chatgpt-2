// @ts-nocheck
import { textCompletionGeneration } from '../services/openai.service'
import to from '../utils/to'
import handleResponse from '../utils/handle-response'
import { getModelSetting, getMasterCollection } from '../services/master'
import { NOT_FOUND_CODE, SUCCESS_CODE } from '../constants/responseCode'
/**
 * Builds chat with user
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
export const create = async (req, res, next) => {
  try {
    const { question, contextId } = req.body
    const currentUser = req.currentUser
    const arrayBuffer = await textCompletionGeneration(question, contextId, currentUser)
    if (!arrayBuffer.status) {
      return handleResponse({ message: arrayBuffer.response.statusText, code: arrayBuffer.response.status }, null, req, res)
    }
    const contentType = arrayBuffer.headers['content-type']
    res.setHeader('content-type', contentType)
    // arrayBuffer.data.pipe(res)
    let finalResult = ''
    arrayBuffer.data.on('data', (data) => {
      const streamData = data.toString('utf-8').replace('data: ', '')
      if (streamData === `[DONE]\n\n` || streamData === `[DONE]`) {
        const dataResponse = `data: ${JSON.stringify({ result: null, status: 'DONE' })}`
        res.write(dataResponse)
        res.end()
      } else {
        const objectJson = JSON.parse(streamData)
        finalResult += objectJson.choices[0].text
        const dataResponse = `data: ${JSON.stringify({ result: objectJson.choices[0].text, status: null })}\n\n`
        res.write(dataResponse)
      }
    })
    arrayBuffer.data.on('end', () => {
      if (!res.finished) {
        const dataResponse = `data: ${JSON.stringify({ result: null, status: 'DONE' })}`
        res.write(dataResponse)
        res.end()
      }
      // TODO: save history
      console.log('All the result: ', finalResult)
    })
  } catch (error) {
    return handleResponse({ message: 'NOT FOUND SERVICE', code: NOT_FOUND_CODE }, null, req, res)
  }
}

export const getModels = async (req, res, next) => {
  const [error, result] = await to(getModelSetting())
  return handleResponse(error, result, req, res)
}

export const getCollection = async (req, res, next) => {
  const [error, result] = await to(getMasterCollection())
  return handleResponse(error, result, req, res)
}
