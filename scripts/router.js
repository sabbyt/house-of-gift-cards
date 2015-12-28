page('/', indexController.index);
page('/about', aboutUsController.displayBio);

page('/contact', function() {
  $('section, #index-header').hide();
  $('#sec-contact').fadeIn();
});

page('/admin', adminController.showList);
page('/request', requestsController.index);
page('/login', loginController.showLogin);
page('/wall', wallController.showWall);
page('/checkout', checkoutController.showCheckout);
page('/impact', statsController.showStats);

page.start();
