const express = require('express')

const API = express.Router()

const userController = require('../controllers/user.controller')
const categoryController = require('../controllers/categories.controller')
API.use('/user', userController)
API.use('/category', categoryController)
module.exports = API