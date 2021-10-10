const express = require('express')

const router = express.Router()
const knex = require('../utils/dbConnection')
const validator = require('../middlewares/validation/favoriteProduct.validate')

const successCode = 0
const errorCode = 1

router.post('/list', validator.listFavoriteProduct, async (req, res) => {
	const { page, limit } = req.body
	const offset = limit * (page - 1)
	//const accId = req.account['accId']
	const accId = 2

	if (page < 1 || limit < 1) {
		return res.status(400).json({
			errorMessage: "limit and page parameter is not valid",
			statusCode: errorCode
		})
	}

	var numberPage = await knex.raw(`select count(distinct tbl_favorite_product.fav_product_id) 
	from tbl_favorite_product where fav_account_id = ${accId}`)


	numberPage = Number(numberPage.rows[0].count)
	if (numberPage > limit) {
		numberPage = Math.ceil(numberPage / limit)
	}
	else {
		numberPage = 1
	}

	var result = await knex.raw(`select * from tbl_favorite_product f join tbl_product p
                                on f.fav_product_id = p.prod_id where f.fav_account_id = ${accId}
								 order by p.prod_id desc offset ${offset} limit ${limit}`)

	result = result.rows

	var prodList = []
	var index = 0

	while(index < result.length){
		let probItem = {
			fav_id: result[index].fav_id,
			prod_id: result[index].prod_id,
			prod_name: result[index].prod_name,
			prod_price: result[index].prod_price,
			prod_description: result[index].prod_description,
			prod_created_date: result[index].prod_created_date,
			prod_end_date: result[index].prod_end_date

		}
		prodList.push(probItem)
		index++
	}
	

	return res.status(200).json({
		numberOfPage: numberPage,
		watchList: prodList,
		statusCode: successCode
	})
})


router.post('/add', validator.addFavoriteProduct, async (req, res) => {
	const { prodId } = req.body
	//const accId = req.account['accId']
	const accId = 1

	const checkProduct = await knex('tbl_product').where("prod_id", prodId)
	const checkProductUnique = await knex('tbl_favorite_product').where("fav_account_id", accId).andWhere("fav_product_id", prodId)

	if(checkProduct.length === 0){
		return res.status(400).json({
			errorMessage: "Sản phẩm không tồn tại !",
			statusCode: errorCode
		})
	}

	if(checkProductUnique.length !== 0){
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

router.post('/delete/:id', async (req, res) => {
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

module.exports = router