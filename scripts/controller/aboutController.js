var aboutUsController = {};

aboutUsController.displayBio = function() {
  aboutUs.getAboutTemplate(aboutUsView.renderBioAll);
};
