const express = require('express')
const router = express.Router()
const knex = require('../utils/dbConnection')
const moment = require('moment');
const validator = require('../middlewares/validation/bidProduct.validate')
const bidProduct = require('../models/bidProduct.model')
const mailService = require('../services/mailService')
const mailOptions = require('../template/mailOptions')

const successCode = 0
const errorCode = 1

router.post('/bid-product', validator.bidProduct, async (req, res) => {
    const { priceBid, prodId } = req.body
    //const accId = req.account['accId']
    const accId = 1
    let present = moment().format('YYYY-MM-DD HH:mm:ss')

    let regexPattern = /^\d+$/
    let resultInteger = regexPattern.test(priceBid);

    if (!resultInteger) {
        return res.status(400).json({
            errorMessage: 'Price bid must be integer !',
            statusCode: errorCode
        })
    }

    var product = await knex('tbl_product').join('tbl_account', 'acc_id', 'prod_seller_id').where("prod_id", prodId)
    var account = await knex('tbl_account').where("acc_id", accId)
    var historyCheck = await knex('tbl_product_history').where("his_account_id", accId).andWhere("his_status", 3).andWhere("his_product_id", prodId)

    if (historyCheck.length !== 0) {
        return res.status(400).json({
            errorMessage: 'You do not have the right to bid in this product !',
            statusCode: errorCode
        })
    }

    if (product.length === 0) {
        return res.status(400).json({
            errorMessage: 'Product id not exists !',
            statusCode: errorCode
        })
    }

    const sumLike = account[0].acc_like_bidder + account[0].acc_dis_like_bidder
    const result = (100 / sumLike) * account[0].acc_like_bidder

    if ((account[0].acc_like_bidder === null) || (account[0].acc_dis_like_bidder === null)) {
        await knex('tbl_product_history').insert({
            his_product_id: prodId,
            his_account_id: accId,
            his_price: priceBid,
            his_status: 2,
            his_created_date: present
        })

        return res.status(400).json({
            message: "You need to be confirmed by the seller",
            statusCode: errorCode
        })
    }

    else if (result < 80) {
        return res.status(400).json({
            errorMessage: "Your review score is less than 80%",
            statusCode: errorCode
        })
    }

    //-------================ bidding
    const resultBid = await bidProduct.bidding(priceBid, product, prodId, account)

    if (resultBid.statusCode === 0) {
        await knex('tbl_product_history').where("his_status", 1).andWhere("his_product_id", prodId).update({ his_status: 0 })

        await knex('tbl_product_history').insert({
            his_product_id: prodId,
            his_account_id: accId,
            his_price: priceBid,
            his_status: 1,
            his_created_date: present
        })

        return res.status(200).json({
            message: resultBid.message,
            statusCode: successCode
        })
    }

    await knex('tbl_product_history').insert({
        his_product_id: prodId,
        his_account_id: accId,
        his_price: priceBid,
        his_status: 0,
        his_created_date: present
    })

    return res.status(400).json({
        message: resultBid.message,
        statusCode: errorCode
    })
})

router.post('/history-product', validator.historyProduct, async (req, res) => {
    const { page, limit, prodId, status } = req.body
    const offset = limit * (page - 1)
    const accRole = 'Sel';

    var numberPage = 1;

    if (accRole === 'Sel') {
        var result
        if (status === 2 || status === 3) {
            numberPage = await knex.raw(`select count(distinct his_id) 
	        from tbl_product_history where his_product_id = ${prodId} and his_status = ${status}`)

            numberPage = Number(numberPage.rows[0].count)
            if (numberPage > limit) {
                numberPage = Math.ceil(numberPage / limit)
            }
            else {
                numberPage = 1
            }

            result = await knex.raw(`select * from tbl_product_history h join tbl_account a
                                on h.his_account_id = a.acc_id where h.his_product_id = ${prodId} and his_status = ${status}
								 order by h.his_created_date desc offset ${offset} limit ${limit}`)
        }
        else {
            numberPage = await knex.raw(`select count(distinct his_id) 
	        from tbl_product_history where his_product_id = ${prodId} and his_status != 2 and his_status != 3`)

            numberPage = Number(numberPage.rows[0].count)
            if (numberPage > limit) {
                numberPage = Math.ceil(numberPage / limit)
            }
            else {
                numberPage = 1
            }

            result = await knex.raw(`select * from tbl_product_history h join tbl_account a
                                on h.his_account_id = a.acc_id where h.his_product_id = ${prodId} and his_status != 2 and his_status != 3
								 order by h.his_created_date desc offset ${offset} limit ${limit}`)
        }

        result = result.rows

        var listHistory = []
        var index = 0

        while (index < result.length) {
            var fullName = result[index].acc_full_name
            let item = {
                his_id: result[index].his_id,
                his_created_date: result[index].his_created_date,
                acc_full_name: fullName,
                his_price: result[index].his_price
            }
            listHistory.push(item)
            index++
        }


        return res.status(200).json({
            numberOfPage: numberPage,
            historyList: listHistory,
            statusCode: successCode
        })
    }

    numberPage = await knex.raw(`select count(distinct his_id) 
	from tbl_product_history where his_product_id = ${prodId} and his_status != 2 and his_status != 3`)

    numberPage = Number(numberPage.rows[0].count)
    if (numberPage > limit) {
        numberPage = Math.ceil(numberPage / limit)
    }
    else {
        numberPage = 1
    }

    var result = await knex.raw(`select * from tbl_product_history h join tbl_account a
                                on h.his_account_id = a.acc_id where h.his_product_id = ${prodId} and his_status != 2 and his_status != 3
								 order by h.his_created_date desc offset ${offset} limit ${limit}`)

    result = result.rows

    var listHistory = []
    var index = 0

    while (index < result.length) {
        var name = result[index].acc_full_name.split(' ');
        var fullName = "****" + name[name.length - 1]
        let item = {
            his_id: result[index].his_id,
            his_created_date: result[index].his_created_date,
            acc_full_name: fullName,
            his_price: result[index].his_price
        }
        listHistory.push(item)
        index++
    }


    return res.status(200).json({
        numberOfPage: numberPage,
        historyList: listHistory,
        statusCode: successCode
    })
})

//0 ra giá thất bại, 1 ra giá thành công, 2 chờ xác nhận ra giá, 3 ra giá bị từ chối

router.post('/cancel-bid/:id', async (req, res) => {
    const { id } = req.params

    const hisProduct = await knex('tbl_product_history').where("his_id", id).andWhere("his_status", 2)

    if (hisProduct.length === 0) {
        return res.status(400).json({
            message: "History does not exist or status is not confirmed",
            statusCode: errorCode
        })
    }

    await knex('tbl_product_history').where("his_id", id).update({ his_status: 3 })

    const product = await knex('tbl_product').join('tbl_account', 'acc_id', 'prod_seller_id').where("prod_id", hisProduct[0].his_product_id)
    const account = await knex('tbl_account').where("acc_id", hisProduct[0].his_account_id)

    const checkmailCancel = await mailService.sendMailTran(mailOptions.notifyCancelToBidder(account, product, hisProduct[0].his_price))

    if (checkmailCancel === false) {
        return {
            message: "send email failed",
            statusCode: 2
        }
    }

    return res.status(200).json({
        statusCode: successCode
    })
})

router.post('/confirm-bid/:id', async (req, res) => {
    const { id } = req.params

    const hisProduct = await knex('tbl_product_history').where("his_id", id).andWhere("his_status", 2)

    if (hisProduct.length === 0) {
        return res.status(400).json({
            message: "History does not exist or status is not confirmed",
            statusCode: errorCode
        })
    }

    await knex('tbl_product_history').where("his_id", id).update({ his_status: 0 })

    const product = await knex('tbl_product').join('tbl_account', 'acc_id', 'prod_seller_id').where("prod_id", hisProduct[0].his_product_id)
    const account = await knex('tbl_account').where("acc_id", hisProduct[0].his_account_id)

    const resultBid = await bidProduct.bidding(hisProduct[0].his_price, product, product[0].prod_id, account)

    if (resultBid.statusCode === 0 || resultBid.statusCode === 1) {
        return res.status(200).json({
            statusCode: successCode
        })
    }

    return res.status(400).json({
        message: resultBid.message,
        statusCode: errorCode
    })
})

module.exports = router