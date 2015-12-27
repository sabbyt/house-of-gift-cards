var aboutUs = {};
var aboutUsData = [];

aboutUsData = teamData;

aboutUs.getAboutTemplate = function(callback) {
  $.get('/templates/about-team-template.html', function(aboutTemplate) {
    aboutUs.aboutTemplate = Handlebars.compile(aboutTemplate);
  }).done(callback);
};
