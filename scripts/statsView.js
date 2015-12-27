var statsView = {};

statsView.renderAll = function() {
  statsView.renderNumStats();
  statsView.renderChartStats();
};

statsView.renderNumStats = function() {
  var numUnclaimed = stats.calcTotalNumberRequested();
  $('#stats-num-unclaimed').text(numUnclaimed);
  var numClaimed = stats.calcTotalNumberClaimed();
  $('#stats-num-claimed').text(numClaimed);
  var amountClaimed = (stats.calcTotalAmountClaimed()).toFixed(2);
  $('#stats-amount-claimed').text('$' + amountClaimed);
  var avgClaimed = (stats.calcAvgAmountClaimed()).toFixed(2);
  $('#stats-avg-claimed').text('$' + avgClaimed);
};

statsView.renderChartStats = function() {
  stats.generateChartData();
  Chart.defaults.global.responsive = true;
  var ctx = $('#stats-chart')[0].getContext('2d');
  var options = {
    stack : true
  };
  var data = {
    labels: stats.chartLabels,
    datasets: [{
      label: 'Monthly Donations',
      data: stats.chartDataArray,
    }]
  };
  var lineChart = new Chart(ctx).Bar(data, options);
};
