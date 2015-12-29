var adminController = {};

adminController.showList = function() {
  $('section, #index-header').hide();
  $('#sec-admin').fadeIn();

  adminView.listView();
  adminController.handleClaimButtons();
  adminController.handleSort();
  adminController.handleStatusDisplay();
};

adminController.handleClaimButtons = function() {
  $('#admin-table').on('click', '.send-btn', function(event) {
    event.preventDefault();
    console.log('sent ' + $(this).data('key'));
    adminView.sendClaim($(this));
    admin.updateStatusToSent($(this).data('key'));
  });
};

adminController.handleSort = function() {
  $('#admin-sort').on('change', function(event) {
    event.preventDefault();
    admin.currentSort = $(this).val();
    console.log(admin.currentSort);
    adminView.renderList(admin.sortAndFilter());
  });

  $('#admin-sort-dir').on('click', function(event) {
    event.preventDefault();
    admin.sortAsc = !admin.sortAsc;
    $('#admin-sort').trigger('change');
  });
};

adminController.handleStatusDisplay = function() {
  $('#admin-status').on('click', 'button', function(event) {
    event.preventDefault();
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    console.log($(this).text().toUpperCase());
    admin.currentStatus = $(this).text().toUpperCase();
    adminView.renderList(admin.sortAndFilter());
  });
};
