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

router.get('/profile', async (req, res) => {
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
                                and p.prod_status != 1
								order by p.prod_created_date DESC offset ${offset} limit ${limit}`)
    result = result.rows

    var prodList = []
    var index = 0
    while (index < result.length) {
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
        try {
            let imgs = await knex.raw(`select * from tbl_product_images where prod_img_product_id=${result[index].prod_id}`);
            imgs = imgs.rows;
            while (idxImg < imgs.length) {
                imageLink.push(imgs[idxImg].prod_img_data);
                idxImg++;
            }
            probItem['prodImages'] = imageLink;
        } catch (e) {
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

router.post('/getAuctionProductEndList', validator.getAuctionProductList, async (req, res) => {
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
	from tbl_product where prod_seller_id = ${accId} and prod_status = 1 and
    to_timestamp(prod_end_date, 'YYYY/MM/DD HH24:MI:SS') <= CURRENT_TIMESTAMP and prod_price_holder IS NOT NULL`)


    total = Number(total.rows[0].count)
    numPage = 1
    if (total > limit) {
        numPage = Math.ceil(total / limit)
    }
    else {
        numPage = 1
    }

    var result = await knex.raw(`select * from (tbl_product p join tbl_categories c
                                on c.cate_id = p.prod_category_id) 
                                left join tbl_account a on a.acc_id = p.prod_price_holder
                                where p.prod_seller_id = ${accId}
                                and prod_status = 1 and
                                to_timestamp(prod_end_date, 'YYYY/MM/DD HH24:MI:SS') <= CURRENT_TIMESTAMP
                                and prod_price_holder IS NOT NULL
								order by p.prod_created_date DESC offset ${offset} limit ${limit}`)
    result = result.rows

    var prodList = []
    var index = 0
    while (index < result.length) {
        let probItem = {
            prodId: result[index].prod_id,
            prodName: result[index].prod_name,
            prodPrice: result[index].prod_price,
            prodPriceHolder: result[index].prod_price_holder,
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
            prodNameHolder: result[index].acc_full_name,
            prodDescription: result[index].prod_description,
            prodUpdatedDate: result[index].prod_updated_date
        }
        var idxImg = 0;
        let imageLink = [];
        try {
            let imgs = await knex.raw(`select * from tbl_product_images where prod_img_product_id=${result[index].prod_id}`);
            imgs = imgs.rows;
            while (idxImg < imgs.length) {
                imageLink.push(imgs[idxImg].prod_img_data);
                idxImg++;
            }
            probItem['prodImages'] = imageLink;
        } catch (e) {
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

router.post('/add-comment', async (req, res) => {
    const { Comment, Status, prodId } = req.body
    const id = req.account['accId']

    const product = await knex('tbl_product').where('prod_id', prodId)
    if (product.length === 0) {
        return res.status(400).json({
            errorMessage: 'Sản phẩm không tồn tại',
            statusCode: errorCode
        })
    }

    var comment;
    var notify;

    if (Status === 0 || Status === 1) {
        comment = await knex.raw(`select * from tbl_account_comments where acom_product_id = ${prodId} and acom_assessor = ${id}
        and acom_status_rating != 2`)
        notify = 'Sản phẩm đã được đánh giá, vui lòng không đánh giá lại'
    }
    else {
        comment = await knex.raw(`select * from tbl_account_comments where acom_product_id = ${prodId} and acom_assessor = ${id}
        and acom_status_rating = 2`)
        notify = 'Sản phẩm đã hủy giao dịch, không thể hủy tiếp'
    }
    comment = comment.rows
    if (comment.length !== 0) {
        return res.status(400).json({
            errorMessage: notify,
            statusCode: errorCode
        })
    }


    let dateCreate = new Date()
    const Comments = {
        acom_note: Comment,
        acom_assessor: id,
        acom_receiver: product[0].prod_price_holder,
        acom_product_id: prodId,
        acom_status_rating: Status,
        acom_created_date: moment(dateCreate).format('YYYY-MM-DD HH:mm:ss')
    }

    const newAccId = await knex('tbl_account_comments')
        .returning('acom_id')
        .insert(Comments)
    const acc = await knex('tbl_account').where('acc_id', product[0].prod_price_holder)
    if (acc[0].acc_like_bidder === null || acc[0].acc_dis_like_bidder === null) {
        await knex.raw(`update tbl_account set acc_like_bidder = 0, acc_dis_like_bidder = 0 where acc_id = ${product[0].prod_price_holder}`)
    }
    if (Status === 0) {
        await knex.raw(`update tbl_account set acc_like_bidder = acc_like_bidder + 1 where acc_id = ${product[0].prod_price_holder}`)
    }
    else {
        await knex.raw(`update tbl_account set acc_dis_like_bidder = acc_dis_like_bidder + 1 where acc_id = ${product[0].prod_price_holder}`)
    }


    return res.status(200).json({
        statusCode: successCode,
        acoms_id: newAccId[0]
    })
})

router.post('/get-comment', async (req, res) => {
    const { prodId } = req.body
    const id = req.account['accId']
    const product = await knex('tbl_product').where('prod_id', prodId)
    if (product.length === 0) {
        return res.status(400).json({
            errorMessage: 'sản phẩm không tồn tại',
            statusCode: errorCode
        })
    }
    var result = await knex.raw(`select * from tbl_account_comments c
								join tbl_product p on c.acom_product_id = p.prod_id
								join tbl_account a on a.acc_id = c.acom_assessor where c.acom_receiver = ${id}
                                 and p.prod_id = ${prodId}
								`)


    result = result.rows

    var status_rating = 'Like'
    if (result[0].acom_status_rating === 1) {
        status_rating = 'Dis Like'
    }
    if (result[0].acom_status_rating === 2) {
        status_rating = 'Hủy giao dịch'
    }
    result[0].acom_status_rating = status_rating
    return res.status(200).json({
        commentList: result,
        statusCode: successCode
    })
})


router.post('/postAuctionProduct', validator.postAuctionProduct, async (req, res) => {
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
    var dateEnd = prodEndDate + ':00'
    dateEnd = dateEnd.split('T')
    var dateToEnd = dateEnd[0] + ' ' + dateEnd[1]
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
            .then(function (result) {
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
    prodImages.forEach(async (image) => {

        let url = await uploaderImage(image);

        await knex('tbl_product_images').insert({
            prod_img_product_id: prodId,
            prod_img_data: url,
            prod_img_status: 0
        });

        if (mainImage == null) {
            mainImage = url;
            await knex('tbl_product').where({ prod_id: prodId }).update({ prod_main_image: mainImage });
        }
    })
    return res.status(200).json({
        data: true,
        statusCode: successCode
    })
})

router.post('/updateAuctionProductDescription', validator.updateAuctionProductDescription, async (req, res) => {
    const { prodId, prodDescription } = req.body
    const now = new Date(Date.now())
    try {
        await knex('tbl_product').where({ prod_id: prodId }).update({ prod_description: prodDescription, prod_updated_date: now })
    } catch (e) {
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

router.post('/deleteAuctionProduct', validator.deleteAuctionProduct, async (req, res) => {
    const { prodId } = req.body
    const now = new Date(Date.now())
    await knex('tbl_product').where({ prod_id: prodId }).update({ prod_status: 1, prod_updated_date: moment(now).format('YYYY-MM-DD HH:mm:ss') })
    return res.status(200).json({
        data: true,
        statusCode: successCode
    })
})


router.post('/get-bidder-comment', validator.verifyBidderComment, async (req, res) => {
    // const { prodID } = req.body
    const { page, limit, bidderID } = req.body


    //check user role is valid
    var result = await knex.raw(`
     select *
     from tbl_account acc
     where acc_id = ${bidderID}
 `)

    if (result.rows.length == 0) {
        return res.status(200).json({
            statusCode: errorCode,
            errorMessage: "Account không tồn tại!"
        })
    }

    if (result.rows[0].acc_role != 'BID') {
        return res.status(200).json({
            statusCode: errorCode,
            errorMessage: "Account không phải là người đấu giá!"
        })
    }
   

    const offset = limit * (page - 1)

    var numberPage = await knex.raw(`select  count(acBid.acc_id)
	from tbl_account_comments, tbl_account acBid
	where acBid.acc_id = acom_receiver 
	and acBid.acc_role = 'BID'
	and acBid.acc_id = ${bidderID}
	group by acBid.acc_id`)
    console.log(`select  count(acBid.acc_id)
	from tbl_account_comments, tbl_account acBid
	where acBid.acc_id = acom_receiver 
	and acBid.acc_role = 'BID'
	and acBid.acc_id = ${bidderID}
	group by acBid.acc_id`)

    numberPage = Number(numberPage.rowCount)

    if (numberPage > limit) {
        numberPage = Math.ceil(numberPage / limit)
    }
    else {
        numberPage = 1
    }

    console.log(`
	select  acBid.acc_full_name, acom_note
	from tbl_account_comments, tbl_account acBid
	where acBid.acc_id = acom_receiver 
	and acBid.acc_role = 'BID'
    and acBid.acc_id = ${bidderID}
	offset ${offset} limit ${limit}
	`)


    //get all comment of seller
    var result = await knex.raw(`
	select  acBid.acc_full_name, acom_note
	from tbl_account_comments, tbl_account acBid
	where acBid.acc_id = acom_receiver 
	and acBid.acc_role = 'BID'
    and acBid.acc_id = ${bidderID}
	offset ${offset} limit ${limit}
	`)


    console.log(result.rows[0])

    return res.status(200).json({
        statusCode: successCode,
        commentList: result.rows,
        numberOfPage: numberPage
    })
})



module.exports = router;