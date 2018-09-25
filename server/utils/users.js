class Users {
  constructor() {
    this.users = []; // we don't have to define the variables upfront
  }
  addUser(id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var userToRemove = this.getUser(id);
    if (userToRemove) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return userToRemove;
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUsersList(room) {
    var users = this.users.filter((user) => user.room === room);
    var userNames = users.map((user) => user.name);
    return userNames;
  }
}

module.exports = {Users}
