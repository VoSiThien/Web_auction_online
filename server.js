const environment = require('./environments/environment')
const server = require('./routers_config/server')
//const routers = require('./routers_config/routers')

server.set('port', environment.portServer)
//server.use(routers)

module.exports = server