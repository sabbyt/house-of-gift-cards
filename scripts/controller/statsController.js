var statsController = {};

statsController.showStats = function() {
  $('section, #index-header').hide();
  util.setActiveNav('stats');
  $('#sec-stats').fadeIn();

  stats.fetchAllData(statsView.renderAll);
};
