const knex = require('../utils/dbConnection')
const mailService = require('../services/mailService')
const mailOptions = require('../template/mailOptions')

const bidding = async (priceBid, product, prodId, account) => {
	//-------================ bidding
    //bidder first
	if(product[0].prod_price_holder === null){
		if(Number(priceBid) >= Number(product[0].prod_price_starting)){
			await knex('tbl_product').where("prod_id", prodId).update({prod_price_highest: priceBid, prod_price_holder: account[0].acc_id, prod_price_current: product[0].prod_price_starting})

			product[0].prod_price_current = product[0].prod_price_starting

			const checkmailBid = await mailService.sendMailTran(mailOptions.notifyBidSuccessToBidder(account, product, priceBid))
			const checkmailSeller = await mailService.sendMailTran(mailOptions.notifyBidSuccessToSeller(account, product, priceBid))
			
			if(checkmailBid === false || checkmailSeller === false){
				return {
					message: "Gửi email không thành công !",
					statusCode: 2
				}
			}
			return {
				message: "Đấu giá thành công !",
				statusCode: 0
			}
		}
		return {
			message: "Đấu giá không thành công !",
			statusCode: 1
		}
	}

	var priceSS = Number(product[0].prod_price_highest) + Number(product[0].prod_price_step)

    //bidder next success
	if (Number(priceBid) >= priceSS) {
		await knex('tbl_product').where("prod_id", prodId).update({ prod_price_highest: priceBid, prod_price_holder: account[0].acc_id, prod_price_current: priceSS.toString() })

		product[0].prod_price_current = priceSS.toString()

		var checkmailBid = await mailService.sendMailTran(mailOptions.notifyBidSuccessToBidder(account, product, priceBid))
		var checkmailSeller = await mailService.sendMailTran(mailOptions.notifyBidSuccessToSeller(account, product, priceBid))
		var checkmailBidOld = true

		if(account[0].acc_id !== product[0].prod_price_holder){
			var accountHolder = await knex('tbl_account').where("acc_id", product[0].prod_price_holder)
			checkmailBidOld = await mailService.sendMailTran(mailOptions.notifyBidSuccessToOldBidder(account, product, accountHolder))
		}

		if (checkmailBid === false || checkmailSeller === false || checkmailBidOld === false){
			return {
				message: "Gửi email không thành công !",
				statusCode: 2
			}
		}
		return {
			message: "Đấu giá thành công !",
			statusCode: 0
		}
	}

    //bidder next failed, update price current (bidPrice <= prod_price_highest && bidPrice >= prod_price_current + prod_price_step)
	else if(Number(priceBid) >= Number(product[0].prod_price_starting) + Number(product[0].prod_price_step) &&
	Number(priceBid) >= Number(product[0].prod_price_current) + Number(product[0].prod_price_step) &&
	Number(priceBid) <= Number(product[0].prod_price_highest)){
		await knex('tbl_product').where("prod_id", prodId).update({ prod_price_current: priceBid })

		return {
			message: "Đấu giá không thành công !",
			statusCode: 1
		}
	}

    // bidder bidPrice < prod_price_current + prod_price_step
	else{
		return{
			message: "Đấu giá không thành công !",
			statusCode: 1
		}
	}
}
module.exports = {
	bidding
}
