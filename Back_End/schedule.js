
const cron = require('node-cron');
const knex = require('./utils/dbConnection')
const moment = require('moment')

cron.schedule('* * * * *', async () => {//update every minute

  var currentTimeStamp = moment().format('YYYY-MM-DD HH:mm:ss')
  
  var prod_id = await knex.raw(`
    update tbl_product
        set prod_status = 1
        where DATE_PART('minute', '${currentTimeStamp}'::timestamp - prod_end_date::timestamp ) >= 0 and prod_status = 0 returning (prod_id)`)//when product expires or bidding finishes, update status
  if (prod_id != null)
    console.log(prod_id.rows)
});
