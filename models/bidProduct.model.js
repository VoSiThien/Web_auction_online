const knex = require('../utils/dbConnection')

const bidding = async (priceBid, product, prodId, accId) => {
	//-------================ bidding
    //bidder first
	if(product[0].prod_price_holder === null){
		if(Number(priceBid) >= Number(product[0].prod_price_starting)){
			await knex('tbl_product').where("prod_id", prodId).update({prod_price_highest: priceBid, prod_price_holder: accId, prod_price_current: product[0].prod_price_starting})

			return {
				message: "success",
				statusCode: 0
			}
		}
		return {
			message: "failed",
			statusCode: 1
		}
	}

	var priceSS = Number(product[0].prod_price_highest) + Number(product[0].prod_price_step)

    //bidder next success
	if (Number(priceBid) >= priceSS) {
		await knex('tbl_product').where("prod_id", prodId).update({ prod_price_highest: priceBid, prod_price_holder: accId, prod_price_current: priceSS.toString() })

		return {
			message: "success",
			statusCode: 0
		}
	}

    //bidder next failed, update price current (bidPrice <= prod_price_highest && bidPrice >= prod_price_current + prod_price_step)
	else if(Number(priceBid) >= Number(product[0].prod_price_starting) + Number(product[0].prod_price_step) &&
	Number(priceBid) >= Number(product[0].prod_price_current) + Number(product[0].prod_price_step) &&
	Number(priceBid) <= Number(product[0].prod_price_highest)){
		await knex('tbl_product').where("prod_id", prodId).update({ prod_price_current: priceBid })

		return {
			message: "failed",
			statusCode: 1
		}
	}

    // bidder bidPrice < prod_price_current + prod_price_step
	else{
		return{
			message: "failed",
			statusCode: 1
		}
	}
}
module.exports = {
	bidding
}
