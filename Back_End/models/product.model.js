const knex = require('../utils/dbConnection')


const getById = async (prodId) => {
	const info = await knex('tbl_product').where({ prod_id: prodId })

	return info
}

const getByCatId = async (cateId) => {
	const info = await knex('tbl_product').where({ prod_category_id: cateId })

	return info
}

const getAll = async () => {
	const info = await knex('tbl_product')

	return info
}

module.exports = {
	getById,
	getByCatId,
	getAll
}
