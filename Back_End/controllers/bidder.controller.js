const express = require('express')
const path = require('path');
const fs = require('fs');

const knex = require('../utils/dbConnection')
const validator = require('../middlewares/validation/bidder.validate')
const accountModel = require('../models/account.model')
const bcrypt = require('bcrypt')
const moment = require('moment');

const router = express.Router()
const successCode = 0
const errorCode = 1

//* Bidder (Mến)
///- Đăng ký tài khoản (bider) => Authentication
///- Quản lý hồ sơ cá nhân (Bidder)
///- Xin được bán trong vòng 7 ngày

router.post('/allowSell', validator.updateAllowSellIn7Date, async (req, res) => {
	const { accIsUpgrade } = req.body
	const accId = req.account.accId;
	const result = await accountModel.findById(accId)

	if (req.account.accRole !== 'BID') {
		return res.status(400).json({
			errorMessage: 'User phải là Bidder mới có thể upgrade',
			statusCode: errorCode
		})
	}



	if (result.length === 0) {
		return res.status(400).json({
			errorMessage: 'Account ID không tồn tại',
			statusCode: errorCode
		})
	}

	if (result[0].acc_is_upgrade !== 0) {
		return res.status(400).json({
			errorMessage: 'User đang chờ để upgrade!',
			statusCode: errorCode
		})
	}

	await knex('tbl_account').where({ acc_id: accId }).update({ acc_is_upgrade: accIsUpgrade })

	return res.status(200).json({
		data: true,
		statusCode: successCode
	})
})

router.post('/update-info', validator.updateInfo, async (req, res) => {
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

router.post('/get-list-favorite-product', async (req, res) => {
	const { page, limit } = req.body
	const id = req.account['accId']

	const offset = limit * (page - 1)

	var numberPage = await knex.raw(`select distinct fav_id
	from tbl_favorite_product where fav_account_id = ${id}`)

	if (numberPage.rows.length === 0) {
		numberPage = 1
	}
	else {
		numberPage = Number(numberPage.rows.length)
		if (numberPage > limit) {
			numberPage = Math.ceil(numberPage / limit)
		}
		else {
			numberPage = 1
		}
	}

	var result = await knex.raw(`select * from tbl_favorite_product h join tbl_product a
                                on h.fav_product_id = a.prod_id where h.fav_account_id = ${id}
								offset ${offset} limit ${limit}`)

	result = result.rows


	var listFavorite = []
	var index = 0

	while (index < result.length) {
		var name = result[index].prod_name;
		let item = {
			fav_id: result[index].fav_id,
			prod_id: result[index].prod_id,
			prod_name: name,
			prod_price: result[index].prod_price,
			prod_price_current: result[index].prod_price_current,
			prod_price_starting: result[index].prod_price_starting,
			prod_created_date: result[index].prod_created_date
		}
		listFavorite.push(item)
		index++
	}

	return res.status(200).json({
		numberOfPage: numberPage,
		watchList: listFavorite,
		statusCode: successCode
	})
})

router.post('/get-list-joining-product', async (req, res) => {
	const { page, limit } = req.body
	const id = req.account['accId']

	const offset = limit * (page - 1)

	var numberPage = await knex.raw(`select distinct his_product_id
	from tbl_product_history where his_status != 3 and his_account_id = ${id}`)

	if (numberPage.rows.length === 0) {
		numberPage = 1
	}
	else {
		numberPage = Number(numberPage.rows.length)
		if (numberPage > limit) {
			numberPage = Math.ceil(numberPage / limit)
		}
		else {
			numberPage = 1
		}
	}

	var result = await knex.raw(`select distinct h.his_product_id, p.prod_name, a.acc_full_name from tbl_product_history h
								join tbl_product p on p.prod_id = h.his_product_id
								left join tbl_account a on a.acc_id = p.prod_price_holder
								where his_status != 3 and h.his_account_id = ${id}
								offset ${offset} limit ${limit}`)

	result = result.rows


	return res.status(200).json({
		numberOfPage: numberPage,
		joiningList: result,
		statusCode: successCode
	})
})

router.post('/get-list-highestPrice-product-bidder', async (req, res) => {
	const { page, limit } = req.body
	const id = req.account['accId']

	const offset = limit * (page - 1)

	var numberPage = await knex.raw(`select prod_id from tbl_product where prod_price_holder = ${id}
									and to_timestamp(prod_end_date, 'YYYY/MM/DD HH24:MI:SS') < CURRENT_TIMESTAMP`)

	if (numberPage.rows.length === 0) {
		numberPage = 1
	}
	else {
		numberPage = Number(numberPage.rows.length)
		if (numberPage > limit) {
			numberPage = Math.ceil(numberPage / limit)
		}
		else {
			numberPage = 1
		}
	}

	var result = await knex.raw(`select * from tbl_product where prod_price_holder = ${id}
								and to_timestamp(prod_end_date, 'YYYY/MM/DD HH24:MI:SS') < CURRENT_TIMESTAMP
								offset ${offset} limit ${limit}`)

	result = result.rows


	return res.status(200).json({
		numberOfPage: numberPage,
		highestPrice: result,
		statusCode: successCode
	})
})

router.post('/add-comment-seller', async (req, res) => {
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
	const { page, limit, id } = req.params

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

	while (index < result.length) {
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

router.post('/add-comment', async (req, res) => {
	const { Comment, Status, prodId } = req.body
	const id = req.account['accId']

	const product = await knex('tbl_product').where('prod_id', prodId)
	if (product.length === 0) {
		return res.status(400).json({
			errorMessage: 'Sản phẩm không tồn tại',
			statusCode: errorCode
		})
	}

	const comment = await knex('tbl_account_comments').where('acom_product_id', prodId).andWhere('acom_assessor', id)
	if (comment.length !== 0) {
		return res.status(400).json({
			errorMessage: 'Sản phẩm đã được đánh giá, vui lòng không đánh giá lại',
			statusCode: errorCode
		})
	}

	let dateCreate = new Date()
	const Comments = {
		acom_note: Comment,
		acom_assessor: id,
		acom_receiver: product[0].prod_seller_id,
		acom_product_id: prodId,
		acom_status_rating: Status,
		acom_created_date: moment(dateCreate).format('YYYY-MM-DD HH:mm:ss')
	}

	const newAccId = await knex('tbl_account_comments')
		.returning('acom_id')
		.insert(Comments)
	const acc = await knex('tbl_account').where('acc_id', product[0].prod_seller_id)
	if (acc[0].acc_like_seller === null || acc[0].acc_dis_like_seller === null) {
		await knex.raw(`update tbl_account set acc_like_seller = 0, acc_dis_like_seller = 0 where acc_id = ${product[0].prod_seller_id}`)
	}
	if (Status === 0) {
		await knex.raw(`update tbl_account set acc_like_seller = acc_like_seller + 1 where acc_id = ${product[0].prod_seller_id}`)
	}
	else {
		await knex.raw(`update tbl_account set acc_dis_like_seller = acc_dis_like_seller + 1 where acc_id = ${product[0].prod_seller_id}`)
	}


	return res.status(200).json({
		statusCode: successCode,
		acoms_id: newAccId[0]
	})
})

router.post('/get-list-comment', async (req, res) => {
	const { page, limit } = req.body
	const id = req.account['accId']

	const offset = limit * (page - 1)

	var numberPage = await knex.raw(`select count(c.acom_id) from tbl_account_comments c
									join tbl_product p on c.acom_product_id = p.prod_id
									join tbl_account a on a.acc_id = c.acom_assessor where c.acom_receiver = ${id}`)

	numberPage = Number(numberPage.rows[0].count)
	if (numberPage > limit) {
		numberPage = Math.ceil(numberPage / limit)
	}
	else {
		numberPage = 1
	}

	var result = await knex.raw(`select * from tbl_account_comments c
								join tbl_product p on c.acom_product_id = p.prod_id
								join tbl_account a on a.acc_id = c.acom_assessor where c.acom_receiver = ${id}
								offset ${offset} limit ${limit}`)

	var rating = await knex('tbl_account').where("acc_id", id)

	result = result.rows

	var listComment = []
	var index = 0

	while (index < result.length) {
		var status_rating = 'Like'

		if (result[index].acom_status_rating === 1) {
			status_rating = 'Dis Like'
		}
		if (result[index].acom_status_rating === 2) {
			status_rating = 'Hủy giao dịch'
		}
		let item = {
			acom_id: result[index].acom_id,
			acc_full_name: result[index].acc_full_name,
			prod_name: result[index].prod_name,
			acom_note: result[index].acom_note,
			acc_status_rating: status_rating,
			acom_created_date: result[index].acom_created_date,
			acom_updated_date: result[index].acom_updated_date
		}
		listComment.push(item)
		index++
	}

	return res.status(200).json({
		numberOfPage: numberPage,
		commentList: listComment,
		rating: rating,
		statusCode: successCode
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

router.post('/favorite-product/add', validator.addFavoriteProduct, async (req, res) => {
	const { prodId } = req.body
	const accId = req.account['accId']
	//const accId = 1

	const checkProduct = await knex('tbl_product').where("prod_id", prodId)
	const checkProductUnique = await knex('tbl_favorite_product').where("fav_account_id", accId).andWhere("fav_product_id", prodId)

	if (checkProduct.length === 0) {
		return res.status(400).json({
			errorMessage: "Sản phẩm không tồn tại !",
			statusCode: errorCode
		})
	}

	if (checkProductUnique.length !== 0) {
		return res.status(400).json({
			errorMessage: "Sản phẩn đã tồn tại trong danh sách yêu thích của bạn !",
			statusCode: errorCode
		})
	}

	await knex('tbl_favorite_product').insert({
		fav_product_id: prodId,
		fav_account_id: accId
	})

	return res.status(200).json({
		statusCode: successCode
	})
})

router.post('/favorite-product/delete/:id', async (req, res) => {
	const { id } = req.params

	var favorite = await knex('tbl_favorite_product')
		.where('fav_id', id)

	if (favorite.length === 0) {
		return res.status(400).json({
			errorMessage: 'Id sản phẩm yêu thích không tồn tại !',
			statusCode: errorCode
		})
	}
	await knex('tbl_favorite_product').where("fav_id", id).del()

	return res.status(200).json({
		statusCode: successCode
	})
})

router.get('/profile', async (req, res) => {
	const accId = req.account['accId']
	var user = await knex('tbl_account').where({ acc_id: accId })
	return res.status(200).json({
		data: user[0],
		statusCode: successCode
	})
})

router.post('/update-profile', validator.updateProfile, async (req, res) => {
	const { email, fullName, birthday, phoneNumber } = req.body
	let dateUpdate = new Date()
	const accId = req.account['accId']

	// check unique email
	const verifying = await accountModel.findByEmailAndNot(email, accId)

	if (verifying.length !== 0) {
		return res.status(400).json({
			errorMessage: 'Email đã tồn tại',
			statusCode: errorCode
		})
	}

	// add account
	const account = {
		acc_email: email,
		acc_full_name: fullName || null,
		acc_birthday: birthday,
		acc_updated_date: moment(dateUpdate).format('YYYY-MM-DD HH:mm:ss'),
		acc_phone_number: phoneNumber
	}

	await knex('tbl_account')
		.where("acc_id", accId)
		.returning('acc_id')
		.update(account)

	return res.status(200).json({
		statusCode: successCode,
		message: "cập nhật thành công"
	})
})

router.post('/update-password', validator.updatePassword, async (req, res) => {
	const { newPassword, oldPassword } = req.body
	const accId = req.account['accId']
	let dateUpdate = new Date()

	// check unique email
	const result = await accountModel.findById(req.account.accId)

	if (!bcrypt.compareSync(oldPassword, result[0].acc_password)) {
		return res.status(400).json({
			errorMessage: 'Mật khẩu cũ không chính xác',
			statusCode: errorCode
		})
	}

	const hashPassword = bcrypt.hashSync(newPassword, 3)

	// add account
	const account = {
		acc_password: hashPassword,
		acc_updated_date: moment(dateUpdate).format('YYYY-MM-DD HH:mm:ss')
	}

	await knex('tbl_account')
		.where("acc_id", accId)
		.returning('acc_id')
		.update(account)

	return res.status(200).json({
		statusCode: successCode,
		message: "đổi mật khẩu thành công"
	})
})

module.exports = router;