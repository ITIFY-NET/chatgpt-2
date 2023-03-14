// @ts-nocheck
import { textCompletionGeneration } from '../services/openai.service'
import to from '../utils/to'
import handleResponse from '../utils/handle-response'
import { groupByKey } from '../utils/helper.util'
import { getModelSetting, getMasterCollection } from '../services/master'
import { NOT_FOUND_CODE } from '../constants/responseCode'
import { createConversation, createMessage } from '../services/chat.service'
import { ROLE_CONVERSATION, TYPE_COMPLETIONS } from '../constants/system'
/**
 * Builds chat with user
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
export const create = async (req, res, next) => {
  try {
    const { question, contextId, conversationId } = req.body
    const currentUser = req.currentUser
    const arrayBuffer = await textCompletionGeneration(question, contextId, currentUser)
    if (!arrayBuffer.status) {
      return handleResponse({ message: arrayBuffer.response.statusText, code: arrayBuffer.response.status }, null, req, res)
    }
    const contentType = arrayBuffer.headers['content-type']
    res.setHeader('content-type', contentType)
    // arrayBuffer.data.pipe(res)
    let finalResult = ''
    let conversation = null
    if (!conversationId) {
      conversation = await createConversation({
        type: TYPE_COMPLETIONS.write,
        accountId: currentUser.id,
        firstQuestion: question
      })
    }
    arrayBuffer.data.on('data', async (data) => {
      const streamData = data.toString('utf-8').replace('data: ', '')
      if (streamData === `[DONE]\n\n` || streamData === `[DONE]`) {
        const dataResponse = `data: ${JSON.stringify({
          result: null, status: 'DONE',
          conversationId: conversationId || conversation?.id
        })}`
        res.write(dataResponse)
        res.end()
      } else {
        const objectJson = JSON.parse(streamData)
        finalResult += objectJson.choices[0].text
        const dataResponse = `data: ${JSON.stringify({ result: objectJson.choices[0].text, status: null })}\n\n`
        res.write(dataResponse)
      }
    })
    arrayBuffer.data.on('end', async () => {
      if (!res.finished) {
        const dataResponse = `data: ${JSON.stringify({ result: null, status: 'DONE' })}`
        res.write(dataResponse)
        res.end()
      }
      // TODO: save history
      console.log('All the result for write: ', finalResult)
      await createMessage({
        role: ROLE_CONVERSATION.user,
        conversationId: conversationId || conversation?.id,
        content: question
      })
      await createMessage({
        role: ROLE_CONVERSATION.assistant,
        conversationId: conversationId || conversation?.id,
        content: finalResult
      })
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
  const data = groupByKey(result, 'category')
  return handleResponse(error, data, req, res)
}
