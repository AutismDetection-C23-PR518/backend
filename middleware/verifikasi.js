const jwt = require('jsonwebtoken')
require('dotenv').config()

async function verifAuth(req, res, next) {
    const token = req.headers["x-access-token"]

    if (!token)
        return res.status(400).send('Access Denied')

    try {
        const verif = jwt.verify(token.toString(), process.env.ACCESS_TOKEN)
        req.user = verif
    } catch (error) {
        return res.status(400).send('Invalid Token')

    }
    return next()

}

module.exports = {
    verifAuth
}