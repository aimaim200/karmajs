'use strict';

// The Interface
var UserStorage = {
  get: function(id) {},
  find: function(model) {},
  delete: function(id) {},
  add: function(model) {},
  save: function(model) {}
};

var AjaxStorage = function() {};

AjaxStorage.prototype = Object.create(UserStorage);

AjaxStorage.prototype.get = function(id) {
  var promise = new Promise(function(resolve, reject) {
    $.getJSON('/user', { id: id })
    .done(function(data) { resolve(data); })
    .fail(function(jqxhr, textStatus, error) { reject(error); });
  });
  return promise;
};

// Implement 'save'
AjaxStorage.prototype.save = function(userModel) {
//  return Promise.resolve(userModel);

  // How it would actually look...
  // Must run Chrome with '--allow-file-access-from-files'
  var promise = new Promise(function(resolve, reject) {
    $.post('/user', JSON.stringify(userModel))
    .done(function(data) { resolve(data); })
    .fail(function(jqxhr, textStatus, error) { /*reject(error);*/ resolve(userModel); });
  });
  return promise;
};


