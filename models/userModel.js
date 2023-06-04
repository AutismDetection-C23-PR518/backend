const Sequelize = require('sequelize')
const db = require('../config/Database.js')

const User = db.define('user', {
        id_user: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100]
            }
        },
        username: {
            type: Sequelize.DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                noSpace(value) {
                    if (/\s/.test(value)) {
                        throw new Error('Must not contain spaces')
                    }
                },
                async isUnique(value) {
                    const usern = await User.findOne({
                        where: {
                            username: value
                        }
                    })
                    if (usern) {
                        throw new Error('Username already exist')
                    }
                }
            }
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
                async isUnique(value) {
                    const usere = await User.findOne({
                        where: {
                            email: value
                        }
                    })
                    if (usere) {
                        throw new Error('Email already exist')
                    }
                }
            }
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        hasil_deteksi: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        },
        access_token: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: Sequelize.DataTypes.DATE,
            createdAt: true,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DataTypes.DATE,
            createdAt: true,
            allowNull: false
        }

    }, {
        freezeTableName: true,
        force: false
    }

)


module.exports = User