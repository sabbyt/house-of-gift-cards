var login = {};
login.ref = new Firebase('https://hogc.firebaseio.com/donors');

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
        loginView.signInWarning('Incorrect password');
      }
    } else {
      loginView.signInWarning('User does not exist');
    }
  } else {
    loginView.signInWarning('Please enter a username');
  }
};

login.completeSignIn = function(index) {
  var userData = {
    firstName: login.userLibrary[index].first_name,
    username: login.userLibrary[index].username
  };
  console.log(userData);
  login.saveUserInLS(userData);
  loginController.sendToWall();
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
        loginView.registerWarning('Username already exists');
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
      loginView.registerWarning('Please enter a username');
    }
  } else {
    loginView.registerWarning('All fields are required.');
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
      loginController.sendToWall();
    } else {
      loginView.registerWarning('Please enter a password');
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

login.saveUserInLS = function(userData) {
  localStorage.setItem('current-user', JSON.stringify(userData));
};

// show forms only after query is done
