const express = require('express')
    //const db = require('./config/Database.js')
const router = require('./route/index.js')
require('dotenv').config()

const app = express()
app.use(express.json())

// ;
// (async() => {
//     await db.sync()
// })()
app.use(router)
app.listen(9000, () => {
    console.log('Server Berjalan di Port : ' + 9000);
});