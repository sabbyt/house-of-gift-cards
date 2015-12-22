var requestsController = {};

requestsController.index = function() {
  // request.insertAllRecords();
  // requests.retrieveFromDB(requestsView.displayAll);
  requests.handleSubmit();
};

requestsController.index();

// $(function() {
//   request.emptyRequestTable();
//   requestsController.index();
// });
