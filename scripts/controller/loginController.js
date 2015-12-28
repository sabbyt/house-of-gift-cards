var loginController = {};

loginController.showLogin = function() {
  $('section, #index-header').hide();
  $('#sec-login').fadeIn();
  login.getUserLibrary(loginController.init);
};

loginController.init = function() {
  loginController.handleSignIn();
  loginController.handleRegister();
  console.log('init complete');
};

loginController.handleSignIn = function() {
  $('#sign-in-submit').on('click', function(event) {
    event.preventDefault();
    $('#sign-in-warning').hide();
    login.checkSignIn();
  });
};

loginController.handleRegister = function() {
  $('#register-submit').on('click', function(event) {
    event.preventDefault();
    $('#register-warning').hide();
    login.checkRegister();

  });
};

loginController.sendToWall = function() {
  page('/wall');
};
