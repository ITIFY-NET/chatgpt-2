import { Conversations, Messages } from '../database/models'

const getHistories = async (query, accountId) => {
  const [count, histories] = await Promise.all([
    Conversations.count({
      where: {
        validFlag: true,
        accountId
      }
    }),

    Conversations.findAll({
      where: {
        validFlag: true,
        accountId
      },
      offset: query.page * query.limit,
      limit: query.limit,
      order: [
        ['id', 'DESC'],
      ]
    })
  ])
  return {
    count,
    rows: histories
  }
}

const getHistory = async (id, accountId) => {
  return await Conversations.findOne({
    where: {
      id,
      validFlag: 1,
      accountId
    },
    include: [
      {
        model: Messages,
        as: 'messages',
      },
    ]
  })
}

export { getHistories, getHistory }
