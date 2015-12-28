var statsController = {};

// OVERARCHING CALL
statsController.showStats = function() {
  stats.fetchAllData(statsView.renderAll);
};

statsController.showStats();
