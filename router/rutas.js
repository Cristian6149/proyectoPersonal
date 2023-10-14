const express = require('express');
const route = express.Router();
const {setters,getters} = require('../controllers/users.js');
const { settersBalance }=require('../controllers/balance.js');
const { setterCuenta } = require('../controllers/cuentas.js');
const { setterInmuebles } = require('../controllers/inmueble.js')

setters(route)
getters(route)
settersBalance(route)
setterCuenta(route)
setterInmuebles(route)

module.exports= route;