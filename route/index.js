const express = require('express')
const router = express.Router()
const userController = require('../controller/User.js')
const verif = require('../middleware/verifikasi.js')
const version = '/api/v1'
    //user
router.get(`${version}/users`, userController.users) //DONE
router.post(`${version}/register`, userController.register) //DONE
router.post(`${version}/login`, userController.login) //DONE
router.put(`${version}/updateprofile/:id`, verif.verifAuth, userController.updateProfile) //DONE
router.get(`${version}/getprofile/:id`, verif.verifAuth, userController.getProfile) //DONE
router.delete(`${version}/delete_user/:id`, verif.verifAuth, userController.delete_user) //DONE

//post
router.post(`${version}/create_post/:id`, verif.verifAuth, userController.create_post) //DONE
router.delete(`${version}/delete_post/:id/:id_post`, verif.verifAuth, userController.delete_post) //DONE
router.get(`${version}/getstory/:id`, verif.verifAuth, userController.getStoryUser) //DONE
router.get(`${version}/getallpost`, userController.getAllPost) //DONE

//deteksi
router.post(`${version}/posttest/:id`, verif.verifAuth, userController.postTest)
router.post(`${version}/hasildeteksi/:id`, verif.verifAuth, userController.postDetectionUser)
router.get(`${version}/gethasildeteksi/:id`, verif.verifAuth, userController.postDetectionUser)

module.exports = router