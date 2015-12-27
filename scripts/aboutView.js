var aboutUsView = {};

aboutUsView.toHTML = function(data) {
  var html = aboutUs.aboutTemplate(data);
  $('#bios').append(html);
};

aboutUsView.renderBioAll = function(data) {
  aboutUsData.forEach(aboutUsView.toHTML);
};
