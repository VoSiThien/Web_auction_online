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

module.exports = {
    updateAllowSellIn7Date,
}