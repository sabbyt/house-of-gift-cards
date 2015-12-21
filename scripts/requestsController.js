var requestsController = {};

requestsController.index = function() {
  request.insertAllRecords();
};

$(function() {
  webDB.init();
  requestsController.index();
});
