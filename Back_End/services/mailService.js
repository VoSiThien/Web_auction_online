const sendgrid = require('@sendgrid/mail')
const environment = require('../environments/environment')
const nodemailer = require('nodemailer')

const errorCode = 1
const successCode = 0

// const sendMail = async (mailOptions, req, res) => {

//     sendgrid.setApiKey(environment.SENDGRID_API_KEY)

    
//     await sendgrid.send(mailOptions, (error, result) => {
// 		if (error) {
// 			return res.status(500).json({
// 				errorMessage: error,
// 				statusCode: errorCode
// 			})
// 		}
// 	})
// }
const sendMailTran = async (mailOptions) => {
	const fromEmail = environment.mailConfig.user
	const password = environment.mailConfig.pass

	var transporter = nodemailer.createTransport(`smtps://${fromEmail}:${password}@smtp.gmail.com`)
	
	await transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error)
			return false
		}
	})
	return true

}


module.exports = {
    sendMailTran
}