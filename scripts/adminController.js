var adminController = {};

// OVERARCHING CALL FOR WALL PAGE
adminController.showList = function() {
  adminView.listView();  // default to list view
};

// ===== MOVE TO ROUTER =====
adminController.showList();
