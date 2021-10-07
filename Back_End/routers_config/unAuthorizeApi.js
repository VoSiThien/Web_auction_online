const express = require('express')

const API = express.Router()

const homePageController = require('../controllers/homePage.controller')
const productController = require('../controllers/product.controller')
const authController = require('../controllers/authentication.controller')

API.use('/auth', authController)
API.use('/home', homePageController)
API.use('/product', productController)

module.exports = API