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
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    from: data.from,
    text: data.text,
    createdAt: moment(data.createdAt).format('h:mm:ss a')
  });
  jQuery('#messageList').append(html);
  scrollToBottom();

  // console.log('New message received', data);
  // showMessage(data);
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

  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: data.from,
    url: data.url,
    createdAt: moment(data.createdAt).format('h:mm:ss a')
  });
  jQuery('#messageList').append(html);
  scrollToBottom();
  // var li = jQuery('<li></li>');
  // li.text(`Message From: ${data.from} at ${moment(data.createdAt).format('h:mm a')}`);
  //
  // var a = jQuery('<a target="_blank">User Location</a>');
  // a.attr('href', data.url);
  // li.append('&nbsp;')
  // li.append(a);
  // jQuery('#messageList').append(li);
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
  var messageTextBox = jQuery('[name=message]')
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function(data) {
    console.log('acknowledgement received.', data)
    messageTextBox.val('')
  });
})

var sendLocationButton = jQuery('#send-location')
sendLocationButton.on('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }
  sendLocationButton.attr('disabled', 'disabled').text('Sending location.....');
  navigator.geolocation.getCurrentPosition(function(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(`latitude: ${latitude}, longitude: ${longitude}`);
    socket.emit('createLocationMessage', {latitude,longitude}, () => {
      sendLocationButton.removeAttr('disabled').text('Send location')
    });
  }, function(){
    sendLocationButton.removeAttr('disabled').text('Send location')
    alert('unable to fetch location');
  });
});


function showMessage(message) {
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}, received at: ${moment(message.createdAt).format('h:mm:ss a')}`);
  jQuery('#messageList').append(li);
}


function scrollToBottom() {
  var messageList = jQuery('#messageList');
  var newMessage = messageList.children('li:last-child');

  var scrollHeight = messageList.prop('scrollHeight');
  var scrollTop = messageList.prop('scrollTop');
  var clientHeight = messageList.prop('clientHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (scrollTop + clientHeight  + newMessageHeight + lastMessageHeight>= scrollHeight) {
    messageList.scrollTop(scrollHeight);
  }
}
