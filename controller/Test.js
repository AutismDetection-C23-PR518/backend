const Test = require('../models/testModel.js')
const User = require('../models/userModel.js')

require('dotenv').config()
const db = require('../config/Database.js')
const moment = require('moment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verif = require('../middleware/verif.js')
const Sequelize = require('sequelize')
const express = require('express')
const {
    create_post
} = require('./Post.js')
const app = express()
app.use(express.json())


async function createTest(req, res) {
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss').toString()
    const id_user = req.params.id_user
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
        toddler_age: req.body.toddler_age,
        gender: req.body.gender,
        ethnicity: req.body.ethnicity,
        jaundice: req.body.jaundice,
        family_with_ASD: req.body.family_with_ASD,
        who_test: req.body.who_test,
        created_at: created_at
    }

    try {

        await Test.create({
            id_user: req.id_user,
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
            toddler_age: test.toddler_age,
            gender: test.gender,
            ethnicity: test.ethnicity,
            jaundice: test.jaundice,
            family_with_ASD: test.family_with_ASD,
            who_test: test.who_test,
            createAt: test.created_at

        })
        return res.status(200).json({
            message: 'Saving the test',
            id_user: test.id_user,
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
            toddler_age: test.toddler_age,
            gender: test.gender,
            ethnicity: test.ethnicity,
            jaundice: test.jaundice,
            family_with_ASD: test.family_with_ASD,
            who_test: test.who_test
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

async function getAllTest(req, res) {
    try {
        const allTest = await Test.findAll({
            attributes: ['id_test', 'id_user', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'Q_score', 'gender', 'ethnicity', 'jaundice', 'family_with_ASD', 'who_test'],
            include: [{
                model: User,
                attributes: ['name', 'username', 'email']
            }]
        })
        if (!allTest) return res.status(404).json({
            msg: "Test Not Found"
        })
        return res.status(200).json(allTest)
    } catch (error) {
        return res.status(500).json({
            error: 'There\'s something wrong'
        })
    }
}
async function getTestByIdUser(req, res) {

    try {

        const test = await Test.findAll({
            attributes: ['id_test', 'id_user', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'Q_score', 'gender', 'ethnicity', 'jaundice', 'family_with_ASD', 'who_test'],
            where: {
                id_user: req.params.id_user
            },
            include: [{
                model: User,
                attributes: ['name', 'username', 'email']
            }]
        })
        if (!test) return res.status(404).json({
            msg: "Test Not Found"
        })
        return res.status(200).json(test)
    } catch (error) {
        return res.status(500).json({
            error: 'There\'s something wrong'
        })
    }
}



async function getTestById(req, res) {

    try {

        const test = await Test.findOne({
            attributes: ['id_test', 'id_user', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'Q_score', 'gender', 'ethnicity', 'jaundice', 'family_with_ASD', 'who_test'],
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
        if (!test) return res.status(404).json({
            msg: "Test Not Found"
        })
        return res.status(200).json(test)
    } catch (error) {
        return res.status(500).json({
            error: 'There\'s something wrong'
        })
    }
}

async function deleteTest(req, res) {
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
    try {
        await Test.destroy({
            where: [{
                id_user: req.params.id_user
            }, {
                id_test: req.params.id_test
            }],
        })
        res.status(200).send('Test has been deleted')
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    createTest,
    getAllTest,
    getTestByIdUser,
    getTestById,
    deleteTest
}