const knex = require('../utils/dbConnection')

const getAll = async () => {
	const info =  await knex('tbl_account')

	return info
}

const getByEmail = async (email) => {
	const info = await knex('tbl_account')
					.where({ acc_email: email })
	return info
}

const getActiveUserByEmail = async (email) => {
	const info = await knex('tbl_account')
		.where({ acc_email: email })
		.whereNot({ acc_status: 1})
	return info
}

const getActiveUser = async (email) => {
	const info = await knex('tbl_account')
		.whereNot({ acc_status: 1})
	return info
}

const getById = async (id) => {
	const info = await knex('tbl_account')
		.where({ acc_id: id })
	return info
}

const updateRefreshToken = async (accId, refreshToken) => {
	await knex('tbl_account')
		.where({ acc_id: accId })
		.update({ acc_refresh_token: refreshToken })
}

const isValidRefreshToken = async (accId, refreshToken) => {
	const checkRefreshToken = await knex('tbl_account')
									.where({ acc_id: accId, acc_refresh_token: refreshToken})

	if (checkRefreshToken.length === 0) {
		return false
	}
	
	return true
}

module.exports = {
	getByEmail,
	getById,
	getAll,
	getActiveUser,
	getActiveUserByEmail,
	updateRefreshToken,
	isValidRefreshToken
}
