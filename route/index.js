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
router.get(`${version}/getprofile/`, verif.verifAuth, userController.getProfile)
router.delete(`${version}/delete_user`, userController.delete_user)

//post
router.post(`${version}/create_post`, userController.create_post)
router.delete(`${version}/delete_post`, userController.delete_post)
router.put(`${version}/like_post`, userController.like_post)
router.put(`${version}/unlike_post`, userController.unlike_post)

//deteksi

module.exports = router
