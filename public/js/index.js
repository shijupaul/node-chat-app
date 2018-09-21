var socket = io();
// Arrow function may not work in all browsers
socket.on('connect', function(data) {
  console.log('connected to server', data);

  // emitting this after successfully connected
  // socket.emit('createMessage', {from:'shijupaul', text: 'message from client'});
})

socket.on('disconnect', function(data) {
  console.log('disconnected from server', data);
});

socket.on('newMessage', function(data) {
  console.log('New message received', data);
})
