const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')

const API = require('./api')
const unAuthorizeApi = require('./unAuthorizeApi')
const ADMIN = require('./admin')

router.use('/api', authentication.verifyToken, API)
router.use('/unauthorized-api', unAuthorizeApi)
router.use('/api/admin', authentication.verifyToken, ADMIN)


router.use((req, res, next) => {
    return res.status(400).json({
        errorMessage: 'API Url Not Found',
        statusCode: 1
    })
})

router.use((err, req, res, next) => {
    return res.status(500).json({
        err,
        statusCode: 1
    })
})

module.exports = router