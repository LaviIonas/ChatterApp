const express = require('express');
const SocketServer = require('ws');
const PORT = 3001;
const server = express().use(express.static('public')).listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer.Server({server});
wss.on('connection', function connection(ws) {
    // console.log(wss.clients.size);

    ws.on('message', function incoming(data) {
        // Broadcast to everyone else.
        let incomingData = JSON.parse(data);
        incomingData.usersOnline = wss.clients.size;
        console.log(incomingData);
        //json parse data, add key, strigify and send
        wss.clients.forEach(function each(client) {
            if (client.readyState === SocketServer.OPEN) {
                client.send(JSON.stringify(incomingData));
            }
        });
    });
});

