const ajvLib = require('ajv')
const errorCode = 1

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

const postAuctionProduct = (req, res, next) => {
    const shema = {
        type: "object",
        properties: {
            prodName: { type: "string" },
            prodPriceStarting: { type: "string" },
            prodPriceStep: { type: "string" },
            prodPrice: { type: "string", nullable: true },
            prodDescription: { type: "string", nullable: true },
            prodEndDate: { type: "string" },
            prodCategoryId: { type: "integer" },
            prodAutoExtend: { enum: ["0", "1"] }
        },
        required: ["prodName", "prodPriceStarting", "prodPriceStep", "prodEndDate", "prodCategoryId"],
        additionalProperties: true
    }

    const ajv = new ajvLib({
        allErrors: true
    })

    const validator = ajv.compile(shema)
    const valid = validator(req.body)
    const { prodImages } = req.files

    if (prodImages.length < 3) {
        return res.status(400).json({
            errorMessage: "Image must be at least 3",
            statusCode: errorCode
        })
    }

    if (!valid) {
        return res.status(400).json({
            errorMessage: validator.errors[0].message,
            statusCode: errorCode
        })
    }

    next()
}

const updateAuctionProductDescription = (req, res, next) => {
    const shema = {
        type: "object",
        properties: {
            prodId: { type: "integer" },
            prodDescription: { type: "string" },
        },
        required: ["prodId", "prodDescription"],
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
    postAuctionProduct,
    updateAuctionProductDescription,
    getAuctionProductList
}