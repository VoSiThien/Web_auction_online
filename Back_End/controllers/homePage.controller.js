const express = require('express')
const router = express.Router()
const catModel = require('../models/categories.model')
const pagingService = require('../services/commonService')
const knex = require('../utils/dbConnection')
const errorCode = 1
const successCode = 0

router.get('/list-cat-home', async (req, res) => {
	
	const { page, limit } = req.query

	const listCategory = await catModel.getAll()
	const listAllChild = await catModel.getAllChild()
	const listAllParent = await catModel.getAllParent()

	var listHomePage = await catModel.getHomePageList(listCategory, listAllChild, listAllParent)

	listHomePage = pagingService.pagingation(listHomePage, page, limit)

	return res.status(200).json({
		paginationlist: listHomePage,
		statusCode: successCode
	})
})


router.post('/top-product-have-highest-price', async (req, res) => {
	const { limit, page } = req.body
	const offset = limit * (page - 1)
	
	var whereClause = ''
	/*
	var whereClause = 'where prod_status != 1 and prod_amount > 0'
	if (req.hasHeader) {
		if (req.account.accRole == 'ADM') {
			whereClause = ''
		}
	}
	*/
	var productHighestPriceList = await knex.raw(`select *
	from tbl_product pr left join tbl_categories cat on pr.prod_category_id = cat.cate_id
	${whereClause}
	order by pr.prod_price::integer desc
	offset 0
	limit 5`)
	
	return res.status(200).json({
		productAboutToEndList: productHighestPriceList.rows,
		statusCode: successCode
	})
})

module.exports = router