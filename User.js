require('dotenv').config()
const db = require('./Database.js')
const moment = require('moment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const express = require('express')
const app = express()
app.use(express.json())
const version = '/api/v1'

function generateToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: '15s'
    })
}

app.get(`${version}/users`, async (req, res) => {
    const sql = `select * from user`
    db.query(sql, (err, result, field) => {
        if (err) {
            return res.status(500).json({
                error: 'there\'s something wrong'
            })
        }
        res.status(200).json(result)
    })

})

app.post(`${version}/register`, async (req, res) => {
    const sql = `INSERT INTO user (username, email, name, password, created_at) VALUES( ?, ?, ?, ?,?)`

    const created_at = moment().format('YYYY-MM-DD HH:mm:ss').toString()

    const hashPassword = await bcrypt.hash(req.body.password, 12)
    const user = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        created_at: created_at
    }

    if (req.body.password.length < 8)
        return res.status(400).send('Password minimal 8 karakter!')

    db.query(sql, [user.username, user.email, user.name, user.password, user.created_at], async function (error, rows) {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).send(`Email/username ${user.email || user.username} already exist `)
            }
            console.error(error)
            return res.status(500).send('There\'s something wrong')

        }
        return res.status(200).send('Succussfully Registered')
    })


})

app.post(`${version}/login`, async (req, res) => {
    const sql = `INSERT INTO user (access_token) VALUE (?) WHERE username="?" OR email="?" `
    const findUser = `SELECT * FROM user WHERE username="?" OR email="?"`

    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const log = username || email
    const user = {
        // username: username,
        // email: email,
        log: log
    }

    db.query(findUser, [log], async function (error, users) {
        if (error) {
            return res.status(500).send('There\'s somethimg wrong')
        }
        if (users.length > 0 && password != undefined) {
            const matchPass = bcrypt.compareSync(password, users[0].password)
            if (!matchPass) return res.status(400).send('Wrong password!')

            const accessToken = generateToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, {
                expiresIn: '1d'
            })
            db.query(sql, [refreshToken], async function (error, rows) {
                if (error) {
                    return res.status(500).send('There\'s somethimg wrong')
                }
                return res.status(200).send('Successfully Login')
            })
            res.json({
                log: log,
                password: password,
                accessToken: accessToken,
                refreshToken: refreshToken
            })
        }
    })

})


app.listen(8080, () => {
    console.log('Server Berjalan di Port : ' + 8080);
});