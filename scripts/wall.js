var giftWall = {};
giftWall.user = 'username';

giftWall.ref = new Firebase('https://hogc.firebaseio.com/requests');

giftWall.getListTemplate = function(callback) {
  $.get('/templates/wall-template-list.html', function(listTemplate) {
    giftWall.listTemplate = Handlebars.compile(listTemplate);
  }).done(callback);
};

giftWall.renderList = function(keys, callback) {
  giftWall.count = 0;
  keys.forEach(function(key) {
    giftWall.renderListByKey(key, callback, keys.length);
  });
};

giftWall.renderListByKey = function(key, callback, endValue) {
  giftWall.ref.orderByKey().equalTo(key.toString()).once('value', function(snapshot) {
    var temp = snapshot.val()[key];
    temp.key = key;
    giftWall.toListHTML(temp);
    checkout.totalArray.push(parseInt(temp.amount));

    giftWall.count++;
    if (giftWall.count === endValue) {
      callback();
    }
  });
};

giftWall.toListHTML = function(data) {
  var html = giftWall.listTemplate(data);
  $('#entry').append(html);
};

giftWall.confirmRequestByKey = function(key) {
  var childRef = giftWall.ref.child(key.toString());
  var updateData = {
    status: 'CLAIMED',
    claimed_by: giftWall.user,
    claimed_dt: new Date()
  };
  childRef.update(updateData);
};

//truncate story content

//function for popup
