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
        login.signInWarning('Incorrect password');
      }
    } else {
      login.signInWarning('User does not exist');
    }
  } else {
    login.signInWarning('Please enter a username');
  }
  return false;
};



login.handleRegister = function() {
  $('#register-submit').on('click', function(event) {
    event.preventDefault();
    $('#register-warning').hide();
    login.newUserData = login.checkRegister();
    if (login.newUserData) {
      login.registerSetPassword();
      // set password
      // insert to firebase

      // save to LS
      // redirect
    }
  });
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
        login.registerWarning('Username already exists');
      } else {
        var data = {
          username: usernameInput,
          first_name: fName,
          last_name: lName,
          organization: org,
          email: email
        };
        return data;
      }
    } else {
      login.registerWarning('Please enter a username');
    }
  } else {
    login.registerWarning('All fields are required.');
  }
  return false;
};


login.checkUserExist = function(usernameInput) {
  var usernameList = login.userLibrary.map(function(donor) {
    return donor.username;
  });
  return usernameList.indexOf(usernameInput);
};

login.signInWarning = function(msg) {
  $('#sign-in-warning').show().text(msg);
};

login.registerWarning = function(msg) {
  $('#register-warning').show().text(msg);
};


login.registerSetPassword = function() {
  $('#register-password-input').show();
  $('#register input:not(#register-password)').attr('disabled', true);
  $('#register-submit').text('Complete registration').on('click', function(event) {
    event.preventDefault();
    var passwordInput = $('#register-password').val();
    if (passwordInput.length) {
      login.newUserData.password = passwordInput;
      login.registerFirebase();
    } else {
      login.registerWarning('Please enter a password');
    }
  });
};

login.registerFirebase = function() {
  login.ref.push(login.newUserData);
  console.log(login.newUserData);
};

login.showLogin();

// show forms only after query is done
