var requestsController = {};

requestsController.index = function() {
  request.insertAllRecords();
};

$(function() {
  request.emptyRequestTable();
  requestsController.index();
});
