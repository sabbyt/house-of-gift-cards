var wallController = {};

wallController.listView = function() {
  giftWall.getListTemplate(wallView.renderListAll);
};

wallController.listView();
