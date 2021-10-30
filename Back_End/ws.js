const WebSocket = require('ws')

const WS_PORT = 45678

let socketServer;
if(!socketServer){
    socketServer = new WebSocket.Server({
        port:WS_PORT
    })

    socketServer.on('connection', function(client){
        console.log('client connect successfully')
        // client.on('message', function(msg){
        //     console.log(`message: ${msg}`)
        //     client.send('hello client')
        // })
    })
    console.log('websocket server running')
}
function broadCastAll(msg){
    for(c of socketServer.clients){
        if(c.readyState === WebSocket.OPEN){
            c.send(msg)
        }
    }
}
module.exports = {
    broadCastAll
}