// @ts-nocheck
import { Account, Profile, DeviceToken } from '../database/models'
import { generateAccountToken } from '../utils/generateToken'
import { SUCCESS_CODE } from '../constants/responseCode'
import { DEFAULT_ROLE } from '../constants/system'
const admin = require('firebase-admin')

/**
 * Builds sorting
 * @param {any} request
 * @param {any} response
 * @param {any} next
 */
export const login = async (request, response, next) => {
  try {
    const { email, ssoToken, ssoType, ssoId, deviceToken } = request.body
    let account = null
    let accountToken = null
    const user = await admin.auth().getUser(ssoId)
    account = await Account.findOne({
      where: {
        ssoId: ssoId,
        validFlag: 1
      },
      include: [
        {
          model: Profile,
          as: 'profile'
        }
      ]
    })
    if (account) {
      const accountInfo = {
        id: account.id,
        email: account.email,
        displayName: account.displayName,
        ssoId: account.ssoId,
        role: account.role,
        screenName: account.screenName
      }
      console.log({ account })
      accountToken = generateAccountToken(accountInfo)
      await Account.update(
        { lastLoginAt: new Date() },
        { returning: true, where: { id: account.id } }
      )
      await DeviceToken.update(
        { deviceToken },
        {
          where: { accountId: account.id }
        }
      )
    } else {
      account = await Account.create({
        email: user.providerData[0].email || email,
        displayName: user.displayName,
        ssoId: ssoId,
        ssoType: user.providerData[0].providerId || ssoType,
        ssoToken: ssoToken ? ssoToken.trim() : '',
        validFlag: 1,
        role: DEFAULT_ROLE,
        lastLoginAt: new Date(),
        screenName: `chatpgt_${Math.floor(new Date().getTime() / 1000)}`
      })
      await Profile.create({
        accountId: account.id,
        avatar: user?.photoURL
      })
      await DeviceToken.create({
        accountId: account.id,
        deviceToken
      })
      const accountInfo = {
        id: account.id,
        email: account.email,
        displayName: account.displayName,
        role: account.role,
        ssoId: account.ssoId,
        screenName: account.screenName
      }
      accountToken = generateAccountToken(accountInfo)
    }

    return response.status(SUCCESS_CODE).json({
      status: SUCCESS_CODE,
      data: { token: accountToken, account: account },
      code: SUCCESS_CODE
    })
  } catch (error) {
    console.log(error)
    next()
  }
}
