const express = require('express')
const router = express.Router()
const userController = require('../controller/Users.js')
const postController = require('../controller/Post.js')
const testController = require('../controller/Test.js')
const detectionController = require('../controller/Detection.js')
const multer = require('multer');
const verif = require('../middleware/verif.js')
const version = '/api/v1'

const multerConfig = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // Batasan ukuran file (5MB)
    },
});


//user route
router.get(`${version}/alluser`, userController.getAllUser)
router.get(`${version}/user/:id_user`, userController.getUserById)
router.post(`${version}/register`, userController.register)
router.post(`${version}/login`, userController.login)
router.patch(`${version}/updateprofile/:id_user`, verif.verifAuth, userController.update_user)
router.delete(`${version}/deleteuser/:id_user`, verif.verifAuth, userController.delete_user)
router.post(`${version}/upfoto`, verif.verifAuth, multerConfig.single('photo'), userController.upFoto)

//test route
router.get(`${version}/alltest`, testController.getAllTest)
router.get(`${version}/gettest/:id_user`, testController.getTestByIdUser)
router.get(`${version}/test/:id_user/:id_test`, testController.getTestById)
router.post(`${version}/test`, verif.verifAuth, testController.createTest)
router.delete(`${version}/deletetest/:id_user/:id_test`, verif.verifAuth, testController.deleteTest)

//detection route
router.get(`${version}/alldetection`, detectionController.getAllDetection)
router.get(`${version}/detection/:id_user`, detectionController.getDetectByIdUser)
router.get(`${version}/detection/:id_user/:id_test`, detectionController.getDetectById)
router.post(`${version}/detectionresult/:id_user/:id_test`, verif.verifAuth, detectionController.ResultDetection)
router.delete(`${version}/deletedetection/:id_user/:id_test`, verif.verifAuth, detectionController.deleteDetection)

//post route
router.get(`${version}/allpost`, postController.getAllPost)
router.get(`${version}/post/:id_user`, postController.getPostByIdUser)
router.get(`${version}/post/:id_user/:id_post`, postController.getPostByIdPost)
router.post(`${version}/createpost`, verif.verifAuth, postController.create_post)
router.patch(`${version}/like_post/:id_post`, verif.verifAuth, postController.like_post)
router.patch(`${version}/unlike_post/:id_post`, verif.verifAuth, postController.unlike_post)
router.delete(`${version}/deletepost/:id_user/:id_post`, verif.verifAuth, postController.delete_post)

module.exports = router