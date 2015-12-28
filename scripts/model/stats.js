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

/* ==================== NUMBERS ==================== */
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

/* ==================== CHART ==================== */
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
  stats.chartLabels = stats.chartMonths.map(stats.getChartLabel);
};

stats.constructDataset = function() {
  stats.categories = ['Children', 'Clothing', 'Community', 'Food', 'Fuel', 'Home', 'Pets', 'Miscellaneous'];
  stats.chartDatasets = stats.categories.map(function(category) {
    return {
      label: category,
      data: new Array(stats.chartLabels.length).fill(0)
    };
  });
};

stats.generateStackedBarData = function() {
  stats.generateChartLabel();
  stats.constructDataset();
  stats.allClaimed.forEach(function(obj) {
    var xIndex = stats.chartMonths.indexOf(obj.claimed_dt.substring(0, 7));
    var yIndex = stats.categories.indexOf(obj.category);
    stats.chartDatasets[yIndex].data[xIndex] += parseInt(obj.amount);
  });
};

/* ==================== RECENT ACTIVITIES ==================== */
stats.relTimestamp = function(claimed) {
  var diff = Date.now() - new Date(claimed);
  var minDiff = diff / 1000 / 60;
  if (minDiff < 60) {
    return Math.round(minDiff) + ' minutes ago';
  }
  var hourDiff = minDiff / 60;
  if (hourDiff < 24) {
    if (hourDiff < 1.5) {
      return '1 hour ago';
    } else {
      return Math.round(hourDiff) + ' hours ago';
    }
  }
  var dayDiff = hourDiff / 24;
  if (dayDiff < 30) {
    if (dayDiff < 1.5) {
      return '1 day ago';
    } else {
      return Math.round(dayDiff) + ' days ago';
    }
  }
  var monthDiff = dayDiff / 30;
  if (monthDiff < 1.5) {
    return 'a month ago';
  } else {
    return Math.round(monthDiff) + ' months ago';
  }
};

/* ==================== LEADERBOARD ==================== */
stats.calcLeaderboard = function() {
  var users = [];
  var personalTotal = [];
  stats.allClaimed.forEach(function(obj) {
    var index = users.indexOf(obj.claimed_by);
    if (index > -1) {
      personalTotal[index] += parseInt(obj.amount);
    } else {
      users.push(obj.claimed_by);
      personalTotal.push(parseInt(obj.amount));
    }
  });
  var leaderboard = users.map(function(user, index) {
    return {
      username: user,
      total: personalTotal[index]
    };
  }).sort(function(a, b) {
    return b.total - a.total;
  });
  return leaderboard;
};
