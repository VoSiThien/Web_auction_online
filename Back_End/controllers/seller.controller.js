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

router.post('/getAuctionProductList', validator.getAuctionProductList, async (req, res) => {
	const { page, limit } = req.body
	const offset = limit * (page - 1)
	const accId = req.account['accId']

	if (page < 1 || limit < 1) {
		return res.status(400).json({
			errorMessage: "limit and page parameter is not valid",
			statusCode: errorCode
		})
	}

	var total = await knex.raw(`select count(distinct prod_id) 
	from tbl_product where prod_seller_id = ${accId}`)


	total = Number(total.rows[0].count)
    numPage = 1
	if (total > limit) {
		numPage = Math.ceil(total / limit)
	}
	else {
		numPage = 1
	}

	var result = await knex.raw(`select * from tbl_product p join tbl_categories c
                                on c.cate_id = p.prod_category_id where p.prod_seller_id = ${accId}
								 order by p.prod_status offset ${offset} limit ${limit}`)

	result = result.rows

	var prodList = []
	var index = 0

	while(index < result.length){
		let probItem = {
			prodId: result[index].prod_id,
			prodName: result[index].prod_name,
			prodPrice: result[index].prod_price,

            prodCategoryName: result[index].prod_category_name,
            prodPrice: result[index].prod_price,
            prodPriceStarting: result[index].prod_price_starting,
            prodPriceStep: result[index].prod_price_step,
            prodPriceStarting: result[index].prod_price_starting,
            prodPriceCurrent: result[index].prod_price_current,
            prodPriceHighest: result[index].prod_price_highest,
            prodEndDate: result[index].prod_end_date,
            prodAutoExtend: result[index].prod_auto_extend,
            prodMainImage: result[index].prod_main_image,

			prodDescription: result[index].prod_description,
			prodUpdatedDate: result[index].prod_updated_date
		}

        let imageLink = []
		for (let i = index; i < result.length; i++) {
			index = i + 1
			imageLink.push(result[i].prod_img_data)
			if ((i >= result.length - 1) || (result[index].prod_id != result[index - 1].prod_id)) {
				break;
			}
		}
		probItem['prodImages'] = imageLink
		prodList.push(probItem)
		index++
	}

	return res.status(200).json({
		numPage: numPage,
		curPage: page,
        total: total,
		productList: prodList,
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
        prodCategoryId,
        prodAutoExtend
    } = req.body
    const accId = req.account.accId
    const now = Date.now()
    let prodId = null;
    try {

        prodId = await knex('tbl_product')
        .insert({
            prod_name: prodName,
            prod_category_id: prodCategoryId,
            prod_price_starting: prodPriceStarting,
            prod_price_step: prodPriceStep,
            prod_price: prodPrice,
            prod_description: prodDescription,
            prod_end_date: prodEndDate,
            prod_seller_id: accId,
            prod_created_date: now,
            prod_updated_date: now,
            prod_auto_extend: prodAutoExtend
        })
        // .returning('*')
        // console.error(prodId)
        // prodId = await knex.raw(`INSERT INTO public.tbl_product(prodName,prod_category_id,prod_price_starting,
        //     prod_price_step,prod_price,prod_description,prod_end_date,prod_seller_id,
        //     prod_create_date,prod_update_date,prod_auto_extend) VALUES(${prodName},${prodCategoryId},${prodPriceStarting},${prodPriceStep},
        //         ${prodPrice},${prodDescription},${prodEndDate},${accId},${now},${now},${prodAutoExtend})`)
        .returning('prod_id')
        .then(function(result) {
            return result[0]
        })
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            data: error.message,
            statusCode: successCode
        })
    }
    const { prod_images } = req.files
    let mainImage = null;
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
        if(mainImage == null){
            mainImage = pathName;
            await knex('tbl_product').where({ prod_id: prodId }).update({ prod_main_image: mainImage })
        }
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

router.put('/deleteAuctionProduct', validator.deleteAuctionProduct, async(req, res) => {
    const { prodId } = req.body
    const now = Date.now()
    await knex('tbl_product').where({ prod_id: prodId }).update({ prod_status: 2, prod_update_date: now })
    return res.status(200).json({
        data: true,
        statusCode: successCode
    })
})

module.exports = router;