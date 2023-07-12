const {verifyToken} = require("../utils/auth");


const verifyUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.replaceAll('Bearer ', '')
        if (token) {
            req.user = verifyToken(token)
            return next()
        } else {
            return res.sendStatus(401)
        }
    } catch (e) {
        return res.sendStatus(401)
    }
}

module.exports = { verifyUser }