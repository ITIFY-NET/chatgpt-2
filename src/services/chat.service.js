import Conversations from '../database/models/conversation'
import Messages from '../database/models/message'

export const createConverstation = async (data) => {
  return Conversations.create(data)
}

export const createMessage = async (data) => {
  return Messages.create(data)
}
