const express = require('express')

const API = express.Router()

const favoriteProductController = require('../controllers/favoriteProduct.controller')
const bidProductController = require('../controllers/bidProduct.controller')
const sellerController = require('../controllers/seller.controller')
const authController = require('../controllers/authentication.controller')
const bidderController = require('../controllers/bidder.controller')
const categoriesController = require('../controllers/adminCategories.controller')
const authentication = require('../middlewares/authentication')
const ADMIN = require('./admin')

API.use('/favorite-product', favoriteProductController)
API.use('/categories', categoriesController)
API.use('/bid', bidProductController)
API.use('/seller', sellerController)
API.use('/bidder', bidderController)

API.use('/admin', authentication.verifyToken, ADMIN)

module.exports = API