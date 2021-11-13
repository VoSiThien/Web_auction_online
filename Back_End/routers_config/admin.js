const express = require('express')

const API = express.Router()

const userController = require('../controllers/user.controller')
const productController = require('../controllers/product.controller')
const categoryController = require('../controllers/categories.controller')

API.use('/user', userController)
API.use('/product', productController)
API.use('/category', categoryController)
module.exports = API