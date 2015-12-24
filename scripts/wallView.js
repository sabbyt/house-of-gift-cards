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
    giftWall.renderListAll(function() {
      console.log('sjfbikjsd');
      requestArray.forEach(wallView.toListHTML);
      giftWall.retrieveCachedClaim();
    });
  });
};

wallView.toListHTML = function(data) {
  var html = giftWall.listTemplate(data);
  console.log(html);
  $('#entry').append(html);
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

wallView.renderListFilteredByCategory = function(categoryFilter) {
  console.log('im running');
  console.log(categoryFilter);
  $('#entry tr').not(':first-child').remove();

  var filter = requestArray.filter(function(el){
    return el.category === categoryFilter;
  });
  console.log(filter);
  filter.forEach(wallView.toListHTML);
};

//grid view funtions
wallView.gridView = function() {
  giftWall.getGridTemplate(wallView.renderGridAll);
};

wallView.toGridHTML = function(data) {
  console.log('sfon');
  var html = giftWall.gridTemplate(data);
  $('#wall-gridview').append(html);
  console.log(html);
};

wallView.renderGridAll = function() {
  // giftWall.retrieveCachedClaim();
  requestArray.forEach(wallView.toGridHTML);
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


wallView.renderGridFilteredByCategory = function(categoryFilter) {
  console.log('im running');
  console.log(categoryFilter);
  $('#entry tr').not(':first-child').remove();

  var filter = requestArray.filter(function(el){
    return el.category === categoryFilter;
  });
  console.log(filter);
  filter.forEach(wallView.toGridHTML);
};
//grid view functions
