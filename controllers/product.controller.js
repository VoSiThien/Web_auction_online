const express = require('express')
const router = express.Router()
const knex = require('../utils/dbConnection')
const moment = require('moment');
//const imageService = require('../services/imageService')
//const imageValidator = require('../middlewares/validation/image.validate')
//const commonService = require('../services/commonService')
const prodValidation = require('../middlewares/validation/product.validate')
const productModel = require('../models/product.model')
const accountModel = require('../models/account.model')

const successCode = 0
const errorCode = 1


router.post('/list-by-cat', prodValidation.listByCategory, async (req, res) => {
	const { limit, page, catID } = req.body
	const offset = limit * (page - 1)

	var whereClause = 'and prod_status != 1 and prod_amount > 0'
	if (req.hasHeader) {
		if (req.account.accRole == 'ADM') {
			whereClause = ''
		}
	}

	var numberPage = await knex.raw(`select count(distinct tbl_product.prod_id) 
	from tbl_product 
	where tbl_product.prod_category_id = ${catID} ${whereClause}`)

	numberPage = Number(numberPage.rows[0].count)
	if (numberPage > limit) {
		numberPage = Math.ceil(numberPage / limit)
	}
	else {
		numberPage = 1
	}

	var result = await knex.raw(`with product as(
		select * from tbl_product
		where tbl_product.prod_category_id = ${catID} ${whereClause}
		order by prod_created_date desc
		offset ${offset}
		limit ${limit}
	)
	select pr.*,img.prod_img_data, cat.* from product pr 
	left join tbl_product_images img on img.prod_img_product_id = pr.prod_id 
	left join tbl_categories cat on cat.cate_id = pr.prod_category_id`)

	result = result.rows

	//process return list
	var prodList = []

	var index = 0
	var accountList = await accountModel.getActiveUser()
	while (index < result.length) {
		let prodObj = {
			prod_id: result[index].prod_id,
			prod_name: result[index].prod_name,
			prod_category_id: result[index].prod_category_id,
			prod_category_name: result[index].cate_name,
			prod_amount: result[index].prod_amount,
			prod_description: result[index].prod_description,
			prod_created_date: moment(result[index].prod_created_date).format('DD/MM/YYYY'),
			prod_updated_date: moment(result[index].prod_updated_date).format('DD/MM/YYYY') == 'Invalid date' ? moment(result[index].prod_created_date).format('DD/MM/YYYY') : moment(result[index].prod_updated_date).format('DD/MM/YYYY'),
			prod_price_starting: result[index].prod_price_starting,
            prod_price_current: result[index].prod_price_current,
            prod_price_highest: result[index].prod_price_highest,
			prod_price_step: result[index].prod_price_step,
			prod_end_date : result[index].prod_end_date,
			prod_auto_extend : result[index].prod_auto_extend,
			prod_seller_id : result[index].prod_seller_id
		}
		prodObj.prod_price_holder = accountList.find((priceHolder) => priceHolder.acc_id == result[index].prod_price_holder).acc_full_name
		prodObj.prod_seller = accountList.find((seller) => seller.acc_id == result[index].prod_seller_id).acc_full_name
		//get image
		let imageLink = result[index].prod_img_data
		//push the first record to prodLIst
		if (index === 0) {
			prodObj['images'] = imageLink
			prodList.push(prodObj)
		}
		//push the next first record to prod list
		if (result[index].prod_id !== prodList[prodList.length - 1].prod_id) {
			prodObj['images'] = imageLink
			prodList.push(prodObj)
		}
		index += 1
	}

	var numberOfProduct = await knex.raw(`select count(prod_id) from tbl_categories join tbl_product on tbl_product.prod_category_id = tbl_categories.cate_id where tbl_categories.cate_id = ${catID} ${whereClause}`)


	if (result) {
		return res.status(200).json({
			numberOfPage: numberPage,
			numberProduct: numberOfProduct.rows[0].count,
			listProduct: prodList,
			statusCode: successCode
		})
	}
	else {
		return res.status(200).json({
			listProduct: [],
			statusCode: errorCode
		})
	}

})

module.exports = router