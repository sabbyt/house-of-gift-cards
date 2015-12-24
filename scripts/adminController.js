var adminController = {};

adminController.showList = function() {
  adminView.listView();
  adminController.handleClaimButtons();
};

adminController.handleClaimButtons = function() {
  $('#entry').on('click', '.send-btn', function(event) {
    event.preventDefault();
    console.log('sent ' + $(this).data('key'));
    adminView.sendClaim($(this));
    admin.updateStatusToSent($(this).data('key'));
  });
};

// ===== MOVE TO ROUTER =====
adminController.showList();
