
const express = require('express')
const router = express.Router()
const knex = require('../utils/dbConnection')
const categoriesModel = require('../models/categories.model')

const successCode = 0
const errorCode = 1


router.get('/list', async (req, res) => {

	const { page, limit } = req.query

	const allCategories = await categoriesModel.getAll()
	const listCategoriesFather = await categoriesModel.getAllParent()
	const listCategoriesFatherWithoutChild = await categoriesModel.getListParentWithoutChild(allCategories, listCategoriesFather)

	return res.status(200).json({
		paginationResult: listCategoriesFatherWithoutChild,
		statusCode: successCode
	})

})

module.exports = router