const express = require('express')
const router = express.Router()
const knex = require('../utils/dbConnection')
const moment = require('moment');
const accValidation = require('../middlewares/validation/account.validate')
const accountModel = require('../models/account.model')
const successCode = 0
const errorCode = 1

router.post('/list-by-role', accValidation.listByRole, async (req, res) => {
	const { limit, page, role } = req.body
	const offset = limit * (page - 1)

	let whereRole = ''
	if(role){
		whereRole = ` and acc_role = '${role}' `
	}

	var total = await knex.raw(`select count(distinct acc_id) 
	from tbl_account 
	where true ${whereRole}
	and acc_status != 2`)

	var numPage = Number(total.rows[0].count)
	if (numPage > limit) {
		numPage = Math.ceil(numPage / limit)
	}
	else {
		numPage = 1
	}

	var result = await knex.raw(`with account as(
		select * from tbl_account
		where true ${whereRole}
		and acc_status != 2
		order by acc_created_date desc
		offset ${offset}
		limit ${limit}
	)
	select acc.* from account acc`)

	result = result.rows

	//process return list
	var accList = []

	var index = 0
	while (index < result.length) {
		let accObj = {
			accId: result[index].acc_id,
			accFullName: result[index].acc_full_name,
			accRole: result[index].acc_role,
			accAvatar: result[index].acc_avatar,
			accEmail: result[index].acc_email,
			accPhoneNumber: result[index].acc_phone_number,
			accIsUpgrade: result[index].acc_is_upgrade,
			accExpUpgrade: result[index].acc_exp_upgrade,
			accLikeBidder: result[index].acc_like_bidder,
			accDisLikeBidder: result[index].acc_dis_like_bidder,
			accLikeSeller: result[index].acc_like_seller,
			accDisLikeSeller: result[index].acc_dis_like_seller,
			accUpdatedDate: moment(result[index].acc_updated_date).format('DD/MM/YYYY') == 'Invalid date' ? 
			moment(result[index].acc_created_date).format('DD/MM/YYYY') : moment(result[index].acc_updated_date).format('DD/MM/YYYY'),
		}
		//push the next first record to prod list
		// if (result[index].acc_id !== accList[accList.length - 1].accId) {
			accList.push(accObj)
		// }
		index += 1
	}

	if (result) {
		return res.status(200).json({
			numPage: numPage,
			userList: accList,
			statusCode: successCode
		})
	}
	else {
		return res.status(400).json({
			numPage: numPage,
			userList: accList,
			statusCode: errorCode
		})
	}
})

router.post('/deleteUser', accValidation.deleteUser, async(req, res) => {
    const { accId } = req.body
    const now = new Date(Date.now())
    await knex('tbl_account').where({ acc_id: accId }).update({ acc_status: 2, acc_updated_date: now })
    return res.status(200).json({
        data: true,
        statusCode: successCode
    })
})

router.post('/acceptSel', accValidation.acceptSel, async(req, res) => {
    const { accId } = req.body
    const now = new Date(Date.now())
    var exp = new Date(Date.now())
	exp.setDate(exp.getDate() + 7);
	exp = moment(exp).format('DD/MM/YYYY')
    await knex('tbl_account').where({ acc_id: accId }).update({ acc_is_upgrade: 0, acc_role: 'SEL', acc_exp_upgrade: exp, acc_updated_date: now })
    return res.status(200).json({
        data: true,
        statusCode: successCode
    })
})

router.post('/rejectSel', accValidation.rejectSel, async(req, res) => {
    const { accId } = req.body
    const now = new Date(Date.now())
    await knex('tbl_account').where({ acc_id: accId }).update({ acc_is_upgrade: 0, acc_role: 'BID', acc_updated_date: now })
    return res.status(200).json({
        data: true,
        statusCode: successCode
    })
})

module.exports = router