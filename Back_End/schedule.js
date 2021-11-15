
const cron = require('node-cron');
const knex = require('./utils/dbConnection')
const moment = require('moment')
const mailService = require('./services/mailService')
const mailOptions = require('./template/mailOptions')

cron.schedule('* * * * *', async () => {//update every minute

  var currentTimeStamp = moment().format('YYYY-MM-DD HH:mm:ss')
  
  var prod_id = await knex.raw(`
    with up as(update tbl_product
    set prod_status = 1
    where prod_end_date::timestamp <= CURRENT_TIMESTAMP::timestamp and prod_status = 0 returning *)
    select u.*, sel.*, bid.acc_full_name as bidName, bid.acc_email as bidEmail, bid.acc_phone_number as bidPhone
    from (up u left join tbl_account sel on u.prod_seller_id = sel.acc_id)
    left join tbl_account bid on u.prod_price_holder = bid.acc_id`)//when product expires or bidding finishes, update status
  prod_id = prod_id.rows
  if (prod_id.length !== 0){
    var i = 0
    while(i < prod_id.length){
      if(prod_id[i].prod_price_holder === null){
        await mailService.sendMail(mailOptions.notifyToSellerWhenProductEndNotBid(prod_id[i]))
      }
      else{
        await mailService.sendMail(mailOptions.notifyToBidderWhenProductEnd(prod_id[i]))
        await mailService.sendMail(mailOptions.notifyToSellerWhenProductEndExistsBid(prod_id[i]))
      }
      i++;
    }
  }
});
