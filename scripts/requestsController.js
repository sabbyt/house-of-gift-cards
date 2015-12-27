var requestsController = {};

requestsController.index = function() {
  requests.handleSubmit();
};

//MOVE TO ROUTER
requestsController.index();
