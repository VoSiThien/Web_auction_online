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

// lấy thông tin bidder để update

router.post('/allowSell', validator.updateAllowSellIn7Date, async(req, res) => {
    const { accIsUpgrade } = req.body

    const accId = req.account.accId;
    const result = await accountModel.findById(accId)
    
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

router.post('/add-comment-seller', async(req, res) => {
    const { accBider, accSeller, accIsLike, accComment } = req.body
    
    const result = await accountModel.findById(accBider)
    if (result.length === 0) {
        return res.status(400).json({
            errorMessage: 'id not exists Bidder',
            statusCode: errorCode
        })
    }

    result = await accountModel.findById(accSeller)
    if (result.length === 0) {
        return res.status(400).json({
            errorMessage: 'id not exists Seller',
            statusCode: errorCode
        })
    }

    let dateCreate = new Date()
    const sellerComBidder = {
        acbider_id: accBider,
        acseller_id: accSeller,
        acbider_note: accComment || null,
        accom_created_date: dateCreate,
        accom_update_date: dateCreate,
        ac_islike: accIsLike
    }

    const newAccId = await knex('tbl_account_comments_seller')
        .returning('acoms_id')
        .insert(sellerComBidder)

    await knex.raw(`update tbl_account set acc_rating_score = acc_rating_score + ${accIsLike == true ? 1 : -1} where acc_id = ${accSeller}`)

    return res.status(200).json({
        statusCode: successCode,
        acoms_id: newAccId[0]
    })
})

router.post('/get-list-comment-seller/:id', async (req, res) => {
	const {  page, limit, id } = req.params
    
    const offset = limit * (page - 1)	

	var numberPage = await knex.raw(`SELECT count(acoms_id)
        FROM public.tbl_account_comments_seller where acseller_id = ${id}`)

	numberPage = Number(numberPage.rows[0].count)
	if (numberPage > limit) {
		numberPage = Math.ceil(numberPage / limit)
	}
	else {
		numberPage = 1
	}

	var result = await knex.raw(`SELECT acoms_id, ta.acc_full_name as acc_full_name_Bidder, ta2.acc_full_name as acc_full_name_Seller, ac_islike, acbider_note, accom_created_date, accom_update_date
                                FROM public.tbl_account_comments_seller ac
                                left join public.tbl_account ta on ta.acc_id = ac.acbider_id
                                left join public.tbl_account ta2 on ta2.acc_id = ac.acseller_id where ac.acseller_id = ${id}
								offset ${offset} limit ${limit}`)

	result = result.rows

    var listFavorite = []
	var index = 0

	while(index < result.length){
		let item = {
			acoms_id: result[index].acoms_id,
			acc_full_name_Bidder: result[index].acc_full_name_Bidder,
            acc_full_name_Seller: result[index].acc_full_name_Seller,
            ac_islike: result[index].ac_islike,
            acbider_note: result[index].acbider_note,
            accom_created_date: result[index].accom_created_date,
            accom_update_date: result[index].accom_update_date
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

// router.post('/update-comment-seller', async(req, res) => {
//     const { acoms_id, accIsLike, accComment } = req.body
    
//     var result = await knex.raw(`select count(*) from tbl_account_comments_seller where acoms_id = ${id}`)
//     if (result.length === 0) {
//         return res.status(400).json({
//             errorMessage: 'id not exists',
//             statusCode: errorCode
//         })
//     }

//     let dateCreate = new Date()
//     const sellerComBidder = {
//         acoms_id: acoms_id,
//         acbider_note: accComment || null,
//         accom_update_date: dateCreate,
//         ac_islike: accIsLike
//     }

//     const newAccId = await knex('tbl_account_comments_seller')
//         .returning('acoms_id')
//         .update(sellerComBidder)

//     await knex.raw(`update tbl_account set acc_rating_score = acc_rating_score + ${accIsLike == true ? 1 : -1} where acc_id = ${accSeller}`)

//     return res.status(200).json({
//         statusCode: successCode,
//         acoms_id: newAccId[0]
//     })
// })

module.exports = router;