const Sequelize = require('sequelize')
const db = require('../config/Database.js')
const User = require('./userModel.js')

const Test = db.define('test', {
        id_test: {
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
        A1: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: 0
        },
        A2: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: 0
        },
        A3: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: 0
        },
        A4: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: 0
        },
        A5: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: 0
        },
        A6: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: 0
        },
        A7: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: 0
        },
        A8: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: 0
        },
        A9: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: 0
        },
        A10: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: 0
        },
        Q_score: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        toddler_age: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false

        },
        ethnicity: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        jaundice: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false

        },
        family_with_ASD: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        who_test: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
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

User.hasMany(Test)
Test.belongsTo(User, {
    foreignKey: 'id_user'
})


module.exports = Test