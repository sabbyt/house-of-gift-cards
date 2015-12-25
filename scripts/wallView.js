var wallView = {};

wallView.addClaim = function($btn) {
  $btn.text('Unclaim').removeClass('claim-button').addClass('unclaim-button');
  $btn.parent().parent().toggleClass('selected');
};

wallView.removeClaim = function($btn) {
  $btn.text('Claim').removeClass('unclaim-button').addClass('claim-button');
  $btn.parent().parent().toggleClass('selected');
};

// wallView.listView = function() {
//   giftWall.getListTemplate(function() {
//     giftWall.renderListAll(function() {
//       giftWall.all.forEach(wallView.toListHTML);
//       giftWall.retrieveCachedClaim();
//     });
//   });
// };

// takes an array of requests and render to list view
wallView.renderList = function(requests) {
  $('#entry tr').not(':first-child').remove();
  giftWall.getListTemplate(function() {
    requests.forEach(wallView.toListHTML);
  });
};

wallView.toListHTML = function(data) {
  var html = giftWall.listTemplate(data);
  $('#entry').append(html);
};

wallView.renderListAll = function() {
  wallView.renderList(giftWall.all);
};

wallView.renderListByCategory = function(categoryFilter) {
  var filtered = giftWall.filterByCategory(categoryFilter);
  wallView.renderList(filtered);
};

// takes an array of requests and render to list view
wallView.renderGrid = function(requests) {
  $('#wall-gridview').empty();
  giftWall.getGridTemplate(function() {
    requests.forEach(wallView.toGridHTML);
  });
};

wallView.toGridHTML = function(data) {
  var html = giftWall.gridTemplate(data);
  $('#wall-gridview').append(html);
};

wallView.renderGridAll = function() {
  wallView.renderGrid(giftWall.all);
};

wallView.renderGridByCategory = function(categoryFilter) {
  var filtered = giftWall.filterByCategory(categoryFilter);
  wallView.renderGrid(filtered);
};

// for checkout page
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



// wallView.renderListFilteredByCategory = function(categoryFilter) {
//   // console.log('im running');
//   console.log(categoryFilter);
//   $('#entry tr').not(':first-child').remove();
//
//   var filter = giftWall.all.filter(function(el){
//     return el.category === categoryFilter;
//   });
//   console.log(filter);
//   filter.forEach(wallView.toListHTML);
// };

//grid view funtions
wallView.gridView = function() {
  giftWall.getGridTemplate(wallView.renderGridAll);
};



// wallView.renderGridAll = function() {
//   // giftWall.retrieveCachedClaim();
//   giftWall.all.forEach(wallView.toGridHTML);
// };


// ???
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
  console.log(categoryFilter);
  $('#entry tr').not(':first-child').remove();

  var filter = giftWall.all.filter(function(el){
    return el.category === categoryFilter;
  });
  console.log(filter);
  filter.forEach(wallView.toGridHTML);
};
//grid view functions
