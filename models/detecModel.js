const Sequelize = require('sequelize')
const db = require('../config/Database.js')
const User = require('./userModel.js')
const Test = require('./testModel.js')
const Detection = db.define('detection', {
        id_user: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        id_test: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },

        detection_result: {
            type: Sequelize.DataTypes.STRING,
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

User.hasMany(Detection)
Detection.belongsTo(User, {
    foreignKey: 'id_user'
})
Test.hasOne(Detection)
Detection.belongsTo(Test, {
    foreignKey: 'id_test'
})

module.exports = Detection