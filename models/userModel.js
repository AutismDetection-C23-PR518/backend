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