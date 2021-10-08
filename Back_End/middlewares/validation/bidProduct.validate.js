const ajvLib = require('ajv')
const errorCode = 1
//comment validation
const bidProduct = (req, res, next) => {
	const shema = {
		type: 'object',
		properties: {
			priceBid: { type: 'string' },
			prodId: { type: 'integer' }
		},
		required: ["priceBid", "prodId"],
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

const historyProduct = (req, res, next) => {
	const shema = {
		type: 'object',
		properties: {
			page: { type: 'integer' },
			limit: { type: 'integer' },
            prodId: { type: 'integer' },
			status: {type: 'integer'}
		},
		required: ["page", "limit", "prodId", "status"],
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
	bidProduct,
    historyProduct
}