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
    var findUser, log, sql, tokenUser, hashPassword
    const password = req.body.password
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
            name: rows[0].name,

        }


        hashPassword = rows[0].password
        if (rows.length > 0 && password != undefined) {
            const match = await bcrypt.compare(password, hashPassword)
            if (!match) {
                if (password != undefined) {
                    return res.status(400).send('Please enter the correct password')
                }

            }
        }
        const accessToken = generateToken(tokenUser)
        db.query(sql, [accessToken, user.log], async function (error, rows) {
            if (error) {
                console.error(error)
                return res.status(500).send('ERROR')
            }
            return res.status(200).json({
                error: false,
                message: 'Success',
                result: tokenUser,
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
    const id = req.params.id
    const user = {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        password: hashPassword,
        created_at: created_at,
    }
    if (req.body.password.length < 8)
        return res.status(400).send('Password minimal 8 karakter!')

    db.query(sql, [user.username, user.email, user.name, user.password, user.created_at, id], async function (error, rows) {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).send(`${user.email || user.username} already exist `)
            }
            return res.status(500).send('There\'s something wrong')

        }
        return res.status(200).json({
                username: user.username,
                    email: user.email,
                    name: user.name,
                    password: user.password,
                    created_at: user.created_at
                })
                //return res.status(200).send('Updated')
    })


}

async function getProfile(req, res) {
    const sql = `SELECT * FROM user WHERE id_user=?`
    const id = req.params.id
    console.log(id)

    db.query(sql, [id], async function (error, rows) {
                    if (error) {
                        console.error(error)
                        return res.status(500).send(error)
                    }
                    if (rows.length > 0) {
                        return res.status(200).json({
                            name: rows[0].name,
                            username: rows[0].username,
                            email: rows[0].email
                        })
                    }

        })
        //return res.status(200).send('Success')

}

async function delete_user(req, res) {
    const id = req.params.id
    db.query("DELETE FROM user WHERE id_user =? ", [id], (error, result) => {
        if (error) throw error;
        return res.send("Number of records deleted: " + result.affectedRows);
    })

}

async function create_post(req, res) {
    const sql = `INSERT INTO post (user_id, stori, created_at) VALUES( ?, ?, ?)`
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss').toString()
    const id = req.params.id

    const story = {
        stori: req.body.stori,
        created_at: created_at
    }
    db.query(sql, [id, story.stori, story.created_at], async function (error, rows) {
        if (error) {
            console.error(error)
            return res.status(500).send('There\'s something wrong')
        } else {
            return res.status(200).json({
                id_user: id,
                stori: story.stori,
                created_at: created_at
            })
        }
        return res.status(200).send('Stori Updated')
    })
}

async function delete_post(req, res) {
    const id = req.params.id
    const id_post = req.params.id_post
    db.query("DELETE FROM post WHERE id_post=? AND user_id =? ", [id_post, id], (error, result) => {
        if (error) throw error;
        return res.send("Number of records deleted: " + result.affectedRows)
    })
}

async function getAllPost(req, res) {
    const sql = `select * from post`
    db.query(sql, (err, result, field) => {
        if (err) {
            return res.status(500).json({
                error: 'there\'s something wrong'
            })
        }
        res.status(200).json(result)
    })
}

async function getStoryUser(req, res) {
    const sql = `SELECT * FROM 
    post WHERE user_id =?`
    //const id_user = req.body.id_user
    const id = req.params.id

    db.query(sql, [id], async function (error, rows) {
                    if (error) {
                        console.error(error)
                        return res.status(500).send(error)
                    }

                    return res.status(200).json({
                        user_id: rows[0].user_id,
                        stori: rows[0].stori,
                        sum_like: rows[0].sum_like
                    })

    })
}

async function postDetectionUser(req, res) {
    var idtest
    const sql = `INSERT INTO deteksi (test_id, user_id, hasil_deteksi, created_at) VALUES( ?, ?, ?, ?)`
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss').toString()
    const id = req.params.id
    const hasil_deteksi = req.body.hasil_deteksi


    const sqltest = `SELECT id_test FROM test WHERE user_id =?`

    db.query(sqltest, [id], async function (error, rows) {
        if (error) {
            console.error(error)
            return res.status(500).send('There\'s something wrong')
        }
        idtest = rows[1].id_test
        db.query(sql, [idtest, id, hasil_deteksi, created_at], async function (error, rows) {
            if (error) {
                console.error(error)
                return res.status(500).send('There\'s something wrong')
            } else {
                return res.status(200).json({
                    test_id: idtest,
                    user_id: id,
                    hasil_deteksi: hasil_deteksi,
                    created_at: created_at
                })
            }
            return res.status(200).send('Stori Updated')
        })

    })


}
async function getDetectionUser(req, res) {
    const sql = `SELECT * FROM 
    deteksi WHERE user_id =?`
    //const id_user = req.body.id_user
    const id = req.params.id

    db.query(sql, [id], async function (error, rows) {
                    if (error) {
                        console.error(error)
                        return res.status(500).send(error)
                    }
                    // for (element of rows.hasil_deteksi) {
                    //     return res.status(200).json(element)
                    // }
                    return res.status(200).json({
                        test_id: idtest,
                        user_id: id,
                        hasil_deteksi: hasil_deteksi

                    })


    })
}

async function postTest(req, res) {
    const sql = `INSERT INTO test (user_id, A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, Q_score, umur_balita, gender, etnis, jaundice, keluarga_ASD, who_test, created_at) VALUES( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss').toString()
    const idSQL = `SELECT id_user FROM user WHERE id_user =?`
    const id = req.params.id
    const test = {
        A1: req.body.A1,
        A2: req.body.A2,
        A3: req.body.A3,
        A4: req.body.A4,
        A5: req.body.A5,
        A6: req.body.A6,
        A7: req.body.A7,
        A8: req.body.A8,
        A9: req.body.A9,
        A10: req.body.A10,
        Q_score: req.body.Q_score,
        umur_balita: req.body.umur_balita,
        gender: req.body.gender,
        etnis: req.body.etnis,
        jaundice: req.body.jaundice,
        keluarga_ASD: req.body.keluarga_ASD,
        who_test: req.body.who_test,
        created_at: created_at
    }
    var iduser
    db.query(idSQL, [id], async function (error, rows) {
        if (error) {
            console.error(error)
            return res.status(500).send(error)
        }
        if (rows.length > 0) {
            iduser = rows[0].id_user
        }
        db.query(sql, [iduser, test.A1, test.A2, test.A3, test.A4, test.A5, test.A6, test.A7, test.A8, test.A9, test.A10, test.Q_score, test.umur_balita, test.gender, test.etnis, test.jaundice, test.keluarga_ASD, test.who_test, test.created_at], async function (error, rows) {
            if (error) {
                console.error(error)
                return res.status(500).send('There\'s something wrong')
            }
            if (iduser == null) {
                return res.status(500).send(error)
            } else {
                return res.status(200).json({
                    user_id: id,
                    A1: test.A1,
                    A2: test.A2,
                    A3: test.A3,
                    A4: test.A4,
                    A5: test.A5,
                    A6: test.A6,
                    A7: test.A7,
                    A8: test.A8,
                    A9: test.A9,
                    A10: test.A10,
                    Q_score: test.Q_score,
                    umur_balita: test.umur_balita,
                    gender: test.gender,
                    etnis: test.etnis,
                    jaundice: test.jaundice,
                    keluarga_ASD: test.keluarga_ASD,
                    who_test: test.who_test,
                    created_at: created_at

                })
            }
        })
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
    updateProfile,
    getProfile,
    delete_user,
    create_post,
    delete_post,
    getStoryUser,
    postTest,
    postDetectionUser,
    getDetectionUser,
    getAllPost

}