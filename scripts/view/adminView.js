var adminView = {};

adminView.listView = function() {
  admin.getListTemplate(function() {
    adminView.renderListAll();
  });
};

adminView.toListHTML = function(data) {
  var html = admin.listTemplate(data);
  $('#admin-table').append(html);
};

adminView.renderListAll = function(callback) {
  callback = callback || function() {};
  admin.all = [];
  admin.ref.orderByChild('claimed_dt').startAt('').once('value', function(snapshot) {
    snapshot.forEach(function(request) {
      var temp = request.val();
      temp.key = request.key();
      temp.requestDT = temp.request_dt.substring(0,16);
      temp.claimedDT = temp.claimed_dt.substring(0,16);
      admin.all.push(temp);
      adminView.toListHTML(temp);
    });
    callback();
  });
};

adminView.sendClaim = function($btn) {
  $btn.hide();
  $btn.parent().parent().addClass('selected');
  $btn.parent().siblings('.claim-status').text('SENT');
};

adminView.renderList = function(requests) {
  $('#admin-table tr').not(':first-child').remove();
  requests.forEach(adminView.toListHTML);
};
