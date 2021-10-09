
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

	// const filterList = listCategoriesFatherWithoutChild.filter((info) => {
	// 	const checkExist = listCategoriesFather.find((item) => item.cate_father === info.cate_id)
	// 	if (checkExist) {
	// 		return false
	// 	}

	// 	return true
	// })

	// const result = await Promise.all([
	// 	listCategoriesFather.map((item) => {
	// 		const fatherInfo = allCategories.find((info) => info.cate_id === item.cate_father)
	// 		const listChild = allCategories.filter((info) => info.cate_father === item.cate_father)
			
	// 		return {
	// 			cateId: fatherInfo.cate_id,
	// 			cateName: fatherInfo.cate_name,
	// 			subCategories: listChild.map((itemChild) => {
	// 				const createDate = moment(new Date(itemChild.cate_created_date)).format("DD-MM-YYYY")					

	// 				return {
	// 					cateId: itemChild.cate_id,
	// 					cateName: itemChild.cate_name,
	// 					createDate
	// 				}
	// 			})
	// 		}
	// 	})
	// 	,
	// 	filterList.map((item) => {
	// 		const fatherInfo = allCategories.find((info) => info.cate_id === item.cate_id)
	// 		const listChild = allCategories.filter((info) => info.cate_father === item.cate_id)
			
	// 		return {
	// 			cateId: fatherInfo.cate_id,
	// 			cateName: fatherInfo.cate_name,
	// 			subCategories: listChild.map((itemChild) => {
	// 				const createDate = moment(new Date(itemChild.cate_created_date)).format("DD-MM-YYYY")

	// 				return {
	// 					cateId: itemChild.cate_id,
	// 					cateName: itemChild.cate_name,
	// 					createDate
	// 				}
	// 			})
	// 		}
	// 	})
	// ])
	
	// if (result) {
	// 	result[1].forEach((item) => {
	// 		result[0].push(item)
	// 	})

	// 	result[0].sort((a, b) => a - b)

	// 	if (page || limit) {
	// 		let startIndex = (parseInt(page) - 1) * parseInt(limit)
	// 		let endIndex = (parseInt(page) * parseInt(limit))
	// 		let totalPage = Math.floor(result[0].length / parseInt(limit))

	// 		if (result[0].length % parseInt(limit) !== 0) {
	// 			totalPage = totalPage + 1
	// 		}
	
	// 		const paginationResult = result[0].slice(startIndex, endIndex)
	
	// 		return res.status(200).json({
	// 			totalPage,
	// 			paginationResult,
	// 			statusCode: successCode
	// 		})
	// 	}
		
	// 	return res.status(200).json({
	// 		paginationResult: result[0],
	// 		statusCode: successCode
	// 	})
	// }

	return res.status(200).json({
		paginationResult: listCategoriesFatherWithoutChild,
		statusCode: successCode
	})

	// return res.status(200).json({
	// 	paginationResult: {},
	// 	statusCode: errorCode
	// })
})

module.exports = router