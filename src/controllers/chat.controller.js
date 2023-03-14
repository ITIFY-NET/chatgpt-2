// @ts-nocheck
import { NOT_FOUND_CODE } from '../constants/responseCode'
import { chatCompletionGeneration } from '../services/openai.service'
import handleResponse from '../utils/handle-response'
import { createConverstation, createMessage } from '../services/chat.service'
import { ROLE_CONVERSATION, TYPE_COMPLETIONS } from '../constants/system'

/**
 * Builds chat with user
 * @param {any} request
 * @param {any} response
 * @param {any} next
 */
export const create = async (request, response, next) => {
  const { question, conversationId } = request.body
  const currentUser = request.currentUser
  const accountId = request.currentUser.id
  try {
    const arrayBuffer = await chatCompletionGeneration(question, currentUser)
    if (!arrayBuffer.status) {
      return handleResponse({ message: arrayBuffer.response.statusText, code: arrayBuffer.response.status }, null, request, response)
    }
    const contentType = arrayBuffer.headers['content-type']
    response.setHeader('content-type', contentType)
    let finalResult = ''
    // arrayBuffer.data.pipe(response)
    let conversation = null
    if (!conversationId) {
      conversation = await createConverstation({
        type: TYPE_COMPLETIONS.write,
        accountId,
        firstQuestion: question
      })
    }
    arrayBuffer.data.on('data', async (data) => {
      const objectStream = data.toString('utf-8').replace('data: ', '')
      if (objectStream === `[DONE]\n\n` || objectStream === `[DONE]`) {
        const dataResponse = `data: ${JSON.stringify({
          result: null,
          status: 'DONE',
          conversationId: conversationId || conversation?.id
        })}`
        response.write(dataResponse)
        response.end()
      } else {
        const objectJson = JSON.parse(objectStream)
        finalResult += objectJson.choices[0].text
        const dataResponse = `data: ${JSON.stringify({ result: objectJson.choices[0].text, status: null })}\n\n`
        response.write(dataResponse)
      }
    })
    arrayBuffer.data.on('end', async () => {
      if (!response.finished) {
        const dataResponse = `data: ${JSON.stringify({ result: null, status: 'DONE' })}`
        response.write(dataResponse)
        response.end()
      }
      console.log('All the result: ', finalResult)
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
    return handleResponse({ message: 'Service not found', code: NOT_FOUND_CODE }, null, request, response)
  }
}
