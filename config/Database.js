const {
    Sequelize
} = require('sequelize')

const connect = new Sequelize('detectionautism', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    //port: 3306,
    // username: '',
    // password: '',
    // database:''
})
try {
    connect.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    connect.error('Unable to connect to the database:', error);
}

module.exports = connect