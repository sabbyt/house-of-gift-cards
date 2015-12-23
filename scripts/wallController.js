var wallController = {};

// OVERARCHING CALL FOR WALL PAGE
wallController.showWall = function() {
  wallView.listView();  // default to list view
  wallController.handleClaimButtons();
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
wallController.showWall();
