const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = token => {
    return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = { verifyToken }