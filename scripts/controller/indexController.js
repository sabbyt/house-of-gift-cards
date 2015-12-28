var indexController = {};

indexController.index = function() {
  $('section').hide();
  $('#sec-landing, #index-header').fadeIn();

  $('#landing-to-submit').on('click', function() {
    page('/request');
  });
  $('#landing-to-stats').on('click', function() {
    page('/impact');
  });
  $('#landing-to-login').on('click', function() {
    page('/login');
  });
};
