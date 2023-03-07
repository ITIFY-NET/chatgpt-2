import Profile from '../database/models/profile'

const getModelSetting = async () => {
  return Profile.findAll()
}

const updateSettingModelUser = async (data) => {
  const { modelSettingId, accountId } = data
  return await Profile.update({ modelSettingId }, { where: { accountId } })
}

export { updateSettingModelUser, getModelSetting }
