const {
    Sequelize
} = require('sequelize')

const connect = new Sequelize('autismdetection', 'root', 'autism', {
            host: '34.101.147.2',
    dialect: 'mysql',
    connectTimeout: 300000
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