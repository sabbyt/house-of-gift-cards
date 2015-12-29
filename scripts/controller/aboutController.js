var aboutUsController = {};

aboutUsController.displayBio = function() {
  $('section, #index-header').hide();
  util.setActiveNav('about');
  $('#sec-about').fadeIn();

  aboutUs.getAboutTemplate(aboutUsView.renderBioAll);
};
