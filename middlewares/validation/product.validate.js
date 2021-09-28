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

module.exports = {
	listByCategory
}
