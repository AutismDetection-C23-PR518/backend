const jwt = require('jsonwebtoken')
require('dotenv').config()

async function verifAuth(req, res, next) {
    const token = req.headers.authorization

    if (!token)
        return res.status(400).send('Access Denied')

    try {
        const verif = jwt.verify(token, process.env.ACCESS_TOKEN)

        const a = req.id_user = verif.id_user
        console.log(verif)
        next()
        // const verif = jwt.verify(token.toString(), process.env.ACCESS_TOKEN)
        // req.user = verif
    } catch (error) {
        return res.status(400).send('Invalid Token')

    }

}

module.exports = {
    verifAuth
}