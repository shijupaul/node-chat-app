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
  showMessage(data);
})

socket.on('welcomeMessage', function(data) {
  console.log(data);
  showMessage(data);
})

socket.on('userJoined', function(data) {
  console.log(data);
  showMessage(data);
})

socket.on('newLocationMessage', function(data) {
  var li = jQuery('<li></li>');
  li.text(`Message From: ${data.from}`);

  var a = jQuery('<a target="_blank">User Location</a>');
  a.attr('href', data.url);

  li.append(a);
  jQuery('#messageList').append(li);
})
// emitting with acknowledgement
// socket.emit('createMessage',
//   {from:'shijupaul',
//    text: 'message from client expecting acknowledgement back'},
//  function(data) { // callback to handle acknowledgement from server
//    console.log('acknowledgement received.', data);
//  });


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault(); // prevent page refresh --> default behavior
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(data) {
    console.log('acknowledgement received.', data)
  });
})

jQuery('#send-location').on('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(`latitude: ${latitude}, longitude: ${longitude}`);
    socket.emit('createLocationMessage', {latitude,longitude});
  }, function(){
    alert('unable to fetch location');
  });
});


function showMessage(message) {
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messageList').append(li);
}
