var aboutUsController = {};

aboutUsController.displayBio = function() {
  aboutUs.getAboutTemplate(aboutUsView.renderBioAll);
};

//MOVE TO ROUTER
aboutUsController.displayBio();
