var wallView = {};

wallView.addClaim = function($btn) {
  $btn.text('Unclaim').removeClass('claim-button').addClass('unclaim-button');
  $btn.parent().parent().toggleClass('selected');
};

wallView.removeClaim = function($btn) {
  $btn.text('Claim').removeClass('unclaim-button').addClass('claim-button');
  $btn.parent().parent().toggleClass('selected');
};

// distinguish the appearence of requests that was previously claimed by user
wallView.showClaimed = function() {
  giftWall.claimed.forEach(function(key) {
    var $btn = $('#wall-listview, #wall-gridview').find('button[data-key=' + key + ']');
    wallView.addClaim($btn);
  });
};

wallView.showGreeting = function() {
  $('#greeting').show();
  $('#greeting-name').text('Hi ' + giftWall.currentUser.firstName + ', ');
  giftWall.updateGreetingNum();
};

// takes an array of requests and render to list view
wallView.renderList = function(requests) {
  $('#entry tr').not(':first-child').remove();
  giftWall.getListTemplate(function() {
    requests.forEach(wallView.toListHTML);
    wallView.showClaimed();
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

// takes an array of requests and render to grid view
wallView.renderGrid = function(requests) {
  $('#wall-gridview').empty();
  giftWall.getGridTemplate(function() {
    requests.forEach(wallView.toGridHTML);
    wallView.showClaimed();
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
