var login = {};
login.ref = new Firebase('https://hogc.firebaseio.com/donors');

// OVERARCHING FUNCTION FOR LOGIN FORM PAGE
login.showLogin = function() {
  login.getUserLibrary(login.init);
};

login.getUserLibrary = function(callback) {
  login.ref.once('value', function(snapshot) {
    login.userLibrary = snapshot.val();
    callback();
  });
};

login.init = function() {
  login.handleSignIn();
  login.handleRegister();
  console.log('init complete');
};

login.handleSignIn = function() {
  $('#sign-in-submit').on('click', function(event) {
    event.preventDefault();
    $('#sign-in-warning').hide();
    var username = login.checkSignIn();
    if (username) {
      // set in LS and redirect
    }
  });
};

login.handleRegister = function() {
  $('#register-submit').on('click', function(event) {
    event.preventDefault();
    $('#register-warning').hide();
    var data = login.checkRegister();
    if (data) {
      // set password
      // insert to firebase
      // save to LS
      // redirect
    }
  });
};

login.checkUserExist = function(usernameInput) {
  var usernameList = login.userLibrary.map(function(donor) {
    return donor.username;
  });
  return usernameList.indexOf(usernameInput);
};

login.showLogin();

login.checkSignIn = function() {
  var usernameInput = $('#sign-in-username').val();
  if (usernameInput.length) {
    var index = login.checkUserExist(usernameInput);
    console.log(index);
    if (index > -1) {
      var passwordInput = $('#sign-in-password').val();
      if (passwordInput === login.userLibrary[index].password) {
        console.log('login success');
        return usernameInput;
      } else {
        $('#sign-in-warning').show().text('Incorrect password');
      }
    } else {
      $('#sign-in-warning').show().text('User does not exist');
    }
  } else {
    $('#sign-in-warning').show().text('Please enter a username');
  }
  return false;
};

login.checkRegister = function() {
  var fName = $('#register-fname').val();
  var lName = $('#register-lname').val();
  var email = $('#register-email').val();
  var org = $('#register-org').val();
  var usernameInput = $('#register-username').val();
  if (fName.length && lName.length && email.length && org.length) {
    if (usernameInput.length) {
      if (login.checkUserExist(usernameInput) > -1) {
        $('#register-warning').show().text('Please enter a username');
      } else {
        return {};
      }
    } else {
      $('#register-warning').show().text('Please enter a username');
    }
  } else {
    $('#register-warning').show().text('All fields are required.');
  }
  return false;
};


// show forms only after query is done
