const path = require('path') // built in module
const http = require('http') // built in module

const express = require('express');
const socketIo = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const {Users} = require('./utils/users');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

var app = express();
var server = http.createServer(app); // app.listen will create a server behind the scene, we want to customise that
var io = socketIo(server); // socketio bind to the server
var users = new Users();


io.on('connection', (socket) => { // connection from a client will provide socket, which we will use for further comm
  console.log('connection from the client');

  // socket.emit --> emits to specific socket
  //socket.emit('newMessage', {from: 'shijupaul', text: 'shall we meet this evening', createdAt: new Date()});

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and Room name are required');
    }
    socket.join(params.room); // join room
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);


    // socket.leave(params.room); // leave the room
    // io.to('room name').emit // emit to members of specific Room
    // socket.broadcast.to('room name').emit // emit to everyone in the room except the current user

    io.to(params.room).emit('updateUserList', users.getUsersList(params.room));
    socket.emit('welcomeMessage', generateMessage('Admin', 'welcome to the chat'));
    socket.broadcast.to(params.room).emit('userJoined', generateMessage('Admin', `User ${params.name} has joined`));

    callback();
  });


  // callback to emit acknowledgement
  socket.on('createMessage', (message, callback) => {
    console.log('new message', message);
    var user = users.getUser(socket.id);

    if (!isRealString(message.test)) {
      return callback(`Message received from ${user.name} (User) is not valid. ${message.text}`);
    }

    //io.emit --> emits to everyone
    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    callback();

    // socket.broadcast.emit --> broadcast to everyone except the current socket
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  })

  socket.on('createLocationMessage', (message, callback) => {
    console.log('createLocationMessage', message);
    var user = users.getUser(socket.id)
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, message.latitude, message.longitude));
    callback();
  })

  socket.on('disconnect', () => {  // same socket from client is used for various things
    console.log('client disconnected');
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUsersList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  })


})

app.use(express.static(publicPath));

// server.listen instead of app.listen
server.listen(port, () => {
  console.log(`server is up on port ${port}`)
});
