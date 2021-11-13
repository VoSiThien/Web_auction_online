const express = require('express')

const knex = require('../utils/dbConnection')
const { uploaderImage } = require('../utils/uploader')
const validator = require('../middlewares/validation/seller.validate')
const moment = require('moment');
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
	from tbl_product where prod_seller_id = ${accId} and prod_status = 0`)


	total = Number(total.rows[0].count)
    numPage = 1
	if (total > limit) {
		numPage = Math.ceil(total / limit)
	}
	else {
		numPage = 1
	}

	var result = await knex.raw(`select * from tbl_product p join tbl_categories c
                                on c.cate_id = p.prod_category_id 
                                where p.prod_seller_id = ${accId}
                                and p.prod_status != 2
								order by p.prod_status offset ${offset} limit ${limit}`)
	result = result.rows

	var prodList = []
	var index = 0
	while(index < result.length){
		let probItem = {
			prodId: result[index].prod_id,
			prodName: result[index].prod_name,
			prodPrice: result[index].prod_price,

            prodCategoryName: result[index].cate_name,
            prodCategoryId: result[index].prod_category_id,
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
        var idxImg = 0;
        let imageLink = [];
        try{
            let imgs = await knex.raw(`select * from tbl_product_images where prod_img_product_id=${result[index].prod_id}`);
            imgs = imgs.rows;
            while(idxImg < imgs.length){
                imageLink.push(imgs[idxImg].prod_img_data);
                idxImg++;
            }
            probItem['prodImages'] = imageLink;
        }catch(e){
            console.log(e);
        }
		prodList.push(probItem);
		index++;
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
    const now = new Date(Date.now())

    var dateEnd = prodEndDate+':00'
    dateEnd = dateEnd.split('/')

    var getyear = dateEnd[2].split(' ')
    var dateToEnd = getyear[0] + '-'+dateEnd[1]+'-'+dateEnd[0]+' '+ getyear[1]
    
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
            prod_end_date: dateToEnd,
            prod_seller_id: accId,
            prod_created_date: moment(now).format('YYYY-MM-DD HH:mm:ss'),
            prod_updated_date: moment(now).format('YYYY-MM-DD HH:mm:ss'),
            prod_auto_extend: prodAutoExtend
        })
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
    const { prodImages } = req.files
    let mainImage = null;
    prodImages.forEach(async(image) => {

        let url = await uploaderImage(image);
        
        await knex('tbl_product_images').insert({
            prod_img_product_id: prodId,
            prod_img_data: url,
            prod_img_status: 0
        });

        if(mainImage == null){
            mainImage = url;
            await knex('tbl_product').where({ prod_id: prodId }).update({ prod_main_image: mainImage });
        }
    })
    return res.status(200).json({
        data: true,
        statusCode: successCode
    })
})

router.post('/updateAuctionProductDescription', validator.updateAuctionProductDescription, async(req, res) => {
    const { prodId, prodDescription } = req.body
    const now = new Date(Date.now())
    try{
        await knex('tbl_product').where({ prod_id: prodId }).update({ prod_description: prodDescription, prod_updated_date: now })
    }catch(e){
        console.log(e);
        return res.status(400).json({
            data: e,
            statusCode: errorCode
        })
    }
    return res.status(200).json({
        data: true,
        statusCode: successCode
    })
})

router.post('/deleteAuctionProduct', validator.deleteAuctionProduct, async(req, res) => {
    const { prodId } = req.body
    const now = new Date(Date.now())
    await knex('tbl_product').where({ prod_id: prodId }).update({ prod_status: 2, prod_updated_date: now })
    return res.status(200).json({
        data: true,
        statusCode: successCode
    })
})

module.exports = router;