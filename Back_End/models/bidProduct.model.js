const knex = require('../utils/dbConnection')
const mailService = require('../services/mailService')
const mailOptions = require('../template/mailOptions')
const ws = require('../ws')

const bidding = async (priceBid, product, prodId, account) => {
	//-------================ bidding
    //bidder first
	let ListAccount = await knex.raw(`select distinct his_account_id from tbl_product_history where his_product_id = ${prodId} and his_account_id != ${account[0].acc_id} and his_status != 2 and his_status != 3`)
	ListAccount = ListAccount.rows
	const ConverListToString = (ListAccount) =>{
		let StringId = ''
		for(const la of ListAccount){
			StringId += '|' + la.his_account_id
		}
		return StringId
	}
	if(product[0].prod_price_holder === null){
		if(Number(priceBid) >= Number(product[0].prod_price_starting)){
			await knex('tbl_product').where("prod_id", prodId).update({prod_price_highest: priceBid, prod_price_holder: account[0].acc_id, prod_price_current: product[0].prod_price_starting})

			product[0].prod_price_current = product[0].prod_price_starting

			const checkmailBid = await mailService.sendMail(mailOptions.notifyBidSuccessToBidder(account, product, priceBid))
			const checkmailSeller = await mailService.sendMail(mailOptions.notifyBidSuccessToSeller(account, product, priceBid))
			
			if(checkmailBid === false || checkmailSeller === false){
				return {
					message: "Gửi email không thành công !",
					statusCode: 2
				}
			}
			let msgBroadCast = prodId + '|' + product[0].prod_price_current + '|' + product[0].prod_name
			msgBroadCast += ConverListToString(ListAccount)
			ws.broadCastAll(msgBroadCast)
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

		
		var checkmailBid = await mailService.sendMail(mailOptions.notifyBidSuccessToBidder(account, product, priceBid))
		var checkmailSeller = await mailService.sendMail(mailOptions.notifyBidSuccessToSeller(account, product, priceBid))
		var checkmailBidOld = true

		if(account[0].acc_id !== product[0].prod_price_holder){
			var accountHolder = await knex('tbl_account').where("acc_id", product[0].prod_price_holder)
			checkmailBidOld = await mailService.sendMail(mailOptions.notifyBidSuccessToOldBidder(account, product, accountHolder))
		}


		if (checkmailBid === false || checkmailSeller === false || checkmailBidOld === false){
			return {
				message: "Gửi email không thành công !",
				statusCode: 2
			}
		}

		let msgBroadCast = prodId + '|' + product[0].prod_price_current + '|' + product[0].prod_name
		msgBroadCast += ConverListToString(ListAccount)
		ws.broadCastAll(msgBroadCast)

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

		//notify all other people
		let msgBroadCast = prodId + '|' + priceBid + '|' + product[0].prod_name
		msgBroadCast += ConverListToString([])
		ws.broadCastAll(msgBroadCast)

		return {
			message: "Đấu giá không thành công !",
			statusCode: 1
		}
	}

    // bidder bidPrice < prod_price_current + prod_price_step
	else{
		var priceMin = Number(product[0].prod_price_current) + Number(product[0].prod_price_step)
		return{
			message: `Đấu giá không thành công, giá tối thiểu cho sản phẩm này là: ${priceMin} VND!`,
			statusCode: 1
		}
	}
}
module.exports = {
	bidding
}
