const Post = require('../models/postModel.js')
const User = require('../models/userModel.js')
require('dotenv').config()
const db = require('../config/Database.js')
const moment = require('moment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verif = require('../middleware/verif.js')

const express = require('express')
const {
    Sequelize
} = require('sequelize')
const app = express()
app.use(express.json())

async function getAllPost(req, res) {
    try {
        const post = await Post.findAll({
            include: [{
                model: User,
                attributes: ['name', 'username', 'email']
            }]
        })
        if (!post) return res.status(404).json({
            msg: "Post Not Found"
        })
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({
            error: 'There\'s something wrong'
        })
    }
}
async function getPostByIdUser(req, res) {
    try {
        const post = await Post.findAll({
            where: {
                id_user: req.params.id_user
            },
            include: [{
                model: User,
                attributes: ['name', 'username', 'email']
            }]
        })
        if (!post) return res.status(404).json({
            msg: "Post Not Found"
        })
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({
            error: 'There\'s something wrong'
        })
    }
}
async function create_post(req, res) {
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss').toString()
    const id_user = req.params.id_user
    const postuser = {
        post: req.body.post,
        created_at: created_at
    }
    try {
        const post = await Post.create({
            id_user: req.id_user,
            post: postuser.post,
            createAt: postuser.created_at
        })
        return res.status(200).json({
            message: 'Status Updated',
            id_user: post.id_user,
            createdAt: post.createAt
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
async function getPostByIdPost(req, res) {
    try {
        const post = await Post.findOne({
            attributes: ['id_test', 'id_user', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'Q_score', 'gender', 'ethnicity', 'jaundice', 'family_with_ASD', 'who_test'],
            where: [{
                id_user: req.params.id_user
            }, {
                id_post: req.params.id_post
            }],
            include: [{
                model: User,
                attributes: ['name', 'username', 'email']
            }]
        })
        if (!post) return res.status(404).json({
            msg: "Post Not Found"
        })
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({
            error: 'There\'s something wrong'
        })
    }

}
async function delete_post(req, res) {
    const post = await Post.findOne({
        where: [{
            id_user: req.params.id_user
        }, {
            id_post: req.params.id_post
        }],
    })
    if (!post) return res.status(404).json({
        msg: "Post Not Found"
    })
    try {
        await Post.destroy({
            where: [{
                id_user: req.params.id_user
            }, {
                id_post: req.params.id_post
            }],
        })
        res.status(200).send('Status has been deleted')
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

async function like_post(req, res) {
    try {
        const post = await Post.findOne({
            where: {
                id_post: req.params.id_post
            }
        })
        if (!post) return res.status(404).json({
            msg: "Post Not Found"
        })

        const sumlike = await Post.update({
            sum_like: Sequelize.literal('sum_like + 1')
        }, {
            where: {
                id_post: post.id_post
            }
        })
        return res.status(200).json({
            message: 'add like'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}
async function unlike_post(req, res) {
    try {
        const post = await Post.findOne({
            where: {
                id_post: req.params.id_post
            }
        })
        if (!post) return res.status(404).json({
            msg: "Post Not Found"
        })

        const sumlike = await Post.update({
            sum_like: Sequelize.literal('sum_like - 1')
        }, {
            where: {
                id_post: post.id_post
            }
        })
        return res.status(200).json({
            message: 'unlike'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

module.exports = {
    getAllPost,
    getPostByIdUser,
    getPostByIdPost,
    create_post,
    delete_post,
    like_post,
    unlike_post
}