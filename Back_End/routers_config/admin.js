const express = require('express')

const API = express.Router()

const userController = require('../controllers/user.controller')

API.use('/user', userController)

module.exports = API