const express = require('express')
const router = express.Router()
const knex = require('../utils/dbConnection')
const moment = require('moment');
//const imageService = require('../services/imageService')
//const imageValidator = require('../middlewares/validation/image.validate')
//const commonService = require('../services/commonService')
const prodValidation = require('../middlewares/validation/product.validate')
const productModel = require('../models/product.model')
const accountModel = require('../models/account.model');
const { _ } = require('ajv');

const successCode = 0
const errorCode = 1

//will update alter
router.post('/list-by-cat', prodValidation.listByCategory, async (req, res) => {
	const { limit, page, catID } = req.body
	const offset = limit * (page - 1)
	/*
	var whereClause = 'and prod_status != 1 and prod_amount > 0'
	if (req.hasHeader) {
		if (req.account.accRole == 'ADM') {
			whereClause = ''
		}
	}
*/
	var numberOfProduct = await knex.raw(`select count(distinct tbl_product.prod_id) 
	from tbl_product 
	where tbl_product.prod_category_id = ${catID}`)

	numberOfProduct = Number(numberOfProduct.rows[0].count)
	var numberOfPage = 1
	if (numberOfProduct > limit) {
		numberOfPage = Math.ceil(numberOfProduct / limit)
	}
	var whereClause = `where pr.prod_category_id = ${catID} and pr.prod_status != 2`

	var result = await knex.raw(`
	select count(h.his_id) number_bid, pr.*, cat.cate_name
	from ((tbl_product pr left join tbl_categories cat on pr.prod_category_id = cat.cate_id)
	left join tbl_product_history h on h.his_product_id = pr.prod_id)
	left join tbl_account ac on ac.acc_id = pr.prod_price_holder
	${whereClause}
	group by ac.acc_full_name, pr.prod_id, pr.prod_name, pr.prod_description,
	pr.prod_main_image, pr.prod_price, pr.prod_end_date,
	pr.prod_price_current, pr.prod_created_date, cat.cate_name
	order by pr.prod_price::integer desc
	offset ${offset}
	limit ${limit}`)

	result = result.rows
	
	//process return list
	var prodList = []
	var index = 0
	var accountList = await accountModel.findActiveUser()
	while (index < result.length) {
		let prodObj = result[index]

		if (prodObj.prod_price_holder != null)
			prodObj.prod_price_holder = accountList.find((priceHolder) => priceHolder.acc_id == result[index].prod_price_holder).acc_full_name
		if (prodObj.prod_seller_id != null)
			prodObj.prod_seller_id = accountList.find((seller) => seller.acc_id == result[index].prod_seller_id).acc_full_name
		prodList.push(prodObj)
		index++
	}
	

	return res.status(200).json({
		numberOfPage: numberOfPage,
		numberProduct: numberOfProduct,
		listProduct: prodList,
		statusCode: successCode
	})
})


router.post('/list-same-cat', prodValidation.listByCategory, async (req, res) => {
	const { limit, page, catID, prodID } = req.body

	const offset = limit * (page - 1)
	/*
	var whereClause = 'and prod_status != 1 and prod_amount > 0'
	if (req.hasHeader) {
		if (req.account.accRole == 'ADM') {
			whereClause = ''
		}
	}
*/
	var numberOfProduct = await knex.raw(`select count(distinct tbl_product.prod_id) 
	from tbl_product 
	where tbl_product.prod_category_id = ${catID}`)

	numberOfProduct = Number(numberOfProduct.rows[0].count)
	var numberOfPage = 1
	if (numberOfProduct > limit) {
		numberOfPage = Math.ceil(numberOfProduct / limit)
	}

	var result = await knex.raw(`
	select pr.*, cat.* 
	from tbl_product pr left join tbl_categories cat on cat.cate_id = pr.prod_category_id
	where pr.prod_category_id = ${catID} and pr.prod_id != ${prodID} and pr.prod_status != 2
	order by prod_created_date desc
	offset ${offset}
	limit ${limit}`)

	result = result.rows
	//process return list
	var prodList = []
	var index = 0
	var accountList = await accountModel.findActiveUser()
	while (index < result.length) {
		let prodObj = {
			prod_id: result[index].prod_id,
			prod_name: result[index].prod_name,
			prod_category_id: result[index].prod_category_id,
			prod_category_name: result[index].cate_name,
			prod_amount: result[index].prod_amount,
			prod_description: result[index].prod_description,
			prod_created_date: moment(result[index].prod_created_date).format('DD/MM/YYYY HH:mm:ss'),
			prod_updated_date: moment(result[index].prod_updated_date).format('DD/MM/YYYY HH:mm:ss') == 'Invalid date' ? moment(result[index].prod_created_date).format('DD/MM/YYYY') : moment(result[index].prod_updated_date).format('DD/MM/YYYY'),
			prod_price_starting: result[index].prod_price_starting,
			prod_price_current: result[index].prod_price_current,
			prod_price_highest: result[index].prod_price_highest,
			prod_price_step: result[index].prod_price_step,
			prod_end_date: moment(result[index].prod_end_date).format('DD/MM/YYYY HH:mm:ss'),
			prod_auto_extend: result[index].prod_auto_extend,
			prod_seller_id: result[index].prod_seller_id,
			prod_main_image: result[index].prod_main_image,
			prod_cate_name: result[index].cate_name,
			prod_price_holder: result[index].prod_price_holder
		}

		if (prodObj.prod_price_holder != null)
			prodObj.prod_price_holder = accountList.find((priceHolder) => priceHolder.acc_id == result[index].prod_price_holder).acc_full_name
		if (prodObj.prod_seller_id != null)
			prodObj.prod_seller_id = accountList.find((seller) => seller.acc_id == result[index].prod_seller_id).acc_full_name


		prodList.push(prodObj)
		index++
	}

	return res.status(200).json({
		numberOfPage: numberOfPage,
		numberProduct: numberOfProduct,
		listProduct: prodList,
		statusCode: successCode
	})
})

router.post('/search', prodValidation.productSearching, async (req, res) => {
	var { searchKey, limit, page, orderBy, filterField, AndOrCondition } = req.body
	var offset = limit * (page - 1)

	// handle searching string
	searchKey = searchKey.trim()
	searchKey = searchKey.replace(/\s+/g, ' ')
	searchKey = searchKey.split(' ');
	var dbSearchKey = ''
	for (i = 0; i < searchKey.length; i++) {
		if (i < searchKey.length - 1) {
			dbSearchKey += searchKey[i] + '&'
		}
		else {
			dbSearchKey += searchKey[i]
		}

	}


	//set default search condition
	if (filterField == undefined || filterField == 'prod_created_date') {
		filterField = 'prod_created_date::timestamp'

	}
	else if (filterField == 'prod_price') {
		filterField = 'prod_price::integer'
	}
	if (orderBy == undefined) {
		orderBy = 'asc'
	}

	//get number of product and number of page
	var numberOfProduct = await knex.raw(`SELECT count(pr.prod_id)
	FROM tbl_product pr join tbl_categories cat on pr.prod_category_id = cat.cate_id
	WHERE cat.ts @@ to_tsquery('english', '${searchKey}') ${AndOrCondition} pr.ts @@ to_tsquery('english', '${searchKey}')`)

	numberOfProduct = Number(numberOfProduct.rows[0].count)
	var numberOfPage = 1
	if (numberOfProduct > limit) {
		numberOfPage = Math.ceil(numberOfProduct / limit)
	}

	//full-text-search for category & product name
	var result = await knex.raw(`
		SELECT count(h.his_id) number_bid, pr.*, cat.cate_name
		FROM (tbl_product pr join tbl_categories cat on pr.prod_category_id = cat.cate_id)
		left join tbl_product_history h on h.his_product_id = pr.prod_id
		WHERE cat.ts @@ to_tsquery('english', '${searchKey}') ${AndOrCondition} pr.ts @@ to_tsquery('english', '${searchKey}')
		group by pr.prod_id, pr.prod_name, pr.prod_description,
		pr.prod_main_image, pr.prod_price, pr.prod_end_date,
		pr.prod_price_current, pr.prod_created_date, cat.cate_name,
		pr.prod_seller_id, pr.prod_price_holder
		order by ${filterField} ${orderBy}
		limit ${limit}
		offset ${offset}
	`)

	result = result.rows

	var prodList = []
	var index = 0
	var accountList = await accountModel.findActiveUser()
	while (index < result.length) {
		let prodObj = {
			prod_id: result[index].prod_id,
			prod_name: result[index].prod_name,
			prod_category_name: result[index].cate_name,
			prod_description: result[index].prod_description,
			prod_created_date: moment(result[index].prod_created_date).format('DD/MM/YYYY HH:mm:ss'),
			prod_price_current: result[index].prod_price_current,
			prod_end_date: moment(result[index].prod_end_date).format('DD/MM/YYYY HH:mm:ss'),
			prod_seller_id: result[index].prod_seller_id,
			prod_main_image: result[index].prod_main_image,
			prod_price: result[index].prod_price,
			prod_price_holder: result[index].prod_price_holder,
			number_bid: result[index].number_bid
		}
		//get holder & seller information
		if (prodObj.prod_price_holder)
			prodObj.prod_price_holder = accountList.find((priceHolder) => priceHolder.acc_id == prodObj.prod_price_holder).acc_full_name
		if (prodObj.prod_seller_id)
			prodObj.prod_seller_id = accountList.find((seller) => seller.acc_id == prodObj.prod_seller_id).acc_full_name
		prodList.push(prodObj)
		index++
	}

	return res.status(200).json({
		numberOfPage: numberOfPage,
		numberProduct: numberOfProduct,
		listProduct: prodList,
		statusCode: successCode
	})
})

/////PRODUCT DETAIL API
/*1.Get product detail information*/
router.get('/details/:id', async (req, res) => {
	const { id } = req.params
	var prod = await knex('tbl_product')
		.where('prod_id', id)

	if (prod.length === 0) {

		return res.status(400).json({
			errorMessage: " Product record doesn't exist!",
			statusCode: 1
		})
	}

	var prodObject = {}
	var accountList = await accountModel.findActiveUser()
	var rating = {}

	await knex.from('tbl_product')
		.where('prod_id', id)
		.returning('*')
		.then(async (rows) => {
			prodObject = rows[0];
			prodObject.prod_end_date = moment(prodObject.prod_end_date).format('DD/MM/YYYY HH:mm:ss')
			prodObject.prod_created_date = moment(prodObject.prod_created_date).format('DD/MM/YYYY HH:mm:ss')

			var like_bid = 0
			var dis_like_bid = 0
			var like_seller = 0
			var dis_like_seller = 0
			for (var i = 0; i < accountList.length; i++) {
				if (accountList[i].acc_id === prodObject.prod_price_holder) {
					like_bid = accountList[i].acc_like_bidder
					dis_like_bid = accountList[i].acc_dis_like_bidder
				}
				if (accountList[i].acc_id === prodObject.prod_seller_id) {
					like_seller = accountList[i].acc_like_seller
					dis_like_seller = accountList[i].acc_dis_like_seller
				}
			}

			rating = {
				acc_like_bidder: like_bid,
				acc_dis_like_bidder: dis_like_bid,
				acc_like_seller: like_seller,
				acc_dis_like_seller: dis_like_seller
			}
			//get holder & seller information
			if (prodObject.prod_price_holder)
				prodObject.prod_price_holder = accountList.find((priceHolder) => priceHolder.acc_id == prodObject.prod_price_holder).acc_full_name
			if (prodObject.prod_seller_id)
				prodObject.prod_seller_id = accountList.find((seller) => seller.acc_id == prodObject.prod_seller_id).acc_full_name
			var catName = await knex('tbl_categories').where('cate_id', prodObject.prod_category_id)
			prodObject.prod_categoryName = catName[0].cate_name
			//get sub-iamges
			var imageResult = await knex.from('tbl_product_images')
				.where('prod_img_product_id', prodObject.prod_id);
			prodObject['prod_img'] = imageResult.map(attr => attr.prod_img_data);
		})

	if (prodObject) {
		return res.status(200).json({
			productDetail: prodObject,
			rating: rating,
			statusCode: successCode
		})
	}

	return res.status(200).json({
		productDetail: [],
		rating: {},
		statusCode: errorCode
	})
})

//PRODUCT FOR ADMIN
router.post('/getAuctionProductList', prodValidation.getAuctionProductList, async (req, res) => {
	const { page, limit } = req.body
	const offset = limit * (page - 1)

	if (page < 1 || limit < 1) {
		return res.status(400).json({
			errorMessage: "limit and page parameter is not valid",
			statusCode: errorCode
		})
	}

	var total = await knex.raw(`select count(distinct prod_id) 
	from tbl_product where prod_status = 0`)


	total = Number(total.rows[0].count)
    numPage = 1
	if (total > limit) {
		numPage = Math.ceil(total / limit)
	}
	else {
		numPage = 1
	}

	var result = await knex.raw(`select * from tbl_product p join tbl_categories c
                                on c.cate_id = p.prod_category_id 
                                where p.prod_status != 1
								order by p.prod_created_date DESC offset ${offset} limit ${limit}`)
	result = result.rows

	var prodList = []
	var index = 0
	while(index < result.length){
		let probItem = {
			prodId: result[index].prod_id,
			prodName: result[index].prod_name,
			prodPrice: result[index].prod_price,

            prodCategoryName: result[index].cate_name,
            prodCategoryId: result[index].prod_category_id,
            prodPrice: result[index].prod_price,
            prodPriceStarting: result[index].prod_price_starting,
            prodPriceStep: result[index].prod_price_step,
            prodPriceStarting: result[index].prod_price_starting,
            prodPriceCurrent: result[index].prod_price_current,
            prodPriceHighest: result[index].prod_price_highest,
            prodEndDate: result[index].prod_end_date,
            prodAutoExtend: result[index].prod_auto_extend,
            prodMainImage: result[index].prod_main_image,

			prodDescription: result[index].prod_description,
			prodUpdatedDate: result[index].prod_updated_date
		}
        var idxImg = 0;
        let imageLink = [];
        try{
            let imgs = await knex.raw(`select * from tbl_product_images where prod_img_product_id=${result[index].prod_id}`);
            imgs = imgs.rows;
            while(idxImg < imgs.length){
                imageLink.push(imgs[idxImg].prod_img_data);
                idxImg++;
            }
            probItem['prodImages'] = imageLink;
        }catch(e){
            console.log(e);
        }
		prodList.push(probItem);
		index++;
	}

	return res.status(200).json({
		numPage: numPage,
		curPage: page,
        total: total,
		productList: prodList,
		statusCode: successCode
	})
})

router.post('/deleteAuctionProduct', prodValidation.deleteAuctionProduct, async(req, res) => {
    const { prodId } = req.body
    const now = new Date(Date.now())
    await knex('tbl_product').where({ prod_id: prodId }).update({ prod_status: 1, prod_updated_date: moment(now).format('YYYY-MM-DD HH:mm:ss') })
    return res.status(200).json({
        data: true,
        statusCode: successCode
    })
})

module.exports = router