var loginView = {};

loginView.signInWarning = function(msg) {
  $('#sign-in-warning').show().text(msg);
};

loginView.registerWarning = function(msg) {
  $('#register-warning').show().text(msg);
};
