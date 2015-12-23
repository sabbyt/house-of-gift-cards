var wallView = {};

wallView.addClaim = function($btn) {
  $btn.text('Unclaim').removeClass('claim-button').addClass('unclaim-button');
  $btn.parent().parent().toggleClass('selected');
};

wallView.removeClaim = function($btn) {
  $btn.text('Claim').removeClass('unclaim-button').addClass('claim-button');
  $btn.parent().parent().toggleClass('selected');
};

wallView.listView = function() {
  giftWall.getListTemplate(function() {
    wallView.renderListAll(giftWall.retrieveCachedClaim);
  });
};

wallView.toListHTML = function(data) {
  var html = giftWall.listTemplate(data);
  $('#entry').append(html);
};

wallView.renderListAll = function(callback) {
  $('#entry tr').not(':first-child').remove();

  callback = callback || function() {};
  giftWall.ref.orderByChild('status').equalTo('UNCLAIMED').once('value', function(snapshot) {
    snapshot.forEach(function(request) {
      var temp = request.val();
      temp.key = request.key();
      wallView.toListHTML(temp);
    });
    callback();
  });
};

wallView.renderListFilteredByCategory = function(categoryFilter, callback) {
  console.log('im running');
  console.log(categoryFilter);
  $('#entry tr').not(':first-child').remove();

  callback = callback || function() {};
  giftWall.ref.orderByChild('category').equalTo(categoryFilter).once('value', function(snapshot) {
    snapshot.forEach(function(request) {
      var temp = request.val();
      temp.key = request.key();
      wallView.toListHTML(temp);
    });
    callback();
  });
};

wallView.renderGridFilteredByCategory = function(callback) {
  callback = callback || function() {};
  giftWall.ref.orderByChild('status').equalTo('UNCLAIMED').once('value', function(snapshot) {
    snapshot.forEach(function(request) {
      var temp = request.val();
      temp.key = request.key();
      wallView.toListHTML(temp);
    });
    callback();
  });
};

wallView.renderListByKeys = function(keys, callback) {
  giftWall.renderCount = 0;
  keys.forEach(function(key) {
    giftWall.findByKey(key, function(snapshot) {
      var temp = snapshot.val()[key];
      temp.key = key;
      wallView.toListHTML(temp);
      checkout.totalArray.push(parseInt(temp.amount));

      giftWall.renderCount++;
      if (giftWall.renderCount === keys.length) {
        callback();
      }
    });
  });
};

//grid view funtions
wallView.gridView = function() {
  giftWall.getGridTemplate(wallView.renderGridAll);
};

wallView.toGridHTML = function(data) {
  var html = giftWall.gridTemplate(data);
  $('#wall-gridview').append(html);
};

wallView.renderGridAll = function(callback) {
  callback = callback || function() {};
  giftWall.ref.orderByChild('status').equalTo('UNCLAIMED').once('value', function(snapshot) {
    snapshot.forEach(function(request) {
      var temp = request.val();
      temp.key = request.key();
      wallView.toGridHTML(temp);
    });
    callback();
  });
};

wallView.renderGridByKeys = function(keys, callback) {
  giftWall.renderCount = 0;
  keys.forEach(function(key) {
    giftWall.findByKey(key, function(snapshot) {
      var temp = snapshot.val()[key];
      temp.key = key;
      wallView.toGridHTML(temp);
      checkout.totalArray.push(parseInt(temp.amount));

      giftWall.renderCount++;
      if (giftWall.renderCount === keys.length) {
        callback();
      }
    });
  });
};

//grid view functions
