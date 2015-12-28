var giftWall = {};
giftWall.all = [];

giftWall.viewState = true; // true for list view, false for grid view
giftWall.currentCat = 'reset';
// giftWall.currentAmount = 'reset';

giftWall.ref = new Firebase('https://hogc.firebaseio.com/requests');

giftWall.retrieveUserInfo = function(callback) {
  callback = callback || function() {};
  if (localStorage.getItem('current-user') != null) {
    giftWall.currentUser = JSON.parse(localStorage.getItem('current-user'));
    console.log(giftWall.currentUser);
    callback();
  } else {
    alert('Please sign in or register for an account.');
    // TODO: change to page routing call
    $(location).attr('href', '/login.html');
  }
};

giftWall.retrieveCachedClaim = function() {
  if (localStorage.getItem('claimed-keys') != null) {
    giftWall.claimed = JSON.parse(localStorage.getItem('claimed-keys'));
  } else {
    giftWall.claimed = [];
  }
  console.log(giftWall.claimed);
};

giftWall.addClaim = function(key) {
  if (giftWall.claimed.indexOf(key) < 0) {
    giftWall.claimed.push(key);
    giftWall.updateLS();
  }
};

giftWall.removeClaim = function(key) {
  var index = giftWall.claimed.indexOf(key);
  giftWall.claimed.splice(index, 1);
  giftWall.updateLS();
};

giftWall.updateLS = function() {
  localStorage.setItem('claimed-keys', JSON.stringify(giftWall.claimed));
  console.log(giftWall.claimed);
  giftWall.updateGreetingNum();
};

giftWall.updateGreetingNum = function() {
  $('#greeting-num').text(giftWall.claimed.length);
};

giftWall.getListTemplate = function(callback) {
  if (!giftWall.listTemplate) {
    $.get('/templates/wall-template-list.html', function(listTemplate) {
      giftWall.listTemplate = Handlebars.compile(listTemplate);
    }).done(callback);
  } else {
    callback();
  }
};

giftWall.getGridTemplate = function(callback) {
  if (!giftWall.gridTemplate) {
    $.get('/templates/wall-template-grid.html', function(gridTemplate) {
      giftWall.gridTemplate = Handlebars.compile(gridTemplate);
    }).done(callback);
  } else {
    callback();
  }
};

giftWall.fetchAllRequests = function(callback) {
  callback = callback || function() {};
  giftWall.ref.orderByChild('status').equalTo('UNCLAIMED').once('value', function(snapshot) {
    snapshot.forEach(function(request) {
      var temp = request.val();
      temp.key = request.key();
      giftWall.all.push(temp);
    });
    callback();
  });
};

giftWall.filterByCategory = function(category) {
  var filtered = giftWall.all.filter(function(el){
    return el.category === category;
  });
  return filtered;
};

// giftWall.filterByAmount = function(amount) {
//   var filtered = giftWall.all.filter(function(el){
//     return el.amount <= amount;
//   });
//   console.log(filtered);
//   return filtered;
// };

// for checkout page
giftWall.findByKey = function(key, callback) {
  giftWall.ref.orderByKey().equalTo(key.toString()).once('value', callback);
};

giftWall.confirmRequestByKey = function(key) {
  var childRef = giftWall.ref.child(key.toString());
  var updateData = {
    status: 'CLAIMED',
    claimed_by: giftWall.currentUser.username,
    claimed_dt: new Date()
  };
  childRef.update(updateData);
};
