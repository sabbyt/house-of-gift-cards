var statsController = {};

// OVERARCHING CALL
statsController.showStats = function() {
  $('section, #index-header').hide();
  $('#sec-stats').fadeIn();

  stats.fetchAllData(statsView.renderAll);
};
