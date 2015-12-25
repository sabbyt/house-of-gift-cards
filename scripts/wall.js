var giftWall = {};
giftWall.all = [];

giftWall.viewState = true; // true for list view, false for grid view
giftWall.currentCat = 'reset';
giftWall.ref = new Firebase('https://hogc.firebaseio.com/requests');

giftWall.currentUser = {
  firstName: 'User',
  username: 'username'
};

giftWall.retrieveCachedClaim = function() {
  if (localStorage.getItem('claimed-keys') != null) {
    giftWall.claimed = JSON.parse(localStorage.getItem('claimed-keys'));
    console.log(giftWall.claimed);
    // giftWall.claimed.forEach(function(key) {
    //   console.log(key);
    //   $('#entry td').find('button[data-key=' + key + ']').click();
    // });
  } else {
    giftWall.claimed = [];
  }
  giftWall.showGreeting();
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

giftWall.showGreeting = function() {
  $('#greeting').show();
  $('#greeting-name').text('Hi ' + giftWall.currentUser.firstName + ', ');
  giftWall.updateGreetingNum();
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
  console.log(filtered);
  return filtered;
};

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
