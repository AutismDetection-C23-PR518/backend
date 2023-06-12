const Detection = require('../models/detecModel.js')
const Test = require('../models/testModel.js')
const User = require('../models/userModel.js')

require('dotenv').config()
const db = require('../config/Database.js')
const moment = require('moment')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verif = require('../middleware/verif.js')

const express = require('express')
const app = express()
app.use(express.json())

async function getAllDetection(req, res) {
    try {
        const detect = await Detection.findAll({
            include: [{
                model: User,
                attributes: ['name', 'username', 'email']
            }]
        })
        if (!detect) return res.status(404).json({
            msg: "Test Not Found"
        })
        return res.status(200).json(detect)
    } catch (error) {
        return res.status(500).json({
            error: 'There\'s something wrong'
        })
    }
}

async function getDetectByIdUser(req, res) {
    try {
        const detect = await Detection.findAll({
            where: {
                id_user: req.params.id_user
            },
            include: [{
                model: User,
                attributes: ['name', 'username', 'email']
            }]
        })
        if (!detect) return res.status(404).json({
            msg: "Test Not Found"
        })
        return res.status(200).json(detect)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'There\'s something wrong'
        })
    }
}
async function ResultDetection(req, res) {
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss').toString()

    const test = await Test.findOne({
        where: [{
            id_user: req.params.id_user
        }, {
            id_test: req.params.id_test
        }],
    })
    if (!test) return res.status(404).json({
        msg: "Test Not Found"
    })
    const detect = {
        detection_result: req.body.detection_result,
        created_at: created_at
    }

    try {

        await Detection.create({
            id_user: req.id_user,
            id_test: test.id_test,
            detection_result: detect.detection_result,
            createdAt: detect.created_at

        })
        const result = await Detection.findOne({

            attributes: ['id_user', 'id_test', 'detection_result', 'createdAt'],
            where: [{
                id_user: req.params.id_user
            }, {
                id_test: req.params.id_test
            }],
            include: [{
                model: User,
                attributes: ['name', 'username', 'email']
            }]
        })
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
async function getDetectById(req, res) {
    try {
        const detect = await Detection.findOne({
            where: [{
                id_user: req.params.id_user
            }, {
                id_test: req.params.id_test
            }],
            include: [{
                model: User,
                attributes: ['name', 'username', 'email']
            }]
        })
        if (!detect) return res.status(404).json({
            msg: "Test Not Found"
        })
        return res.status(200).json(detect)
    } catch (error) {
        return res.status(500).json({
            error: 'There\'s something wrong'
        })
    }
}

async function deleteDetection(req, res) {
    const detec = await Detection.findOne({
        where: [{
            id_user: req.params.id_user
        }, {
            id_test: req.params.id_test
        }],
    })
    if (!detec) return res.status(404).json({
        msg: "Test Not Found"
    })
    try {
        await Detection.destroy({
            where: [{
                id_user: req.params.id_user
            }, {
                id_test: req.params.id_test
            }],
        })
        res.status(200).send('Detection autism has been deleted')
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}



module.exports = {
    getAllDetection,
    getDetectByIdUser,
    ResultDetection,
    getDetectById,
    deleteDetection
}