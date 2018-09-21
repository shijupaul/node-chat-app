const path = require('path') // built in module
const http = require('http') // built in module

const express = require('express');
const socketIo = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app); // app.listen will create a server behind the scene, we want to customise that
var io = socketIo(server); // socketio bind to the server

io.on('connection', (socket) => { // connection from a client will provide socket, which we will use for further comm
  console.log('connection from the client');

  // socket.emit --> emits to specific socket
  //socket.emit('newMessage', {from: 'shijupaul', text: 'shall we meet this evening', createdAt: new Date()});

  socket.on('createMessage', (message) => {
    console.log('new message', message);
    //io.emit --> emits to everyone
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })

  socket.on('disconnect', () => {  // same socket from client is used for various things
    console.log('client disconnected');
  })
})

app.use(express.static(publicPath));

// server.listen instead of app.listen
server.listen(port, () => {
  console.log(`server is up on port ${port}`)
});
