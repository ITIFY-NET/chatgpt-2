import axios from 'axios'
import { MasterToken } from '../database/models'
import { sendMessageSimple } from '../services/telegram.service'

const OPEN_AI_API_ENDPOINT = 'https://api.openai.com/v1/completions'
const STRING_TOKEN_RATE = 0.75
const SAFETY_FACTOR = 100

const chatCompletionGeneration = async (question, currentUser) => {
  let arrayBuffer = null
  try {
    const masterToken = await MasterToken.findOne({
      where: {
        validFlag: 1
      }
    })
    const model = currentUser.profile.setting.modelName
    const maxRequest = currentUser.profile.setting.maxRequestToken
    const maxToken = Math.floor(maxRequest - question.length * STRING_TOKEN_RATE - SAFETY_FACTOR)
    const arrayBuffer = await axios.post(OPEN_AI_API_ENDPOINT,
      {
        "model": model,
        "max_tokens": maxToken,
        "prompt": question,
        "temperature": 0.3,
        "top_p": 0.7,
        "n": 1,
        "stream": true
      },
      {
        headers: {
          'Authorization': `Bearer ${masterToken.token}`,
          'content-type': 'application/json'
        },
        responseType: "stream"
      })
    return arrayBuffer
  } catch (error) {
    console.log(error.response)
    // handleExceededQuota(error.response.data.error)
    //   const msgToTelegram = `Error notification:
    // App            : [${process.env.ENV}] ${process.env.APP_NAME}
    // Type           : OpenAI service
    // Error          : ${JSON.stringify(error.response.data.error)}
    // `
    //   sendMessageSimple(msgToTelegram)
    //   originResult = error.response.data.error
    //   // originRequest = params
    //   responseStatus = error.response.status
  }
  return arrayBuffer
}

const textCompletionGeneration = async (question, modelTraining, token, options = {}) => {
  let originResult = null
  let originRequest = null
  let responseStatus = 200
  const params = generateParams(question, modelTraining, options)
  try {
    const { data } = await axios.post(OPEN_AI_API_ENDPOINT,
      params,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'content-type': 'application/json'
        }
      })
    originResult = data
    originRequest = params
  } catch (error) {
    handleExceededQuota(error.response.data.error)
    const msgToTelegram = `Error notification:
  App            : [${process.env.ENV}] ${process.env.APP_NAME}
  Type           : OpenAI service
  Error          : ${JSON.stringify(error.response.data.error)}
  `
    sendMessageSimple(msgToTelegram)
    originResult = error.response.data.error
    originRequest = params
    responseStatus = error.response.status
  }
  return { originResult: originResult, originRequest: originRequest, responseStatus: responseStatus }
}

const handleExceededQuota = (error, token) => {
  if (error.type === 'insufficient_quota') {
    MasterToken.update({
      validFlag: 0,
      updatedAt: Math.floor(new Date().getTime() / 1000)
    }, { returning: true, where: { token: token, validFlag: 1 } })
  }
}

const generateParams = (question, model, options) => {
  const contentLength = options.contentLength
  const params = JSON.parse(model.metaData)
  let maxTokens = params.max_tokens
  // A helpful rule of thumb is that one token generally corresponds to ~4 characters of text for common English text.
  // This translates to roughly ¾ of a word (so 100 tokens ~= 75 words).
  if (contentLength) {
    maxTokens = Math.floor(contentLength * 0.75)
  }
  params["model"] = model.modelName
  params["max_tokens"] = maxTokens
  const prompt = contentLength ? params["prompt"].replace('<length>', contentLength) : params["prompt"]
  params["prompt"] = `${prompt} ${question}`
  return params
}

const parseResultFromOpenAI = (data) => {
  const { choices } = data
  if (choices && choices[0]) {
    return choices[0].text
  }
  return ''
}

module.exports = {
  textCompletionGeneration,
  chatCompletionGeneration,
  parseResultFromOpenAI
}
