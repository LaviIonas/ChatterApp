//server.js
const express = require('express');
const uuidV4 = require('uuid/v4');
const SocketServer = require('ws').Server;
const PORT = 3001;
//
const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () =>
        console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({ server });
//function to send message with error handling
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
//function to send message to each existing client (using a forEach)
function broadcastMessage(message) {
  const messageAsString = JSON.stringify(message);
  wss.clients.forEach(function each(client) {
    sendMessage(client, messageAsString);
  });
}
//function to construct a 'system' message that notifies the users console of online activity (connections and disconections)
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
//Upon connection, run following code
wss.on('connection', function connection(ws) {
    console.log("Client connected; number of clients connected:", wss.clients.size);
    //broadcasts to all clients a system message that a new user connected with the amount of current users
    broadcastMessage(systemMessage("connected", wss.clients.size));

    //On message parse incoming data and assign a uuidV4 to each message
    ws.on('message', function incoming(data) {
        console.log("recieved message");
        let incomingData = JSON.parse(data);
        incomingData.id = uuidV4();

        // Broadcast to all.
        broadcastMessage(incomingData);
    });

    //On close once again broadcast to clients' console that a user has disconnected
    ws.on('close', () =>{
        const disconnectMessage = JSON.stringify(systemMessage("disconnected", wss.clients.size));
        // send an updated to everyone
        wss.clients.forEach(function each(client) {
              sendMessage(client, disconnectMessage);
            });
        console.log('Client disconnected; number of clients connected:', wss.clients.size);
    });
});