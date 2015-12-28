var aboutUsController = {};

aboutUsController.displayBio = function() {
  $('section, #index-header').hide();
  $('#sec-about').fadeIn();

  aboutUs.getAboutTemplate(aboutUsView.renderBioAll);
};
