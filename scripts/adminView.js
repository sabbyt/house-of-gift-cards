var adminView = {};

adminView.listView = function() {
  admin.getListTemplate(function() {
    adminView.renderListAll(admin.retrieveCachedClaim);
  });
};

adminView.toListHTML = function(data) {
  var html = admin.listTemplate(data);
  $('#entry').append(html);
};

adminView.renderListAll = function(callback) {
  callback = callback || function() {};
  admin.ref.orderByChild('status').equalTo('CLAIMED').once('value', function(snapshot) {
    snapshot.forEach(function(request) {
      var temp = request.val();
      temp.key = request.key();
      adminView.toListHTML(temp);
    });
    callback();
  });
};
