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

router.post('/update-info', validator.updateInfo, async(req, res) => {
    const { email, fullName, birthday } = req.body
    let dateUpdate = new Date()

    // check unique email
    const verifying = await accountModel.findByEmail(email)

    if (verifying.length == 0) {
        return res.status(400).json({
            errorMessage: 'Email not existed',
            statusCode: errorCode
        })
    }

    const cusName = fullName || 'quý khách'

    // add account
    const account = {
        acc_email: email,
        acc_full_name: fullName || null,
        acc_birthday: birthday,
        acc_updated_date: dateUpdate
    }

    const newAccId = await knex('tbl_account')
        .returning('acc_id')
        .update(account)

    return res.status(200).json({
        statusCode: successCode,
        accId: newAccId[0]
    })
})

router.post('/update-assess', validator.updateInfo, async(req, res) => {
    const { accId, comment, isLike } = req.body
    let dateUpdate = new Date()

    // check unique email
    const verifying = await accountModel.findByEmail(email)

    if (verifying.length == 0) {
        return res.status(400).json({
            errorMessage: 'Email not existed',
            statusCode: errorCode
        })
    }

    const cusName = fullName || 'quý khách'

    // add account
    const account = {
        acc_email: email,
        acc_full_name: fullName || null,
        acc_birthday: birthday,
        acc_updated_date: dateUpdate
    }

    const newAccId = await knex('tbl_account')
        .returning('acc_id')
        .update(account)

    return res.status(200).json({
        statusCode: successCode,
        accId: newAccId[0]
    })
})

router.post('/get-list-favorite-product/:id', async (req, res) => {
	const {  page, limit, id } = req.params
    
    const offset = limit * (page - 1)	

	var numberPage = await knex.raw(`select count(distinct fav_id) 
	from tbl_favorite_product where fav_account_id = ${id}`)

	numberPage = Number(numberPage.rows[0].count)
	if (numberPage > limit) {
		numberPage = Math.ceil(numberPage / limit)
	}
	else {
		numberPage = 1
	}

	var result = await knex.raw(`select * from tbl_favorite_product h join tbl_product a
                                on h.fav_product_id = a.prod_id where h.fav_account_id = ${id}
								offset ${offset} limit ${limit}`)

	result = result.rows

    var listFavorite = []
	var index = 0

	while(index < result.length){
        var name = result[index].prod_name;
		let item = {
			prod_name: name,
			prod_price: result[index].prod_price,
            prod_price_current: result[index].prod_price_current,
            prod_price_starting: result[index].prod_price_starting,
            prod_price_highest: result[index].prod_price_highest
		}
		listFavorite.push(item)
		index++
	}
    
    return res.status(400).json({
        numberOfPage: numberPage,
		watchList: listFavorite,
        statusCode: errorCode
    })
})

router.post('/get-list-joining-product/:id', async (req, res) => {
	const {  page, limit, id } = req.params
    
    const offset = limit * (page - 1)	

	var numberPage = await knex.raw(`select count(distinct his_id) 
	from tbl_product_history where his_status = 2 and his_account_id = ${id}`)

	numberPage = Number(numberPage.rows[0].count)
	if (numberPage > limit) {
		numberPage = Math.ceil(numberPage / limit)
	}
	else {
		numberPage = 1
	}

	var result = await knex.raw(`select * from tbl_product_history h join tbl_product a
                                on h.his_product_id = a.prod_id where his_status = 2 and h.his_account_id = ${id}
								offset ${offset} limit ${limit}`)

	result = result.rows

    var listFavorite = []
	var index = 0

	while(index < result.length){
        var name = result[index].prod_name;
		let item = {
			prod_name: name,
			prod_price: result[index].prod_price,
            prod_price_current: result[index].prod_price_current,
            prod_price_starting: result[index].prod_price_starting,
            prod_price_highest: result[index].prod_price_highest
		}
		listFavorite.push(item)
		index++
	}
    
    return res.status(400).json({
        numberOfPage: numberPage,
		watchList: listFavorite,
        statusCode: errorCode
    })
})

router.post('/get-list-highestPrice-product-bidder/:id', async (req, res) => {
	const {  page, limit, id } = req.params
    
    const offset = limit * (page - 1)	

	var numberPage = await knex.raw(`select count(distinct his_id) 
	from tbl_product_history where his_status = 1 and his_account_id = ${id}`)

	numberPage = Number(numberPage.rows[0].count)
	if (numberPage > limit) {
		numberPage = Math.ceil(numberPage / limit)
	}
	else {
		numberPage = 1
	}

	var result = await knex.raw(`select * from tbl_product_history h join tbl_product a
                                on h.his_product_id = a.prod_id where his_status = 1 and h.his_account_id = ${id}
								offset ${offset} limit ${limit}`)

	result = result.rows

    var listFavorite = []
	var index = 0

	while(index < result.length){
        var name = result[index].prod_name;
		let item = {
			prod_name: name,
			prod_price: result[index].prod_price,
            prod_price_current: result[index].prod_price_current,
            prod_price_starting: result[index].prod_price_starting,
            prod_price_highest: result[index].prod_price_highest
		}
		listFavorite.push(item)
		index++
	}
    
    return res.status(400).json({
        numberOfPage: numberPage,
		watchList: listFavorite,
        statusCode: errorCode
    })
})

module.exports = router;