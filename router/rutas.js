const express = require('express');
const route = express.Router();
const {setters,getters} = require('../controllers/users.js');

setters(route)
getters(route)

module.exports= route;