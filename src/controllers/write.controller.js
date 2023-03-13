// @ts-nocheck
import { NOT_FOUND_CODE } from '../constants/responseCode'
import { getMasterCollection, getModelSetting } from '../services/master'
import { textCompletionGeneration } from '../services/openai.service'
import handleResponse from '../utils/handle-response'
import { groupCollection } from '../utils/helper.util'
import to from '../utils/to'
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
        let dataResponse = ''
        try {
          const objectJson = JSON.parse(streamData)
          finalResult += objectJson.choices[0].text
          dataResponse = `data: ${JSON.stringify({ result: objectJson.choices[0].text, status: null })}\n\n`
        } catch (error) {
          console.log(error)
          dataResponse = `data: ${JSON.stringify({ result: '', status: null })}\n\n`
        }
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
  const modelSettingUser = req.currentUser.profile.modelSettingId
  const [error, result] = await to(getModelSetting())
  const data = result.map((r) => ({
    ...r.dataValues,
    isSetting: r.dataValues.id === modelSettingUser
  }))
  return handleResponse(error, data, req, res)
}

export const getCollection = async (req, res, next) => {
  const [error, result] = await to(getMasterCollection())
  const data = groupCollection(result, 'category')

  return handleResponse(error, data, req, res)
}
