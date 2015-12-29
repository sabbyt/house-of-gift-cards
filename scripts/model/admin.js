var admin = {};
admin.ref = new Firebase('https://hogc.firebaseio.com/requests');
admin.all = []; // saving for easy sorting

// keeping track of sorting/displaying options
admin.currentSort = 'claimed_dt';
admin.sortAsc = true;
admin.currentStatus = 'ALL';

admin.getListTemplate = function(callback) {
  $.get('/templates/admin-template.html', function(listTemplate) {
    admin.listTemplate = Handlebars.compile(listTemplate);
  }).done(callback);
};

admin.updateStatusToSent = function(key) {
  var childRef = admin.ref.child(key.toString());
  childRef.update({
    status: 'SENT'
  });
  var keysArray = admin.all.map(function(obj){
    return parseInt(obj.key);
  });
  admin.all[keysArray.indexOf(key)].status = 'SENT';
};

admin.sort = function(list) {
  list = list || admin.all;
  var dir = admin.sortAsc ? 1 : -1;
  var prop = admin.currentSort;
  var sorted = list.sort(function(a, b) {
    if (a[prop] < b[prop]) {
      return -1 * dir;
    } else if (a[prop] > b[prop]) {
      return 1 * dir;
    } else {
      return 0;
    }
  });
  return sorted;
};

admin.sortAndFilter = function() {
  if (admin.currentStatus === 'ALL') {
    return admin.sort();
  } else {
    var list = admin.all.filter(function(request) {
      return request.status === admin.currentStatus;
    });
    return admin.sort(list);
  }
};
