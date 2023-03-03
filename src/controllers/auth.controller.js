import { Account } from '../database/models'

export const login = async (/** @type {any} */ req, /** @type {any} */ res, /** @type {() => void} */ next) => {
  try {
    const data = await Account.findAll()
    console.log({
      data
    })
  } catch (error) {
    console.log(error)
    next()
  }
}