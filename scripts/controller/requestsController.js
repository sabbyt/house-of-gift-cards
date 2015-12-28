var requestsController = {};

requestsController.index = function() {
  $('section, #index-header').hide();
  $('#sec-request').fadeIn();

  requests.profilePicHandle();
  requests.handleSubmit();
};
