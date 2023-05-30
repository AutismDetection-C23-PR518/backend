const jwt = require('jsonwebtoken')
require('dotenv').config()

// async function verifAuth(req, res) {
//         // const token = req.headers('x-access-token')
//         const token = (req.headers['x-access-token'])
//         let result_id
//         var decode
//     if (!token)
//         return res.status(400).send('Access Denied')
//     try {
//         decode = jwt.verify(token, process.env.ACCESS_TOKEN)
//         result_id = (decode.id)
//     } catch (error) {
//         return res.status(400).send('Invalid Token')
//     }

//     return result_id
// }
//----------------------------------------
async function verifAuth(req, res, next) {
    const auth = (req.headers['authorization'])
    const token = auth && auth.split(' ')[1]
    console.log(token)
    var decode
    if (!token)
        return res.status(400).send('Access Denied')
    try {
        decode = jwt.verify(token.toString(), process.env.ACCESS_TOKEN)
        req.user = decode
        console.log(decode)

    } catch (error) {
        return res.status(400).send('Invalid Token')
    }
    return next()
}
//------------------------------------------------------------

module.exports = {
    verifAuth
}