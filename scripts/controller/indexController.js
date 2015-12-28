var indexController = {};

indexController.index = function() {
  $().hide

  $('#landing-to-submit').on('click', function() {
    $(location).attr('href', '/request.html');
  });
  $('#landing-to-stats').on('click', function() {
    $(location).attr('href', '/stats.html');
  });
  $('#landing-to-login').on('click', function() {
    $(location).attr('href', '/login.html');
  });
};
