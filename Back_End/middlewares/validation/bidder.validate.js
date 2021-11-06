const ajvLib = require('ajv')
const errorCode = 1

const updateAllowSellIn7Date = (req, res, next) => {
    const shema = {
        type: "object",
        properties: {
            accIsUpgrade: { enum: ["0", "1"] },
        },
        required: ["accIsUpgrade"],
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

const updateInfo = (req, res, next) => {
	const shema = {
  		type: 'object',
  		properties: {
            fullName: {type: 'string'},
    		email: { type: 'string', pattern: '^[a-z][a-z0-9_\.]{3,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$', maxLength: 100 },
            birthday: {type: 'datetime'}
  		},
		required: ['fullName'],
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

const updateProfile = (req, res, next) => {
	const shema = {
  		type: 'object',
  		properties: {
            fullName: {type: 'string'},
    		email: { type: 'string', pattern: '^[a-z][a-z0-9_\.]{3,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$', maxLength: 100 },
            birthday: {type: 'date'},
			phoneNumber: {type: 'string'}
  		},
		required: ['fullName'],
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

const updatePassword = (req, res, next) => {
	const shema = {
  		type: 'object',
  		properties: {
            newPassword: {type: 'string'},
			oldPassword: {type: 'string'},
  		},
		required: ['newPassword', 'oldPassword'],
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

const addFavoriteProduct = (req, res, next) => {
	const shema = {
		type: 'object',
		properties: {
			prodId: { type: 'integer' }
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
    updateAllowSellIn7Date,
    updateInfo,
    addFavoriteProduct,
	updateProfile,
	updatePassword
}