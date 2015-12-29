var indexController = {};

indexController.index = function() {
  $('section').hide();
  util.setActiveNav('home');
  $('#sec-landing, #index-header').fadeIn();

  $('#landing-to-submit').on('click', function() {
    $(location).attr('href', '/request');
  });
  $('#landing-to-stats').on('click', function() {
    $(location).attr('href', '/impact');
  });
  $('#landing-to-login').on('click', function() {
    $(location).attr('href', '/login');
  });
};
