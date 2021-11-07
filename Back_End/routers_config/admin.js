const express = require('express')

const API = express.Router()

const userController = require('../controllers/user.controller')
const productController = require('../controllers/product.controller')

API.use('/user', userController)
API.use('/product', productController)

module.exports = API