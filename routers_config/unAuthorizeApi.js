const express = require('express')

const API = express.Router()

const homePageController = require('../controllers/homePage.controller')


API.use('/home', homePageController)


module.exports = API
