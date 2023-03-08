import { ModelSetting, Profile } from '../database/models'

const getModelSetting = async () => {
  return ModelSetting.findAll()
}

const updateSettingModelUser = async (data) => {
  const { modelSettingId, accountId } = data
  return await Profile.update({ modelSettingId }, { where: { accountId } })
}

export { updateSettingModelUser, getModelSetting }
