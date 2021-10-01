const express = require('express')
const path = require('path');
const fs = require('fs');

const knex = require('../utils/dbConnection')
const validator = require('../middlewares/validation/seller.validate')

const router = express.Router()
const successCode = 0
const errorCode = 1

// *
// Seller(Nguyên) -
// Quản lý hồ sơ cá nhân(Seller) -
// Đăng sản phẩm đấu giá +
// Bổ sung thông tin mô tả +
// Từ chối lượt ra giá của Bidder

router.get('/profile', async(req, res) => {
    const accId = req.account.accId
    var seller = await knex('tbl_account').where({ acc_id: accId })
        .first('acc_like_seller as accLikeSeller', 'acc_dis_like_seller as accDisLikeSeller', 'acc_exp_upgrade as accExpUpgrade') || null
    return res.status(200).json({
        data: seller,
        statusCode: successCode
    })
})

router.post('/postAuctionProduct', validator.postAuctionProduct, async(req, res) => {
    const {
        prodName,
        prodPriceStarting,
        prodPriceStep,
        prodPrice,
        prodDescription,
        prodEndDate,
        prodAutoExtend
    } = req.body
    const accId = req.account.accId
    const now = Date.now()
    const prodId = await knex('tbl_product').insert({
            prod_name: prodName,
            prod_price_starting: prodPriceStarting,
            prod_price_step: prodPriceStep,
            prod_price: prodPrice,
            prod_description: prodDescription,
            prod_end_date: prodEndDate,
            prod_seller_id: accId,
            prod_create_date: now,
            prod_update_date: now,
            prod_auto_extend: prodAutoExtend
        })
        .returning('prod_id')
        .then(function(result) {
            return result[0]
        })
    const { prod_images } = req.files
    prod_images.forEach(async(image) => {
        let pathName = `/uploads/users/1/${prodId}`;
        const dirs = path.join(__dirname, `..${pathName}`)
        const impName = `/product_${Date.now().valueOf()}.png`
        pathName = path.join(pathName, impName)
        if (!fs.existsSync(dirs)) {
            fs.mkdirSync(dirs, { recursive: true });
        }
        fs.writeFileSync(path.join(dirs, impName), image.data, cb => console.log('error'))
        const prodImage = await knex('tbl_product_images').insert({
            prod_img_product_id: prodId,
            prod_img_data: pathName,
            prod_img_status: 1
        })
    })
    return res.status(200).json({
        data: true,
        statusCode: successCode
    })
})

router.post('/updateAuctionProductDescription', validator.updateAuctionProductDescription, async(req, res) => {
    const { prodId, prodDescription } = req.body
    const now = Date.now()
    await knex('tbl_product').where({ prod_id: prodId }).update({ prod_description: prodDescription, prod_update_date: now })
    return res.status(200).json({
        data: true,
        statusCode: successCode
    })
})

router.post('/removeBidHolder', validator.updateAuctionProductDescription, async(req, res) => {
    const { prodId, prodDescription } = req.body
    const now = Date.now()
    await knex('tbl_product').where({ prod_id: prodId }).update({ prod_description: prodDescription, prod_update_date: now })
    return res.status(200).json({
        data: true,
        statusCode: successCode
    })
})

module.exports = router;