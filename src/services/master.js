import MasterToken from '../database/models/masterToken'

const getMasterToken = async () => {
  const masterToken = await MasterToken.findOne({
    where: {
      validFlag: 1
    }
  })
  return masterToken.dataValues.token
}

export { getMasterToken }
