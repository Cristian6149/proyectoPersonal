const express = require('express');
const dotenv = require('dotenv')
const route = require('./router/rutas.js');
const cookieParser = require('cookie-parser');
dotenv.config({path:'./config/config.env'})
require('./db/db.js')

const app = express();
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

app.use('/api',route)

app.listen(process.env.PORT);