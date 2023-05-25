const express = require('express')
const router = express.Router()
const verifiToken = require('../middleware/verifikasi.js')
const userController = require('../controller/User.js')
const version = '/api/v1'
//user
router.get(`${version}/users`, userController.users)
router.post(`${version}/register`, userController.register)
router.post(`${version}/login`, userController.login)
router.put(`${version}/updateprofile`, userController.updateProfile)

module.exports = router