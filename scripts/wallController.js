var wallController = {};

// OVERARCHING CALL FOR WALL PAGE
wallController.showListWall = function() {
  $('#wall-gridview').hide();
  $('#wall-listview').show();
  wallView.listView();  // default to list view
  wallController.handleClaimButtons();
};

wallController.showGridWall = function() {
  $('#wall-listview').hide();
  $('#wall-gridview').show();
  wallView.gridView();
  wallController.handleClaimButtons();
};

wallController.handleGridWallButton = function (){
  $('#gridview-button').on('click', wallController.showGridWall);
};

wallController.handleListWallButton = function () {
  $('#listview-button').on('click', wallController.showListWall);
};

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

// ===== MOVE TO ROUTER =====
wallController.showListWall();
// wallController.showGridWall();
wallController.handleGridWallButton();
wallController.handleListWallButton();
