const express = require('express')

const API = express.Router()

const favoriteProductController = require('../controllers/favoriteProduct.controller')
const bidProductController = require('../controllers/bidProduct.controller')

API.use('/favorite-product', favoriteProductController)
API.use('/bid', bidProductController)

module.exports = API
