var statsController = {};

// OVERARCHING CALL
statsController.showStats = function() {
  // stats.fetchAllUnclaimed(statsController.init);
  // stats.fetchAllClaimed();
  stats.fetchAllData(statsController.init);
};

statsController.init = function() {
  console.log(stats.allUnclaimed);
  console.log(stats.allClaimed);

  console.log('init');
  statsView.renderAll();
};

statsController.showStats();
