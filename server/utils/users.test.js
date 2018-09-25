const expect = require('expect');
const {Users} = require('./Users');

describe('users.js', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'shiju paul',
      room: 'react course'
    },{
      id: 2,
      name: 'jeena shiju',
      room: 'node course'
    },{
      id: 3,
      name: 'joel joseph',
      room: 'node course'
    },{
      id: 4,
      name: 'joshua joseph',
      room: 'node course'
    }]
  })


  it('should addUser', () => {
    var users = new Users();
    var user = {id: '123',name:'shiju paul', room: 'franco'}
    expect(users.addUser(user.id, user.name, user.room)).toEqual(user);
    expect(users.users).toEqual([user]);
  })

  it('should return name of the users belongs to a react course room', () => {
    var userNames = users.getUsersList('react course');
    expect(userNames).toEqual([users.users[0].name]);
  })

  it('should return name of the users belongs to a node course room', () => {
    var userNames = users.getUsersList('node course');
    expect(userNames).toEqual([users.users[1].name, users.users[2].name, users.users[3].name]);
  })

  it('should remove a user', () => {
    var userId = users.users[0].id;
    var removedUser = users.removeUser(userId);
    expect(removedUser.id).toBe(userId);
    expect(users.users.length).toBe(3);
  })

  it('should not remove a user', () => {
    var removedUser = users.removeUser(5);
    expect(removedUser).toBeUndefined();
    expect(users.users.length).toBe(4);
  })

  it('should find a user', () => {
    var user = users.getUser(users.users[0].id);
    expect(user).toEqual(users.users[0]);
  })

  it('should not find a user', () => {
    var user = users.getUser(5);
    expect(user).toBeUndefined();
  })
})
