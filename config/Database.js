const {
    Sequelize
} = require('sequelize')

require('dotenv').config()
const connect = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOSTNAME,
    dialect: process.env.DB_DIALECT,

})
try {
    connect.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    connect.error('Unable to connect to the database:', error);
}

module.exports = connect