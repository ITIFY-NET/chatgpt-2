const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const generateAccountToken = (accountInfo) => {
  try {
    const accountToken = jwt.sign(
      {
        data: { accountInfo }
      },
      SECRET
    )
    return accountToken
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  generateAccountToken
}
