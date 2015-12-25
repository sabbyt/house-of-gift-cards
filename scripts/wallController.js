var wallController = {};

wallController.showWall = function() {
  giftWall.fetchAllRequests(function() {
    giftWall.retrieveCachedClaim();
    giftWall.retrieveUserInfo(wallView.showGreeting);
    wallController.showListWall();  // default to list view
    wallController.handleClaimButtons();
  });
  wallController.handleSwitchViews();
  wallController.handleFilterByCategory();
};

wallController.showListWall = function() {
  $('#wall-gridview').hide();
  $('#wall-listview').show();
  console.log(giftWall.currentCat);
  if (giftWall.currentCat === 'reset') {
    wallView.renderListAll();
  } else {
    wallView.renderListByCategory(giftWall.currentCat);
  }
};

wallController.showGridWall = function() {
  $('#wall-listview').hide();
  $('#wall-gridview').show();
  console.log(giftWall.currentCat);
  if (giftWall.currentCat === 'reset') {
    wallView.renderGridAll();
  } else {
    wallView.renderGridByCategory(giftWall.currentCat);
  }
};


wallController.handleSwitchViews = function() {
  $('#listview-button').on('click', function() {
    $('#listview-button').addClass('selected');
    $('#gridview-button').removeClass('selected');
    giftWall.viewState = true;
    wallController.showListWall();
  });

  $('#gridview-button').on('click', function() {
    $('#gridview-button').addClass('selected');
    $('#listview-button').removeClass('selected');
    giftWall.viewState = false;
    wallController.showGridWall();
  });
};

wallController.handleFilterByCategory = function() {
  $('#category-filter').on('change', function() {
    giftWall.currentCat = $(this).val();
    if (giftWall.viewState) {
      wallController.showListWall();
    } else {
      wallController.showGridWall();
    }
  });
};

wallController.handleFilterByAmount = function() {
  // do stuff
};


wallController.handleClaimButtons = function() {
  $('#wall-listview, #wall-gridview').on('click', '.claim-button', function(event) {
    event.preventDefault();
    console.log('claimed ' + $(this).data('key'));
    wallView.addClaim($(this));
    giftWall.addClaim($(this).data('key'));
  });

  $('#wall-listview, #wall-gridview').on('click', '.unclaim-button', function(event) {
    event.preventDefault();
    console.log('unclaimed ' + $(this).data('key'));
    wallView.removeClaim($(this));
    giftWall.removeClaim($(this).data('key'));
  });
};


// ===== MOVE TO ROUTER =====
wallController.showWall();
