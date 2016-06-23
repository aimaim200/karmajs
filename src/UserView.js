'use strict';

function UserView(userController) {
  this.controller = userController;
  var view = this;
  $("#users").delegate('.inplace', 'keypress', function(event) {
    if (event.which === 13) {
      var me = $(this);

      // Get values from HTML
      var users = $(this).parent().parent();
      var id = users.find('.user-id').text();
      var name = users.find('.user-name input').val() 
        || users.find('.user-name').text();
      var email = users.find('.user-email input').val() 
        || users.find('.user-email').text();
      var favColor = users.find('.user-favorite-color input').val() 
        || users.find('.user-favorite-color').text();

      // Now save & update the view
      try {
        var userModel = new UserModel({id: id, name: name, email: email, favoriteColor: favColor });
        userController.save(userModel)
        .then(function(returnedUserModel) {
          view.fillTemplate(returnedUserModel).then(function(template) {
            users.replaceWith(template);
          });
        })
        .catch(function(error) {
          alert('error saving user: ' + error);
        });
      } catch(e) {
        alert('illegal value! ' + e);
        me.select();
      }
    }
  });

  // handle all delegated click events to turn placeholders into editable <input type="text">
  $("#users").on('click', '.user-name,.user-email,.user-favorite-color', function(event) {
    if (!$(this).html().match(/<input/)) {
      $(this).html('<input class="inplace" type="text" value="' + $(this).text() + '"></input>');
      $(this).find('input').focus().select();
    }
  });
}

// Get the user template and fill ito out with userModel values
UserView.prototype.fillTemplate = function(userModel) {
  return this.controller.getUserTemplate()
    .then(function(template) {
      template = template.replace(/ID/g, userModel.id);
      template = template.replace(/NAME/g, userModel.name);
      template = template.replace(/EMAIL/g, userModel.email);
      template = template.replace(/COLOR/g, userModel.favoriteColor);
      return template;
    });
};

// Append a user to UI
UserView.prototype.appendUser = function(userModel) {
  var me = this;
  return new Promise(function(resolve, reject) {
    me.fillTemplate(userModel)
      .then(function(template) {
        $('#users').append(template);
        resolve();
      })
      .catch(function(error) {
        reject(error);
      });
  });
};
