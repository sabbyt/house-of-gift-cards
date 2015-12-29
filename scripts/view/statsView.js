var statsView = {};

statsView.renderAll = function() {
  statsView.renderNumStats();
  statsView.renderStackedBarChart();
  statsView.renderRecentActivities();
  statsView.renderLeaderboard();
};

statsView.renderNumStats = function() {
  var numUnclaimed = stats.calcTotalNumberRequested();
  $('#stats-num-unclaimed').text(numUnclaimed);
  var numClaimed = stats.calcTotalNumberClaimed();
  $('#stats-num-claimed').text(numClaimed);
  var amountClaimed = stats.calcTotalAmountClaimed();
  $('#stats-amount-claimed').text('$' + amountClaimed);
  var avgClaimed = (stats.calcAvgAmountClaimed()).toFixed(2);
  $('#stats-avg-claimed').text('$' + avgClaimed);
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
  $('#stats-chart-legend').html(stackedBarChart.generateLegend());
};

statsView.colorStackedBar = function() {
  var barColor = ['rgb(252, 171, 85)', 'rgb(228, 154, 84)', 'rgb(205, 137, 84)',
    'rgb(182, 120, 84)', 'rgb(159, 103, 83)', 'rgb(136, 86, 83)',
    'rgb(113, 69, 83)', 'rgb(90, 52, 83)'];
  var opaqueColor = barColor.map(function(color) {
    var rgb = color.match(/\(([^()]+)\)/)[1];
    return 'rgba(' + rgb + ', 0.9)';
  });
  stats.chartDatasets.forEach(function(dataset, index) {
    dataset.fillColor = barColor[index];
    dataset.highlightFill = opaqueColor[index];
  });
};

statsView.renderRecentActivities = function() {
  $('#recent-list').empty();
  for (var i = stats.allClaimed.length - 1; i > stats.allClaimed.length - 6; i--) {
    statsView.writeActivity(stats.allClaimed[i]);
  }
};

statsView.writeActivity = function(request) {
  var log = '<b>' + request.claimed_by + '</b> donated $' + request.amount + ' to ' + request.first_name + ' for ' + request.category.toLowerCase() + '.';
  var $log = $('<li class="list-group-item">').html(log);
  var $timestamp = $('<span class="badge">').text(stats.relTimestamp(request.claimed_dt));
  $('#recent-list').append($log.append($timestamp));
};

statsView.renderLeaderboard = function() {
  var leaderboard = stats.calcLeaderboard();
  $('#user-leaderboard').empty();
  for (var i = 0; i < 5; i++) {
    statsView.writeLeaderboard(leaderboard[i], i);
  }
};

statsView.writeLeaderboard = function(obj, rank) {
  var $name = $('<li class="list-group-item">').text(obj.username);
  if (rank < 3) {
    $name.addClass('leaderboard-place-' + rank);
  }
  var $total = $('<span class="badge">').text('$' + obj.total);
  $('#user-leaderboard').append($name.append($total));
};
