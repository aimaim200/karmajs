'use strict';

// Has a dependency on a UserStorage implementation
function UserController(userStorage) {
  this.userStorage = userStorage;
}

UserController.prototype.getUserTemplate = function() {
  if (this.userTemplate) {
    return Promise.resolve(this.userTemplate);
  } else {
    this.userTemplate = UserTemplate;
    return Promise.resolve(this.userTemplate);
  }
};

/*
UserController.prototype.get = function(id) {
  return new UserModel(this.userStorage.get(id));
};

UserController.prototype.find = function(userModel) {
  return new UserModel(this.userStorage.find(userModel));
};

UserController.prototype.delete = function(id) {
  return this.userStorage.delete(id);
};

UserController.prototype.add = function(userModel) {
  return this.userStorage.add(userModel);
};
*/

// Only need this one for this example
UserController.prototype.save = function(userModel) {
  return this.userStorage.save(userModel);
};


