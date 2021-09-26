const express = require('express')

const API = express.Router()

const categoriesController = require('../controllers/categories.controller')


API.use('/categories', categoriesController)


module.exports = API
