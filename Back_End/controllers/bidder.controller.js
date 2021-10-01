const express = require('express')
const path = require('path');
const fs = require('fs');

const knex = require('../utils/dbConnection')
const validator = require('../middlewares/validation/bidder.validate')
const accountModel = require('../models/account.model')

const router = express.Router()
const successCode = 0
const errorCode = 1

//* Bidder (Mến)
///- Đăng ký tài khoản (bider) => Authentication
///- Quản lý hồ sơ cá nhân (Bidder)
///- Xin được bán trong vòng 7 ngày

router.post('/allowSell', validator.updateAllowSellIn7Date, async(req, res) => {
    const { accIsUpgrade } = req.body
    const result = await accountModel.findById(accId)

    const accId = req.account.accId;

    if (result.length === 0) {
        return res.status(400).json({
            errorMessage: 'id not exists',
            statusCode: errorCode
        })
    }

    await knex('tbl_account').where({ acc_id: accId }).update({ acc_is_upgrade: accIsUpgrade})
    return res.status(200).json({
        data: true,
        statusCode: successCode
    })
})


module.exports = router;