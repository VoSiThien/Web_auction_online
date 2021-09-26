require('dotenv').config()
console.log(process.env.LOCAL_CONNECTION)
const env = {
	portServer: 3000,
	configDatabase: {
		connectionString: process.env.LOCAL_CONNECTION,
	},
	secret: 'Auction_online_secret',
	APP_ID: 'test_id',
	APP_PASSWORD: 'test_password',
	APP_SCOPE: '',
	APP_REDIRECT_URI: 'localhost:3000',
	mailConfig: {
		user: 'AuctionOnline099@gmail.com',
		pass: 'auctiononline'
	}
}

module.exports = env
