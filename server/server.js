const path = require('path') // built in module
const http = require('http') // built in module

const express = require('express');
const socketIo = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const {generateMessage, generateLocationMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app); // app.listen will create a server behind the scene, we want to customise that
var io = socketIo(server); // socketio bind to the server

io.on('connection', (socket) => { // connection from a client will provide socket, which we will use for further comm
  console.log('connection from the client');

  // socket.emit --> emits to specific socket
  //socket.emit('newMessage', {from: 'shijupaul', text: 'shall we meet this evening', createdAt: new Date()});

  socket.emit('welcomeMessage', generateMessage('Admin', 'welcome to the chat'));
  socket.broadcast.emit('userJoined', generateMessage('Admin', 'new user joined'));

  // callback to emit acknowledgement
  socket.on('createMessage', (message, callback) => {
    console.log('new message', message);
    //io.emit --> emits to everyone
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback(`Received message from ${message.from} with text ${message.text}. and all is good`);

    // socket.broadcast.emit --> broadcast to everyone except the current socket
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  })

  socket.on('createLocationMessage', (message, callback) => {
    console.log('createLocationMessage', message);
    io.emit('newLocationMessage', generateLocationMessage('Admin', message.latitude, message.longitude));
    callback();
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
