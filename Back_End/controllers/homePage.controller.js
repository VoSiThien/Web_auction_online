const express = require('express')
const router = express.Router()
const catModel = require('../models/categories.model')
const pagingService = require('../services/commonService')

const errorCode = 1
const successCode = 0

router.get('/list-home', async (req, res) => {
	
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


module.exports = router