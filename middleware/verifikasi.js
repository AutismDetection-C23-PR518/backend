const jwt = require('jsonwebtoken')
require('dotenv').config()

async function verifAuth(req, res, next) {
    const token = req.headers["x-access-token"]

    if (!token)
        return res.status(400).send('Access Denied')

    try {
        const verif = jwt.verify(token.toString(), process.env.ACCESS_TOKEN)
        req.user = verif
        console.log('masukcin ' + verif)
    } catch (error) {
        return console.error(error)
        //res.status(400).send('Invalid Token')

    }
    return next()

}

module.exports = {
        verifAuth
        }
        // const jwt = require('jsonwebtoken');

// async function verifyJWT(headers, reply) {
//     var token = headers.replace('Bearer ', '');
//     let decode;
//     try {
//         decode = jwt.verify(token, process.env.ACCESS_TOKEN)
//     } catch (err) {
//         if (err.name == "TokenExpiredError")
//             return reply
//                 .code(401)
//                 .header('Content-Type', 'application/json; charset=utf-8')
//                 .send({
//                     error: true,
//                     message: "Token Expired",
//                 });
//         else return reply
//             .code(401)
//             .header('Content-Type', 'application/json; charset=utf-8')
//             .send({
//                 error: true,
//                 message: "Missing Token",
//             });
//     }

//     return decode.id
// }

// module.exports = {
//     verifyJWT
// };