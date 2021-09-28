const express = require('express')
const router = express.Router()
const knex = require('../utils/dbConnection')
const catValidation = require('../middlewares/validation/categories.validate')
const catModel = require('../models/categories.model')
const successCode = 0



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