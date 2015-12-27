var stats = {};
stats.allUnclaimed = [];
stats.allClaimed = [];


stats.fetchAllData = function(callback) {
  stats.fetchAllUnclaimed(function() {
    stats.fetchAllClaimed(callback);
  });
};

stats.fetchAllUnclaimed = function(callback) {
  if (giftWall.all.length) {
    stats.allUnclaimed = giftWall.all;
    callback();
  } else {
    giftWall.fetchAllRequests(function() {
      stats.allUnclaimed = giftWall.all;
      callback();
    });
  }
};

stats.fetchAllClaimed = function(callback) {
  callback = callback || function() {};
  if (admin.all.length) {
    stats.allClaimed = admin.all;
    callback();
  } else {
    var ref = new Firebase('https://hogc.firebaseio.com/requests');
    ref.orderByChild('claimed_dt').startAt('').once('value', function(snapshot) {
      snapshot.forEach(function(request) {
        var temp = request.val();
        temp.key = request.key();
        stats.allClaimed.push(temp);
      });
      callback();
    });
  }
};

stats.calcTotalNumberRequested = function() {
  return stats.allUnclaimed.length;
};

stats.calcTotalNumberClaimed = function() {
  return stats.allClaimed.length;
};

stats.calcTotalAmountClaimed = function() {
  return stats.allClaimed.reduce(function(acc, currValue, currentIndex, array) {
    return acc + parseInt(currValue.amount);
  }, 0);
};

stats.calcAvgAmountClaimed = function() {
  return stats.calcTotalAmountClaimed() / stats.calcTotalNumberClaimed();
};

// chart
stats.getChartLabel = function(dateString) {
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = dateString.substring(0, 4);
  var month = parseInt(dateString.substring(5, 7)) - 1;
  return monthNames[month] + ' ' + year;
};

stats.generateChartLabel = function() {
  stats.chartMonths = [];
  stats.allClaimed.forEach(function(obj) {
    var month = obj.claimed_dt.substring(0, 7);
    if (stats.chartMonths.indexOf(month) < 0) {
      stats.chartMonths.push(month);
    }
  });
  stats.chartMonths = stats.chartMonths.sort();
  console.log(stats.chartMonths);
  stats.chartLabels = stats.chartMonths.map(stats.getChartLabel);
  console.log(stats.chartLabels);
};

stats.generateChartData = function() {
  stats.generateChartLabel();
  stats.chartDataArray = new Array(stats.chartLabels.length).fill(0);
  stats.allClaimed.forEach(function(obj) {
    var month = obj.claimed_dt.substring(0, 7);
    stats.chartDataArray[stats.chartMonths.indexOf(month)] += parseInt(obj.amount);
  });
  console.log(stats.chartDataArray);

};
