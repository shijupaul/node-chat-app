const expect = require('expect')
const {generateMessage, generateLocationMessage} = require('./message');

describe('message.js test', () => {
  it('should create expected object when generateMessage called', () => {
    var from = 'shijupaul'
    var text = 'hello hello'
    var message = generateMessage(from,text);
    expect(message.from).toBe(from)
    expect(message.text).toBe(text)
    expect(message.createdAt).toBeTruthy()
  })

  it('should create expected object when generateLocationMessage called', () => {
    var from = 'shijupaul'
    var latitude = '52.437399799999994'
    var longitude = '-1.9799083'
    var message = generateLocationMessage(from,latitude, longitude);
    expect(message.from).toBe(from)
    expect(message.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`)
    expect(message.createdAt).toBeTruthy()
  })
})
