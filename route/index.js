const express = require('express')
const router = express.Router()
const verifiToken = require('../middleware/verifikasi.js')
const userController = require('../controller/User.js')
const verif = require('../middleware/verifikasi.js')
const version = '/api/v1'
    //user
router.get(`${version}/users`, userController.users)
router.post(`${version}/register`, userController.register)
router.post(`${version}/login`, userController.login)
router.put(`${version}/updateprofile`, verif.verifAuth, userController.updateProfile)

module.exports = router