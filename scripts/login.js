var login = {};
login.ref = new Firebase('https://hogc.firebaseio.com/donors');
// login.currentUser = {};

// OVERARCHING FUNCTION FOR LOGIN FORM PAGE
login.showLogin = function() {
  login.getUserLibrary(login.init);
};

login.getUserLibrary = function(callback) {
  login.ref.once('value', function(snapshot) {
    login.userLibrary = snapshot.val();
    if (typeof login.userLibrary === 'object') {
      var userLibraryArray = [];
      for (var key in login.userLibrary) {
        userLibraryArray.push(login.userLibrary[key]);
      }
      login.userLibrary = userLibraryArray;
    }

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
    login.checkSignIn();
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
        login.completeSignIn(index);
      } else {
        login.signInWarning('Incorrect password');
      }
    } else {
      login.signInWarning('User does not exist');
    }
  } else {
    login.signInWarning('Please enter a username');
  }
};

login.completeSignIn = function(index) {
  var userData = {
    firstName: login.userLibrary[index].first_name,
    username: login.userLibrary[index].username
  };
  console.log(userData);
  login.saveUserInLS(userData);
  login.sendToWall();
};



login.handleRegister = function() {
  $('#register-submit').on('click', function(event) {
    event.preventDefault();
    $('#register-warning').hide();
    login.checkRegister();

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
        login.completeRegister(data);
      }
    } else {
      login.registerWarning('Please enter a username');
    }
  } else {
    login.registerWarning('All fields are required.');
  }
};

login.completeRegister = function(newData) {
  $('#register-password-input').show();
  $('#register input:not(#register-password)').attr('disabled', true);
  $('#register-submit').text('Complete registration').on('click', function(event) {
    event.preventDefault();
    var passwordInput = $('#register-password').val();
    if (passwordInput.length) {
      newData.password = passwordInput;
      login.registerFirebase(newData);
      var userData = {
        firstName: newData.first_name,
        username: newData.username
      };
      login.saveUserInLS(userData);
      login.sendToWall();
    } else {
      login.registerWarning('Please enter a password');
    }
  });
};

login.registerFirebase = function(newData) {
  login.ref.push(newData);
  console.log(newData);
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

login.saveUserInLS = function(userData) {
  localStorage.setItem('current-user', JSON.stringify(userData));
  // login.sendToWall();
};

login.sendToWall = function() {
  // TODO: replace with page.js call
  $(location).attr('href', '/wall.html');
};


login.showLogin();

// show forms only after query is done
