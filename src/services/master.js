import MasterToken from '../database/models/masterToken'

const getMasterToken = async () => {
  const masterToken = await MasterToken.findOne({
    where: {
      validFlag: 1
    },
    order: [['updatedAt', 'asc']]
  }).then((record) => record.update({ updatedAt: Math.floor(Date.now() / 1000) }))
  return masterToken.dataValues.token
}

export { getMasterToken }
