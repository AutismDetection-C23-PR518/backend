const {
    createPool
} = require('mysql')
const db = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "autismdetection",
    port: 3306
})

db.getConnection((error, connection) => {
    if (error) {
        console.error('Database failed to connect')
        return
    }
    console.log('Database connected')
    connection.release()
})

module.exports = db