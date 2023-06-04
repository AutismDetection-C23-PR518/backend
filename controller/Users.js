const User = require('../models/userModel.js')
require('dotenv').config()
const moment = require('moment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const express = require('express')
const app = express()
app.use(express.json())

const {
    Storage
} = require("@google-cloud/storage");
const storage = new Storage({
    keyFilename: "autism-detection-387205-c64d19d4cc02.json"
});
const bucketName = 'foto-profile';

async function upFoto(req, res) {
    if (!req.file) {
        res.status(400).json({
            error: 'No file uploaded'
        });
        return;
    }
    const fileData = req.file;

    const bucket = storage.bucket(bucketName);
    const fileName = `${Date.now()}_${fileData.originalname}`;
    const encodedFileName = encodeURIComponent(fileName);
    const file = bucket.file(fileName);

    const fileStream = file.createWriteStream({
        metadata: {
            contentType: fileData.mimetype,
        },
        resumable: false,
    });

    fileStream.on('error', (err) => {
        console.error('Error uploading file:', err);
        res.status(500).json({
            error: 'Failed to upload file'
        });
    });

    fileStream.on('finish', () => {
        const baseUrl = `https://storage.googleapis.com/${bucketName}/`;
        const publicUrl = `${baseUrl}${encodedFileName}`;

        res.json({
            url: publicUrl
        });
    });

    fileStream.end(fileData.buffer);

}

function generateToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: '3d'
    })
}

async function getAllUser(req, res) {
    try {
        const allUser = await User.findAll({
            attributes: ['id_user', 'name', 'username', 'email']
        })
        return res.status(200).json(allUser)
    } catch (error) {
        return res.status(500).json({
            error: 'There\'s something wrong'
        })
    }
}
async function getUserById(req, res) {
    try {
        const user = await User.findOne({
            attributes: ['id_user', 'name', 'username', 'email'],
            where: {
                id_user: req.params.id_user
            }
        })
        if (!user) return res.status(404).json({
            msg: "User Not Found"
        })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({
            error: 'There\'s something wrong'
        })
    }
}
async function register(req, res) {
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
    try {

        await User.create({
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password
        })
        return res.status(200).json({
            message: 'Successfully Registered',
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
async function login(req, res) {
    var tokenUser, userr
    const password = req.body.password
    const username = req.body.username
    const email = req.body.email
    if (username == null) {
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        userr = user
    } else {
        const user = await User.findOne({
            where: {
                username: username
            }
        })
        userr = user
    }

    if (!userr) {
        return res.status(400).send('Please enter the correct email/username')
    }
    tokenUser = {
        id: userr.id_user,
        name: userr.name
    }
    const match = await bcrypt.compare(password, userr.password)
    if (!match) {
        if (password != undefined) {
            return res.status(400).send('Please enter the correct password')
        }
    }
    const accessToken = generateToken(tokenUser)
    try {
        await User.update({
            access_token: accessToken
        }, {
            where: {
                email: userr.email
            }
        })
        return res.status(200).json({
            error: false,
            message: 'Success',
            result: tokenUser,
            accessToken: accessToken,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send('ERROR')
    }
}

async function update_user(req, res) {
    const hashPassword = await bcrypt.hash(req.body.password, 12)
    const id_user = req.params.id_user
    const user = await User.findOne({
        where: {
            id_user: id_user
        }
    })
    if (req.body.password.length < 8) {
        return res.status(400).send('Password minimal 8 karakter!')
    }
    try {
        await User.update({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        }, {
            where: {
                id_user: user.id_user
            }
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
    const update = await User.findOne({

        attributes: ['id_user', 'name', 'username', 'email', 'password'],
        where: {
            id_user: req.params.id_user
        }
    })
    res.status(200).json(update)


}
async function delete_user(req, res) {
    const id_user = req.params.id_user
    const user = await User.findOne({
        where: {
            id_user: id_user
        }
    })
    try {
        await User.destroy({
            where: {
                id_user: user.id_user
            }
        })
        res.status(200).send('Account has been deleted')
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    upFoto,
    getAllUser,
    getUserById,
    register,
    login,
    update_user,
    delete_user
}