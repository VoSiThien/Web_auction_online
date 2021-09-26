const ajvLib = require('ajv')
const errorCode = 1

const postAuctionProduct = (req, res, next) => {
    const shema = {
        type: "object",
        properties: {
            prod_name: { type: "string" },
            prod_price_starting: { type: "string" },
            prod_price_step: { type: "string" },
            prod_price: { type: "string", nullable: true },
            prod_description: { type: "string", nullable: true },
            prod_end_date: { type: "string" },
            prod_auto_extend: { enum: ["0", "1"] }
        },
        required: ["prod_name", "prod_price_starting", "prod_price_step", "prod_end_date"],
        additionalProperties: true
    }

    const ajv = new ajvLib({
        allErrors: true
    })

    const validator = ajv.compile(shema)
    const valid = validator(req.body)
    const { prod_images } = req.files

    if (prod_images.length < 3) {
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
            prod_id: { type: "integer" },
            prod_description: { type: "string" },
        },
        required: ["prod_id", "prod_description"],
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
}