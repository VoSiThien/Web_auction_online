const express = require('express')
const router = express.Router()
const knex = require('../utils/dbConnection')
const catValidation = require('../middlewares/validation/categories.validate')
const catModel = require('../models/categories.model')
const commonService = require('../services/commonService')
const successCode = 0
const moment = require('moment');
router.post('/list-parent', async (req, res) => {
	const { page, limit } = req.body
	const parentCat = await catModel.getAllParent()

	if (parentCat.length === 0) {
		return res.status(400).json({
			errorMessage: 'Chưa có chuyên mục nào tồn tại!',
			statusCode: errorCode
		})
	}
	for (cat of parentCat) {
		cat.cate_created_date = moment(cat.cate_created_date).format('DD/MM/YYYY HH:mm:ss')
		cat.cate_updated_date = moment(cat.cate_updated_date).format('DD/MM/YYYY HH:mm:ss')
	}
	return res.status(200).json({
		numberOfCat: parentCat.length,
		CategoryList: commonService.pagingation(parentCat, page, limit),
		totalPage: commonService.caculateNumberOfPage(parentCat, page, limit)
	})
})

router.post('/list-child', catValidation.listChild, async (req, res) => {
	const { page, limit, catParent } = req.body
	const parentCat = await catModel.getById(catParent)

	if (parentCat.length === 0) {
		return res.status(400).json({
			errorMessage: 'Chuyên mục cha không tồn tại!',
			statusCode: errorCode
		})
	}
	const result = await knex.from('tbl_categories')
		.where({ cate_father: catParent })

	for (cat of result) {
		cat.cate_created_date = moment(cat.cate_created_date).format('DD/MM/YYYY HH:mm:ss')
		cat.cate_updated_date = moment(cat.cate_updated_date).format('DD/MM/YYYY HH:mm:ss')
	}
	if (result.length !== 0) {
		return res.status(200).json({
			numberOfSubCat: result.length,
			subCategoryList: commonService.pagingation(result, page, limit),
			totalPage: commonService.caculateNumberOfPage(result, page, limit)
		})
	}
})


router.post('/add-parent', catValidation.newParent, async (req, res) => {
	const { catName } = req.body

	const currentStampTime = new Date()
	const newParent = {
		cate_name: catName,
		cate_created_date: currentStampTime,
		cate_updated_date: currentStampTime
	}

	await knex('tbl_categories').insert(newParent)

	return res.status(200).json({
		statusCode: successCode
	})
})

router.post('/add-child', catValidation.newChild, async (req, res) => {
	const { catName, catParentID } = req.body

	const currentStampTime = new Date()
	const newChild = {
		cate_name: catName,
		cate_father: catParentID,
		cate_created_date: currentStampTime,
		cate_updated_date: currentStampTime
	}

	await knex('tbl_categories').insert(newChild)

	return res.status(200).json({
		statusCode: successCode
	})
})

router.post('/update', catValidation.updateCat, async (req, res) => {
	const { catID, catName, catParentID } = req.body

	const result = await catModel.getById(catID)

	let presentDate = new Date()

	const newCatInfomation = {
		cate_name: catName,
		cate_father: catParentID ? catParentID : result[0].cate_father,
		cate_updated_date: presentDate
	}

	await knex('tbl_categories')
		.where({ cate_id: catID })
		.update(newCatInfomation)

	return res.status(200).json({
		statusCode: successCode
	})
})

router.post('/delete', catValidation.deleteCat, async (req, res) => {
	const { catID } = req.body
	console.log('test')
	await knex('tbl_categories')
		.where({ cate_id: catID })
		.del()

	return res.status(200).json({
		statusCode: successCode
	})
})

module.exports = router