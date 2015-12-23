var wallController = {};

// list specific functions
wallController.showListWall = function() {
  $('#wall-gridview').hide();
  $('#wall-listview').show();
  wallView.listView();  // default to list view
  wallController.handleClaimButtons();
};

wallController.handleListWallButton = function () {
  $('#listview-button').on('click', function() {
    giftWall.viewState = true;
    wallController.showListWall();
  });
};

// grid specific functions
wallController.showGridWall = function() {
  $('#wall-listview').hide();
  $('#wall-gridview').show();
  wallView.gridView();
  wallController.handleClaimButtons();
};

wallController.handleGridWallButton = function (){
  $('#gridview-button').on('click', function() {
    giftWall.viewState = false;
    console.log(giftWall.viewState);
    wallController.showGridWall();
  });
};

// universal functions for both list and grid views
wallController.handleClaimButtons = function() {
  $('#entry').on('click', '.claim-button', function(event) {
    event.preventDefault();
    console.log('claimed ' + $(this).data('key'));
    wallView.addClaim($(this));
    giftWall.addClaim($(this).data('key'));
  });

  $('#entry').on('click', '.unclaim-button', function(event) {
    event.preventDefault();
    console.log('unclaimed ' + $(this).data('key'));
    wallView.removeClaim($(this));
    giftWall.removeClaim($(this).data('key'));
  });
};

wallController.handleCategoryFilter = function (callback){
  $('#category-filter').on('change', function() {
    var categoryFilter = $(this).val();

    if (giftWall.viewState === true) {
      if ($(this).val() === 'reset') {
        wallController.showListWall();
      } else {
        wallView.renderListFilteredByCategory(categoryFilter);
      }
    }
    else {
      if ($(this).val() === 'reset') {
        wallController.showGridWall();
      } else {
        wallView.renderGridFilteredByCategory(categoryFilter);
      }
    }
  });
};

wallController.handleAmountFilter = function (){
  // do stuff
};

// ===== MOVE TO ROUTER =====
wallController.showListWall();
// wallController.showGridWall();
wallController.handleGridWallButton();
wallController.handleListWallButton();
wallController.handleCategoryFilter();
