const knex = require('../utils/dbConnection')
const moment = require('moment')
const getById = async (cateId) => {
	const data = await knex('tbl_categories')
		.where({ cate_id: cateId })

	return data
}

const getAll = async () => {
	const data = await knex('tbl_categories')

	return data
}

const getAllChild = async () => {
	const data = await knex('tbl_categories')
		.distinctOn('cate_father')
		.whereNot({ cate_father: null })

	return data
}

const getFatherWithLimit = async () => {
	const data = await knex('tbl_categories')
		.distinctOn('cate_father')
		.whereNot({ cate_father: null })
		.limit(10)

	return data
}

const getAllParent = async () => {
	const data = await knex('tbl_categories')
		.where({ cate_father: null })

	return data
}

const getChild = async (cateFather) => {
	const data = await knex('tbl_categories')
		.where({ cate_father: cateFather })

	return data
}

const getListParentChild = async (listCategory, listAllChild) => {
	return listAllChild.map((itemAllChild) => {
		//from list of all child, get list cat parent and child specifically
		const listParent = listCategory.find((parentData) => parentData.cate_id === itemAllChild.cate_father)
		const listChild = listCategory.filter((childData) => childData.cate_father === itemAllChild.cate_father)
		//return list parent - child after filter
		return {
			cateId: listParent.cate_id,
			cateName: listParent.cate_name,
			subCategories: listChild.map((childItem) => {
				const createDate = moment(new Date(childItem.cate_created_date)).format("DD-MM-YYYY")
				return {
					catID: childItem.cate_id,
					catName: childItem.cate_name,
					createDate
				}
			})
		}
	})
}

const getListParentWithoutChild = async (listCategory, listCatParentWithNoChild) => {
	return listCatParentWithNoChild.map((itemAllParent) => {
		//get list parent that have no child
		const listParent = listCategory.find((parentData) => parentData.cate_id === itemAllParent.cate_id)
		const listChild = listCategory.filter((childData) => childData.cate_father === itemAllParent.cate_id)

		return {
			cateId: listParent.cate_id,
			cateName: listParent.cate_name,
			subCategories: [listChild.map((childItem) => {//always return the blank array
				const createDate = moment(new Date(childItem.cate_created_date)).format("DD-MM-YYYY")
				return {
					catID: childItem.cate_id,
					catName: childItem.cate_name,
					createDate
				}
			})]
		}
	})
}
/*
***This function will return the list of category and child cateogory in the same JSON file
*/
const getHomePageList = async (listCategory, listAllChild, listAllParent) => {
	//get all parents that doesn't have childs
	const listCatParentWithNoChild = listAllParent.filter((parentData) => {
		const isContainChild = listAllChild.find((itemAllParent) => itemAllParent.cate_father === parentData.cate_id)
		if (isContainChild) {
			return false
		}
		return true
	})

	var list = await Promise.all([
		getListParentChild(listCategory, listAllChild),//list with parent and child
		getListParentWithoutChild(listCategory, listCatParentWithNoChild)// list contains only parent without child
	])
	
	//merge parent category without child to parent-child list
	list[1].forEach((item) => {
		list[0].push(item)
	})
	return list[0]
}

module.exports = {
	getById,
	getChild,
	getAllParent,
	getAllChild,
	getAll,
	getFatherWithLimit,
	getHomePageList
}