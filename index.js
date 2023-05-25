const express = require('express')
require('dotenv').config()
const router = require('./route/index.js')
const app = express()



app.use(express.json())
app.use(router)
app.listen(8081, () => {
    console.log('Server Berjalan di Port : ' + 8081);
});