//server.js
const express = require('express');
const uuidV4 = require('uuid/v4');
//
const SocketServer = require('ws').Server;
const PORT = 3001;
//
const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () =>
        console.log(`Listening on ${ PORT }`));
//
const wss = new SocketServer({ server });
//
function sendMessage(socket, messageAsString) {
  try {
    socket.send(messageAsString, (error) => {
      if(error) {
        console.log(error);
      }
    });
  } catch(error){
    console.log(error);
  }
}
//
function broadcastMessage(message) {
  const messageAsString = JSON.stringify(message);
  wss.clients.forEach(function each(client) {
    sendMessage(client, messageAsString);
  });
}
//
function systemMessage(event, onlineCount) {
  const message = {
    id: uuidV4(),
    type: "Status",
    event: event,
    onlineCount: onlineCount
  };
  console.log(message);
  return message;
}
//
wss.on('connection', function connection(ws) {
    console.log("Client connected; number of clients connected:", wss.clients.size);
    broadcastMessage(systemMessage("connected", wss.clients.size));

    ws.on('message', function incoming(data) {
        console.log("recieved message");
        let incomingData = JSON.parse(data);
        incomingData.id = uuidV4();

        // Broadcast to all.
        broadcastMessage(incomingData);
    });

    ws.on('close', () =>{
        const disconnectMessage = JSON.stringify(systemMessage("disconnected", wss.clients.size));

        // send an updated to everyone else except for the disconnected users
        wss.clients.forEach(function each(client) {
              sendMessage(client, disconnectMessage);
            });
        console.log('Client disconnected; number of clients connected:', wss.clients.size);
    });
});