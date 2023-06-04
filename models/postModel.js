const Sequelize = require('sequelize')
const db = require('../config/Database.js')
const User = require('./userModel.js')

const Post = db.define('post', {
        id_post: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_user: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        post: {
            type: Sequelize.DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        sum_like: {
            type: Sequelize.DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                notEmpty: true
            }
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

User.hasMany(Post)
Post.belongsTo(User, {
    foreignKey: 'id_user'
})

module.exports = Post