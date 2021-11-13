const express = require('express')
const router = express.Router()
const knex = require('../utils/dbConnection')
const moment = require('moment');
const validator = require('../middlewares/validation/bidProduct.validate')
const bidProduct = require('../models/bidProduct.model')
const mailService = require('../services/mailService')
const mailOptions = require('../template/mailOptions')

const successCode = 0
const errorCode = 1

router.post('/bid-product', validator.bidProduct, async (req, res) => {
    const { priceBid, prodId } = req.body
    const accId = req.account['accId']
    let present = moment().format('YYYY-MM-DD HH:mm:ss')

    let regexPattern = /^\d+$/
    let resultInteger = regexPattern.test(priceBid);

    if (!resultInteger) {
        return res.status(400).json({
            errorMessage: 'Giá phải thuộc kiểu số !',
            statusCode: errorCode
        })
    }

    var productTime = await knex.raw(`select * from tbl_product where prod_id = ${prodId} and 
                                    to_timestamp(prod_end_date, 'YYYY/MM/DD HH24:MI:SS') > CURRENT_TIMESTAMP`);
                                    
    if(productTime.rows.length === 0){
        return res.status(400).json({
            errorMessage: 'Sản phẩm đã hết thời gian, không thể đấu giá !',
            statusCode: errorCode
        })
    }

    var product = await knex('tbl_product').join('tbl_account', 'acc_id', 'prod_seller_id').where("prod_id", prodId)
    var account = await knex('tbl_account').where("acc_id", accId)
    var historyCheck = await knex('tbl_product_history').where("his_account_id", accId).andWhere("his_status", 3).andWhere("his_product_id", prodId)

    if (historyCheck.length !== 0) {
        return res.status(400).json({
            errorMessage: 'Bạn không thể đấu giá sản phẩm này !',
            statusCode: errorCode
        })
    }

    if (product.length === 0) {
        return res.status(400).json({
            errorMessage: 'Sản phẩm không tồn tại !',
            statusCode: errorCode
        })
    }

    const sumLike = account[0].acc_like_bidder + account[0].acc_dis_like_bidder
    const result = (100 / sumLike) * account[0].acc_like_bidder

    if ((account[0].acc_like_bidder === null) || (account[0].acc_dis_like_bidder === null)) {
        await knex('tbl_product_history').insert({
            his_product_id: prodId,
            his_account_id: accId,
            his_price: priceBid,
            his_status: 2,
            his_created_date: present
        })

        return res.status(400).json({
            message: "Bạn cần được xác nhận bởi người bán !",
            statusCode: errorCode
        })
    }

    else if (result < 80) {
        return res.status(400).json({
            errorMessage: "Đánh giá của bạn phải trên 80% !",
            statusCode: errorCode
        })
    }

    //-------================ bidding
    const resultBid = await bidProduct.bidding(priceBid, product, prodId, account)

    if (resultBid.statusCode === 0) {
        await knex('tbl_product_history').where("his_status", 1).andWhere("his_product_id", prodId).update({ his_status: 0 })

        await knex('tbl_product_history').insert({
            his_product_id: prodId,
            his_account_id: accId,
            his_price: priceBid,
            his_status: 1,
            his_created_date: present
        })

        return res.status(200).json({
            message: resultBid.message,
            statusCode: successCode
        })
    }

    await knex('tbl_product_history').insert({
        his_product_id: prodId,
        his_account_id: accId,
        his_price: priceBid,
        his_status: 0,
        his_created_date: present
    })

    return res.status(400).json({
        errorMessage: resultBid.message,
        statusCode: errorCode
    })
})

router.post('/history-product', validator.historyProduct, async (req, res) => {
    const { page, limit, prodId, status, sortByPrice } = req.body
    const offset = limit * (page - 1)
    const accRole = req.account['accRole']
    const accId = req.account['accId']

    var numberPage = 1;
    if(!(sortByPrice === 'NON' || sortByPrice === 'ASC' || sortByPrice === 'DESC')){
        return res.status(400).json({
            errorMessage: "sortByPrice phải thuộc 3 giá trị: NON, ASC, DESC",
            statusCode: errorCode
        })
    }

    var checkTimeOfProduct = await knex.raw(`select * from tbl_product
                                             where to_timestamp(prod_end_date, 'YYYY/MM/DD HH24:MI:SS') > CURRENT_TIMESTAMP and prod_id = ${prodId}`)
    checkTimeOfProduct = checkTimeOfProduct.rows

    const ListHistory = async () => {
        numberPage = await knex.raw(`select count(distinct his_id) 
	        from tbl_product_history where his_product_id = ${prodId} and his_status != 2 and his_status != 3`)

        if (numberPage.rows.length === 0) {
            numberPage = 1
        }
        else {
            numberPage = Number(numberPage.rows[0].count)
            if (numberPage > limit) {
                numberPage = Math.ceil(numberPage / limit)
            }
            else {
                numberPage = 1
            }
        }

        if (sortByPrice === 'NON') {
            var result = await knex.raw(`select * from tbl_product_history h join tbl_account a
                                    on h.his_account_id = a.acc_id where h.his_product_id = ${prodId} and his_status != 2 and his_status != 3
                                    order by h.his_created_date desc offset ${offset} limit ${limit}`)
        }
        else {
            var result = await knex.raw(`select * from tbl_product_history h join tbl_account a
                                    on h.his_account_id = a.acc_id where h.his_product_id = ${prodId} and his_status != 2 and his_status != 3
                                    order by h.his_price::integer ${sortByPrice} offset ${offset} limit ${limit}`)
        }

        result = result.rows

        var listHistory = []
        var index = 0

        while (index < result.length) {
            var name = result[index].acc_full_name.split(' ');
            var fullName = "****" + name[name.length - 1]
            let item = {
                his_id: result[index].his_id,
                his_created_date: result[index].his_created_date,
                acc_full_name: fullName,
                his_price: result[index].his_price
            }
            listHistory.push(item)
            index++
        }
        return listHistory
    }

    if (accRole === 'SEL') {
        var result
        var checkSeller = await knex('tbl_product').where("prod_seller_id", accId).andWhere("prod_id", prodId)
        if (checkSeller.length !== 0) {
            if (status === 2 || status === 3) {
                numberPage = await knex.raw(`select count(distinct his_id) 
                from tbl_product_history where his_product_id = ${prodId} and his_status = ${status}`)

                if (numberPage.rows.length === 0) {
                    numberPage = 1
                }
                else {
                    numberPage = Number(numberPage.rows[0].count)
                    if (numberPage > limit) {
                        numberPage = Math.ceil(numberPage / limit)
                    }
                    else {
                        numberPage = 1
                    }
                }

                if(sortByPrice === 'NON'){
                    result = await knex.raw(`select * from tbl_product_history h join tbl_account a
                                        on h.his_account_id = a.acc_id where h.his_product_id = ${prodId} and his_status = ${status}
                                        order by h.his_created_date desc offset ${offset} limit ${limit}`)
                }
                else{
                    result = await knex.raw(`select * from tbl_product_history h join tbl_account a
                                        on h.his_account_id = a.acc_id where h.his_product_id = ${prodId} and his_status = ${status}
                                        order by h.his_price::integer ${sortByPrice} offset ${offset} limit ${limit}`)
                }
            }
            else {
                numberPage = await knex.raw(`select count(distinct his_id) 
                from tbl_product_history where his_product_id = ${prodId} and his_status != 2 and his_status != 3`)

                if (numberPage.rows.length === 0) {
                    numberPage = 1
                }
                else {
                    numberPage = Number(numberPage.rows[0].count)
                    if (numberPage > limit) {
                        numberPage = Math.ceil(numberPage / limit)
                    }
                    else {
                        numberPage = 1
                    }
                }
                if(sortByPrice === 'NON'){
                    result = await knex.raw(`select * from tbl_product_history h join tbl_account a
                                        on h.his_account_id = a.acc_id where h.his_product_id = ${prodId} and his_status != 2 and his_status != 3
                                        order by h.his_created_date desc offset ${offset} limit ${limit}`)
                }
                else{
                    result = await knex.raw(`select * from tbl_product_history h join tbl_account a
                                        on h.his_account_id = a.acc_id where h.his_product_id = ${prodId} and his_status != 2 and his_status != 3
                                        order by h.his_price::integer ${sortByPrice} offset ${offset} limit ${limit}`)
                }
            }
            result = result.rows
        }
        else {
            var listHistory = []
            if(checkTimeOfProduct.length !== 0){
                return res.status(200).json({
                    numberOfPage: 1,
                    historyList: listHistory,
                    statusCode: 4 //là sản phẩm chưa hết thời gian đấu giá nên không được xem lịch sử
                })
            }
            listHistory = await ListHistory()

            return res.status(200).json({
                numberOfPage: numberPage,
                historyList: listHistory,
                statusCode: 3 // được xem lịch sử nhưng sản phẩm không thuộc seller này
            })
        }
        

        var listHistory = result

        return res.status(200).json({
            numberOfPage: numberPage,
            historyList: listHistory,
            statusCode: successCode
        })
    }

    var listHistory = []


    if(checkTimeOfProduct.length !== 0){
        return res.status(200).json({
            numberOfPage: 1,
            historyList: listHistory,
            statusCode: 4 //là sản phẩm chưa hết thời gian đấu giá nên không được xem lịch sử
        })
    }
    listHistory = await ListHistory()
    await ListHistory()


    return res.status(200).json({
        numberOfPage: numberPage,
        historyList: listHistory,
        statusCode: successCode
    })
})

//0 ra giá thất bại, 1 ra giá thành công, 2 chờ xác nhận ra giá, 3 ra giá bị từ chối

router.post('/cancel-bid/:id', async (req, res) => {
    const { id } = req.params

    const hisProduct = await knex('tbl_product_history').join('tbl_account', 'acc_id', 'his_account_id').where("his_id", id)

    if (hisProduct.length === 0) {
        return res.status(400).json({
            errorMessage: "Lịch sử đấu giá không tồn tại !",
            statusCode: errorCode
        })
    }

    const product = await knex('tbl_product').join('tbl_account', 'acc_id', 'prod_seller_id').where("prod_id", hisProduct[0].his_product_id)
    //const account = await knex('tbl_account').where("acc_id", hisProduct[0].his_account_id)

    if(hisProduct[0].his_status === 1){
        var hisProductAccount = await knex.raw(`select * from tbl_product_history h, tbl_account a, tbl_product p
                                                where h.his_account_id = acc_id and h.his_account_id != ${hisProduct[0].his_account_id}
                                                and h.his_price::integer >= (p.prod_price_starting::integer + p.prod_price_step::integer)
                                                and p.prod_id = ${hisProduct[0].his_product_id}
                                                and h.his_status = 0
                                                and not exists (select h1.his_id from tbl_product_history h1 
                                                                where h1.his_status = 3 and h1.his_account_id = h.his_account_id)
                                                order by h.his_price desc`)
        hisProductAccount = hisProductAccount.rows

        if(hisProductAccount.length === 0){
            await knex('tbl_product').where("prod_id", hisProduct[0].his_product_id).update({prod_price_current: null, prod_price_highest: null, prod_price_holder: null})
        }
        else{
            await knex.raw(`update tbl_product_history set his_status = 1 where his_id = ${hisProductAccount[0].his_id};
                            update tbl_product set prod_price_holder = ${hisProductAccount[0].his_account_id}, prod_price_highest = ${hisProductAccount[0].his_price} where prod_id = ${hisProductAccount[0].his_product_id}`)

            const checkmailInher = await mailService.sendMail(mailOptions.notifyCancelToBidderInheritance(hisProductAccount, hisProductAccount, hisProductAccount[0].his_price))

            if (checkmailInher === false) {
                return {
                    errorMessage: "Gửi email không thành công !",
                    statusCode: 2
                }
            }
        }
    }

    await knex('tbl_product_history').where("his_id", id).update({ his_status: 3 })

    const checkmailCancel = await mailService.sendMail(mailOptions.notifyCancelToBidder(hisProduct, product, hisProduct[0].his_price))

    if (checkmailCancel === false) {
        return {
            errorMessage: "Gửi email không thành công !",
            statusCode: 2
        }
    }

    return res.status(200).json({
        statusCode: successCode
    })
})

router.post('/confirm-bid/:id', async (req, res) => {
    const { id } = req.params

    const hisProduct = await knex('tbl_product_history').where("his_id", id).andWhere("his_status", 2)

    if (hisProduct.length === 0) {
        return res.status(400).json({
            errorMessage: "Lịch sử đấu giá không tồn tại hoặc trạng thái không phải là xác nhận !",
            statusCode: errorCode
        })
    }

    await knex('tbl_product_history').where("his_id", id).update({ his_status: 0 })

    const product = await knex('tbl_product').join('tbl_account', 'acc_id', 'prod_seller_id').where("prod_id", hisProduct[0].his_product_id)
    const account = await knex('tbl_account').where("acc_id", hisProduct[0].his_account_id)

    const resultBid = await bidProduct.bidding(hisProduct[0].his_price, product, product[0].prod_id, account)

    if (resultBid.statusCode === 0 || resultBid.statusCode === 1) {
        return res.status(200).json({
            statusCode: successCode
        })
    }

    return res.status(400).json({
        errorMessage: resultBid.message,
        statusCode: errorCode
    })
})

module.exports = router