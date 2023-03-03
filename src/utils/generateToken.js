const jwt = require('jsonwebtoken')
const SECRET =
  '6D3DD80B6B40927146F39A2FB5A273C8A7C49C0856B8D4936CC34A90C7649E0B'

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
