var statsView = {};

statsView.renderAll = function() {
  statsView.renderNumStats();
  // statsView.renderChartStats();
  statsView.renderStackedBarChart();
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
    barShowStroke: false
  };
  var data = {
    labels: stats.chartLabels,
    datasets: [{
      label: 'Monthly Donations',
      fillColor: 'rgba(220,220,220,0.5)',
      strokeColor: 'rgba(220,220,220,1)',
      pointColor: 'rgba(220,220,220,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(220,220,220,1)',
      data: stats.chartDataArray,
    }]
  };
  var lineChart = new Chart(ctx).Line(data, options);
};


statsView.renderStackedBarChart = function() {
  stats.generateStackedBarData();
  statsView.colorStackedBar();
  Chart.defaults.global.responsive = true;
  var ctx = $('#stats-chart')[0].getContext('2d');
  var options = {
    barShowStroke: false
  };
  var data = {
    labels: stats.chartLabels,
    datasets: stats.chartDatasets
  };
  var stackedBarChart = new Chart(ctx).StackedBar(data, options);

};

statsView.colorStackedBar = function() {
  var barColor = ['rgb(252, 171, 85)', 'rgb(228, 154, 84)', 'rgb(205, 137, 84)',
    'rgb(182, 120, 84)', 'rgb(159, 103, 83)', 'rgb(136, 86, 83)',
    'rgb(113, 69, 83)', 'rgb(90, 52, 83)'];
  var opaqueColor = barColor.map(function(color) {
    var rgb = color.match(/\(([^()]+)\)/)[1];
    return 'rgba(' + rgb + ', 0.9)';
  });
  console.log(opaqueColor);
  stats.chartDatasets.forEach(function(dataset, index) {
    dataset.fillColor = barColor[index];
    dataset.highlightFill = opaqueColor[index];
  });

};
