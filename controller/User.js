require('dotenv').config()
const db = require('../config/Database.js')
const moment = require('moment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifikasi = require('../middleware/verifikasi.js')

const express = require('express')
const app = express()
app.use(express.json())

function generateToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: '3d'
    })
}

async function users(req, res) {
    const sql = `select * from user`
    db.query(sql, (err, result, field) => {
        if (err) {
            return res.status(500).json({
                error: 'there\'s something wrong'
            })
        }
        res.status(200).json(result)
    })
}

async function register(req, res) {
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
    if (req.body.password.length < 8) {
        return res.status(400).send('Password minimal 8 karakter!')
    }
    db.query(sql, [user.username, user.email, user.name, user.password, user.created_at], async function (error, rows) {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).send(` ${user.email || user.username} already exist `)
            }
            console.error(error)
            return res.status(500).send('There\'s something wrong')
        }
        const id_user = `select id_user from user where email = ? `
        db.query(id_user, [user.email], async function (err, result, rows) {
            if (err) {
                return res.status(500).json({
                    error: 'there\'s something wrong'
                })
            }

            res.status(200).json({
                id: result[0].id_user,
                username: user.username,
                email: user.email,
                name: user.name

            })

        })

    })
}

async function login(req, res) {
    var findUser, log, sql, token

    const username = req.body.username
    const email = req.body.email
    if (email == null) {
        findUser = `SELECT * FROM user WHERE username=? `
        sql = `UPDATE user SET access_token=? WHERE username=?`
        log = username
    } else {
        findUser = `SELECT * FROM user WHERE email=? `
        sql = `UPDATE user SET access_token=? WHERE email=?`
        log = email
    }

    const password = req.body.password
    const user = {
        log: log
    }
    db.query(findUser, [user.log], async function (error, rows) {
        if (error) {
            console.error(error)
            return res.status(500).send('There\'s something wrong')
        }
        tokenUser = {
            id: rows[0].id_user,
            name: rows[0].name
        }
        const accessToken = generateToken(tokenUser)
        db.query(sql, [accessToken, user.log], async function (error, rows) {
            if (error) {
                console.error(error)
                return res.status(500).send('ERROR')
            }
            if (rows.length > 0 && password != undefined) {
                const matchPass = bcrypt.compareSync(password, rows[0].password)

                if (!matchPass) {
                    return res.status(400).send('Wrong password!')
                }
                return res.json({
                    error: false,
                    msg: 'Success',
                    token: tokenUser,
                    accessToken: accessToken,
                })

            }
            return res.status(200).json({
                error: false,
                msg: 'Success',
                token: tokenUser,
                accessToken: accessToken,
            })
        })
        res.header('x-access-token', accessToken)
    })
}

async function updateProfile(req, res) {
    const sql = `UPDATE user SET username =?, email=?,name=?,password=?,created_at=? WHERE id_user =?`
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss').toString()
    const hashPassword = await bcrypt.hash(req.body.password, 12)

    const user = {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        password: hashPassword,
        created_at: created_at,
        id: req.body.id_user
    }
    if (req.body.password.length < 8)
        return res.status(400).send('Password minimal 8 karakter!')

    db.query(sql, [user.username, user.email, user.name, user.password, user.created_at, user.id], async function (error, rows) {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).send(`${user.email || user.username} already exist `)
            }
            return res.status(500).send('There\'s something wrong')

        }
        // return res.status(200).json({
        //         username: user.username,
        //             email: user.email,
        //             name: user.name,
        //             password: user.password,
        //             created_at: user.created_at
        //         })
        return res.status(200).send('Updated')
    })


}

// app.post(`${version}/story`, async (req, res) => {
//     const sql = `INSERT INTO post (user_id, stori, created_at) VALUES( ?, ?, ?)`
//     const created_at = moment().format('YYYY-MM-DD HH:mm:ss').toString()

//     const story = {
//         user_id: req.body.user_id,
//         stori: req.body.stori,
//         created_at: created_at
//     }
//     db.query(sql, [story.user_id, story.story, story.created_at], async function (error, rows) {
//         if (error) {
//             console.error(error)
//             return res.status(500).send('There\'s something wrong')
//         }
//     })
// })

module.exports = {
    users,
    register,
    login,
    updateProfile
}