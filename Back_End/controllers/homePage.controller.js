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

	//listHomePage = pagingService.pagingation(listHomePage, page, limit)

	return res.status(200).json({
		paginationlist: listHomePage,
		statusCode: successCode
	})
})

router.post('/top-product-about-to-end', async (req, res) => {
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
	// var productAboutToEndList = await knex.raw(`select *
	// from tbl_product pr left join tbl_categories cat on pr.prod_category_id = cat.cate_id
	// where to_timestamp(prod_end_date, 'YYYY/MM/DD HH24:MI:SS') > CURRENT_TIMESTAMP
	// order by pr.prod_end_date::timestamp desc
	// offset 0
	// limit 5`)

	var productAboutToEndList = await knex.raw(`select  count(h.his_id) number_bid, ac.acc_full_name, pr.prod_id, pr.prod_name, pr.prod_description,
	pr.prod_main_image, pr.prod_price, pr.prod_end_date,
	pr.prod_price_current, pr.prod_created_date, cat.cate_name
	from ((tbl_product pr left join tbl_categories cat on pr.prod_category_id = cat.cate_id)
	join tbl_product_history h on h.his_product_id = pr.prod_id)
	left join tbl_account ac on ac.acc_id = pr.prod_price_holder
	where h.his_status != 2 and to_timestamp(prod_end_date, 'YYYY/MM/DD HH24:MI:SS') > CURRENT_TIMESTAMP
	group by ac.acc_full_name, pr.prod_id, pr.prod_name, pr.prod_description,
	pr.prod_main_image, pr.prod_price, pr.prod_end_date,
	pr.prod_price_current, pr.prod_created_date, cat.cate_name
	order by pr.prod_end_date::timestamp ASC
	offset 0
	limit 5`)
	
	return res.status(200).json({
		productAboutToEndList: productAboutToEndList.rows,
		statusCode: successCode
	})
})

router.post('/top-product-have-highest-price', async (req, res) => {
	const { limit, page } = req.body
	const offset = limit * (page - 1)
	
	var whereClause = 'where h.his_status != 2'
	/*
	var whereClause = 'where prod_status != 1 and prod_amount > 0'
	if (req.hasHeader) {
		if (req.account.accRole == 'ADM') {
			whereClause = ''
		}
	}
	*/
	var productHighestPriceList = await knex.raw(`select count(h.his_id) number_bid, ac.acc_full_name, pr.prod_id, pr.prod_name, pr.prod_description,
	pr.prod_main_image, pr.prod_price, pr.prod_end_date,
	pr.prod_price_current, pr.prod_created_date, cat.cate_name
	from ((tbl_product pr left join tbl_categories cat on pr.prod_category_id = cat.cate_id)
	join tbl_product_history h on h.his_product_id = pr.prod_id)
	left join tbl_account ac on ac.acc_id = pr.prod_price_holder
	${whereClause}
	group by ac.acc_full_name, pr.prod_id, pr.prod_name, pr.prod_description,
	pr.prod_main_image, pr.prod_price, pr.prod_end_date,
	pr.prod_price_current, pr.prod_created_date, cat.cate_name
	order by pr.prod_price::integer desc
	offset 0
	limit 5`)
	
	return res.status(200).json({
		productHighestPriceList: productHighestPriceList.rows,
		statusCode: successCode
	})
})

router.post('/top-product-have-highest-bids', async (req, res) => {
	const { limit, page } = req.body
	const offset = limit * (page - 1)
	
	var whereClause = 'where h.his_status != 2'
	/*
	var whereClause = 'where prod_status != 1 and prod_amount > 0'
	if (req.hasHeader) {
		if (req.account.accRole == 'ADM') {
			whereClause = ''
		}
	}
	*/
	var productHighestBidList = await knex.raw(`select count(h.his_id) number_bid, ac.acc_full_name, pr.prod_id, pr.prod_name, pr.prod_description,
	pr.prod_main_image, pr.prod_price, pr.prod_end_date,
	pr.prod_price_current, pr.prod_created_date, cat.cate_name
	from ((tbl_product pr left join tbl_categories cat on pr.prod_category_id = cat.cate_id)
	join tbl_product_history h on h.his_product_id = pr.prod_id)
	left join tbl_account ac on ac.acc_id = pr.prod_price_holder
	${whereClause}
	group by ac.acc_full_name, pr.prod_id, pr.prod_name, pr.prod_description,
	pr.prod_main_image, pr.prod_price, pr.prod_end_date,
	pr.prod_price_current, pr.prod_created_date, cat.cate_name
	order by count(h.his_id) desc
	offset 0
	limit 5`)
	
	return res.status(200).json({
		productHighestBidList: productHighestBidList.rows,
		statusCode: successCode
	})
})


module.exports = router