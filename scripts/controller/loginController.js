var loginController = {};

// OVERARCHING FUNCTION FOR LOGIN FORM PAGE
loginController.showLogin = function() {
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
  // TODO: replace with page.js call
  $(location).attr('href', '/wall.html');
};


// ===== TO ROUTER =====
loginController.showLogin();
