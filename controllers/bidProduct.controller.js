const express = require('express')
const router = express.Router()
const knex = require('../utils/dbConnection')
const moment = require('moment');
const validator = require('../middlewares/validation/bidProduct.validate')
const bidProduct = require('../models/bidProduct.model')
//const mailService = require('../services/mailService')
//const mailOptions = require('../template/mailOptions')

const successCode = 0
const errorCode = 1

router.post('/bid-product',validator.bidProduct ,async (req, res) => {
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

	const product = await knex('tbl_product').where("prod_id", prodId)
    const account = await knex('tbl_account').where("acc_id", accId)

    if(product.length === 0){
        return res.status(400).json({
			errorMessage: 'Product id not exists !',
			statusCode: errorCode
		})
    }

    const sumLike = account[0].acc_like_bidder + account[0].acc_dis_like_bidder
    const result = (100 / sumLike) * account[0].acc_like_bidder

    if((account[0].acc_like_bidder === null) || (account[0].acc_dis_like_bidder === null)){
        await knex('tbl_product_history').insert({
            his_product_id: prodId,
            hist_account_id: accId,
            his_price: priceBid,
            his_status: 2,
            his_created_date: present
        })

        return res.status(400).json({
            message: "You need to be confirmed by the seller",
            statusCode: errorCode
        })
    }
    
    else if(result < 80){
        return res.status(400).json({
            errorMessage: "Your review score is less than 80%",
            statusCode: errorCode
        })
    }
    
    //-------================ bidding
    const resultBid = await bidProduct.bidding(priceBid, product, prodId, accId)
    
    if(resultBid.statusCode === 0){
        await knex('tbl_product_history').where("his_status", 1).update({his_status: 0})

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

router.post('/history-product',validator.historyProduct ,async (req, res) => {
	const { page, limit, prodId } = req.body
	const offset = limit * (page - 1)	

	var numberPage = await knex.raw(`select count(distinct his_id) 
	from tbl_product_history where his_product_id = ${prodId}`)

	numberPage = Number(numberPage.rows[0].count)
	if (numberPage > limit) {
		numberPage = Math.ceil(numberPage / limit)
	}
	else {
		numberPage = 1
	}

	var result = await knex.raw(`select * from tbl_product_history h join tbl_account a
                                on h.his_account_id = a.acc_id where h.his_product_id = ${prodId}
								 order by h.his_created_date desc offset ${offset} limit ${limit}`)

	result = result.rows

	var listHistory = []
	var index = 0

	while(index < result.length){
        var name = result[index].acc_full_name.split(' ');
        var fullName = "*****" + name[name.length-1]
		let item = {
			his_created_date: result[index].his_created_date,
			acc_full_name: fullName,
			his_price: result[index].his_price
		}
		listHistory.push(item)
		index++
	}
	

	return res.status(200).json({
		numberOfPage: numberPage,
		watchList: listHistory,
		statusCode: successCode
	})
})

module.exports = router