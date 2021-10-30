const ajvLib = require('ajv')
const catModel = require('../../models/categories.model')
const productModel = require('../../models/product.model')

const errorCode = 1


const newParent = async (req, res, next) => {
    const { catName } = req.body

    const shema = {
        type: 'object',
        properties: {
            catName: { type: 'string', pattern: '', minLength: 1, maxLength: 100 }
        },
        required: ['catName'],
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


    const listCat = await catModel.getAll()
    
    const existCat = listCat.find((cat) => cat.cate_name.toLowerCase() === catName.toLowerCase())
    if (existCat) {
        return res.status(400).json({
            errorMessage: 'Tên chuyên mục cần thêm đã tồn tại !',
            statusCode: errorCode
        })
    }

   
    next()
}

const newChild = async (req, res, next) => {
    const { catName, catParentID } = req.body
    
    const shema = {
        type: 'object',
        properties: {
            catName: { type: 'string', pattern: '', minLength: 1, maxLength: 100 },
            catParentID: { type: 'integer' }
        },
        required: ['catName', 'catParentID'],
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

    const listCategory = await catModel.getAll()

    const checkExist = listCategory.find((item) => item.cate_name.toLowerCase() === catName.toLowerCase())

    if (checkExist) {
        return res.status(400).json({
            errorMessage: 'Tên chuyên mục con đã tồn tại',
            statusCode: errorCode
        })
    }

    const parent = await catModel.getById(catParentID)

    if (parent.length === 0) {
        return res.status(400).json({
            errorMessage: 'Chuyên mục cha không tồn tại',
            statusCode: errorCode
        })
    }

    next()
}

const updateCat = async (req, res, next) => {
    const { catID, catName, catParentID } = req.body
    
    const shema = {
        type: 'object',
        properties: {
            catID: { type: 'integer' },
            catName: { type: 'string', pattern: '', minLength: 1, maxLength: 100 },
            catParentID: { type: 'integer' }
        },
        required: ['catID', 'catName'],
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
    
    const result = await catModel.getById(catID)
 
    const listCategory = await catModel.getAll()

    const checkExist = listCategory.find((info) => (info.cate_name.toLowerCase() === catName.toLowerCase()) && (info.cate_id !== catID))
 
    if (checkExist) {
        return res.status(400).json({
            errorMessage: 'Tên chuyên mục mới đã tồn tại!',
            statusCode: errorCode
        })
    }

    if (result.length === 0) {
        return res.status(400).json({
            errorMessage: 'Không tìm thấy chuyên mục!',
            statusCode: errorCode
        })
    }

    const checkExistParent = catParentID && catParentID !== ''

    if (checkExistParent) {
        const parent = await catModel.getById(catParentID)

        if (parent.length === 0) {
           
            return res.status(400).json({
                errorMessage: 'ID của chuyên mục cha không tồn tại',
                statusCode: errorCode
            })
        }
    }

    

    next()
}

const listParent = async (req, res, next) => {
    const shema = {
        type: 'object',
        properties: {
            catParentID: { type: 'integer' }
        },
        required: ['catParentID'],
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

const listChild = async (req, res, next) => {
    const shema = {
        type: 'object',
        properties: {
            page: { type: 'string', pattern: '^\\d+$' },
            limit: { type: 'string', pattern: '^\\d+$' }
        },
        required: [],
        additionalProperties: true
    }

    const ajv = new ajvLib({
        allErrors: true
    })

    const validator = ajv.compile(shema)
    const valid = validator(req.query)

    if (!valid) {
        return res.status(400).json({
            errorMessage: validator.errors[0].message,
            statusCode: errorCode
        })
    }

    next()
}

const deleteCat = async (req, res, next) => {
    const { catID } = req.body

    const shema = {
        type: 'object',
        properties: {
            catID: { type: 'integer' },
        },
        required: ['catID'],
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

    const result = await catModel.getById(catID)
    
    if (result.length === 0) {
        res.status(400).json({
            errorMessage: 'Chuyên mục cần xóa không hợp lệ!',
            statusCode: errorCode
        })
    }

    const listChildBycatID = await catModel.getChild(catID)

    if (listChildBycatID.length !== 0) {
        return res.status(400).json({
            errorMessage: 'Chuyên mục vẫn còn chứa chuyên mục con!',
            statusCode: errorCode
        })
    }
    
    const productsByCate = await productModel.getByCatId(catID)

    if (productsByCate.length !== 0) {
        return res.status(400).json({
            errorMessage: 'Chuyên mục vẫn còn sản phẩm, không được xóa!',
            statusCode: errorCode
        })
    }
 
    next()
}

module.exports = {
    newParent,
    newChild,
    listParent,
    listChild,
    deleteCat,
    updateCat
}
