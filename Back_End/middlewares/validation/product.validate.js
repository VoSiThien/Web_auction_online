const ajvLib = require('ajv')
const errorCode = 1

const listByCategory = async (req, res, next) => {
	const { limit, page, catID } = req.body
	
	const shema = {
		type: 'object',
		properties: {
			catID: {type : 'integer'},
			page: { type: 'integer'},
			limit: { type: 'integer'}
		},
		required: ["catID", "page", "limit"],
		additionalProperties: true
	}

	const ajv = new ajvLib({
		allErrors: true
	})

	const validator = ajv.compile(shema)
	const valid = validator(req.body)

	if (!valid) {
		return res.status(400).json({
			errorMessage: validator.errors[0].message,
			statusCode: errorCode
		})
	}

	if (page < 1 || limit < 1) {
		return res.status(400).json({
			errorMessage: "limit and page parameter is not valid",
			statusCode: errorCode
		})
	}


	next()
}

const productSearching = (req, res, next) => {
	var { searchKey, limit, page, orderBy, filterField, AndOrCondition } = req.body

	const shema = {
		type: 'object',
		properties: {
			searchKey: { type: 'string'},
			AndOrCondition: {type : 'string'}
		},
		required: ["AndOrCondition", "searchKey"],
		additionalProperties: true
	}

	const ajv = new ajvLib({
		allErrors: true
	})

	const validator = ajv.compile(shema)
	const valid = validator(req.body)

	if (!valid) {
		return res.status(400).json({
			errorMessage: "Value " + validator.errors[0].message,
			statusCode: errorCode
		})
	}

	

	if (filterField != 'prod_created_date' && filterField != 'prod_price') {
		return res.status(400).json({
			errorMessage: "filterField is invalid!",
			statusCode: errorCode
		})
	}


	if (orderBy && orderBy != 'asc' && orderBy != 'desc') {
		return res.status(400).json({
			errorMessage: "sort by is invalid!",
			statusCode: errorCode
		})
	}

	if (page < 1 || limit < 1) {
		return res.status(400).json({
			errorMessage: "limit and page parameter is not valid",
			statusCode: errorCode
		})
	}

	if(AndOrCondition != 'or' && AndOrCondition != 'and'){
		return res.status(400).json({
			errorMessage: "And/or condition is not valid",
			statusCode: errorCode
		})
	}

	next()
}

const getAuctionProductList = (req, res, next) => {
	const shema = {
		type: 'object',
		properties: {
			page: { type: 'integer' },
			limit: { type: 'integer' }
		},
		required: ["page", "limit"],
		additionalProperties: true
	}

	const ajv = new ajvLib({
		allErrors: true
	})

	const validator = ajv.compile(shema)
	const valid = validator(req.body)

	if (!valid) {
		return res.status(400).json({
			errorMessage: validator.errors[0].message,
			statusCode: errorCode
		})
	}

	next()
}

const deleteAuctionProduct = (req, res, next) => {
    const shema = {
        type: "object",
        properties: {
            prodId: { type: "integer" },
        },
        required: ["prodId"],
        additionalProperties: true
    }

    const ajv = new ajvLib({
        allErrors: true
    })

    const validator = ajv.compile(shema)
    const valid = validator(req.body)

    if (!valid) {
        return res.status(400).json({
            errorMessage: validator.errors[0].message,
            statusCode: errorCode
        })
    }

    next()
}


module.exports = {
	listByCategory,
	productSearching,
	getAuctionProductList,
	deleteAuctionProduct
}
