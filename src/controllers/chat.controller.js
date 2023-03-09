// @ts-nocheck
import { NOT_FOUND_CODE } from '../constants/responseCode'
import { chatCompletionGeneration } from '../services/openai.service'
import handleResponse from '../utils/handle-response'

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
    if (!arrayBuffer.status) {
      return handleResponse({ message: arrayBuffer.response.statusText, code: arrayBuffer.response.status }, null, request, response)
    }
    const contentType = arrayBuffer.headers['content-type']
    response.setHeader('content-type', contentType)
    let finalResult = ''
    // arrayBuffer.data.pipe(response)
    arrayBuffer.data.on('data', (data) => {
      const objectStream = data.toString('utf-8').replace('data: ', '')
      if (objectStream === `[DONE]\n\n` || objectStream === `[DONE]`) {
        const dataResponse = `data: ${JSON.stringify({ result: null, status: 'DONE' })}`
        response.write(dataResponse)
        response.end()
      } else {
        const objectJson = JSON.parse(objectStream)
        finalResult += objectJson.choices[0].text
        const dataResponse = `data: ${JSON.stringify({ result: objectJson.choices[0].text, status: null })}\n\n`
        response.write(dataResponse)
      }
    })
    arrayBuffer.data.on('end', () => {
      if (!response.finished) {
        const dataResponse = `data: ${JSON.stringify({ result: null, status: 'DONE' })}`
        response.write(dataResponse)
        response.end()
      }
      // TODO: save history
      console.log('All the result: ', finalResult)
    })
  } catch (error) {
    return handleResponse({ message: 'Service not found', code: NOT_FOUND_CODE }, null, request, response)
  }
}
