import MasterToken from '../database/models/masterToken'
import ModelSetting from '../database/models/modelSettings'
import MasterCollection from '../database/models/masterCollections'

const getMasterToken = async () => {
  const masterToken = await MasterToken.findOne({
    where: {
      validFlag: 1
    },
    order: [['updatedAt', 'asc']]
  }).then((record) =>
    record.update({ updatedAt: Math.floor(Date.now() / 1000) })
  )
  return masterToken.dataValues.token
}

const getModelSetting = async () => {
  return ModelSetting.findAll()
}

const getMasterCollection = async () => {
  return MasterCollection.findAll({
    attributes: [
      'id',
      'category',
      'title',
      'description',
      'thumbnail',
      'createdAt'
    ],
  })
}

/**
 * @param {number} id
 */
const getCollectionById = async (id) => {
  return MasterCollection.findOne({
    where: {
      id
    }
  })
}

export {
  getMasterToken,
  getModelSetting,
  getMasterCollection,
  getCollectionById
}
