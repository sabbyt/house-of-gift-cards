var wallView = {};

wallView.toListHTML = function(data) {
  var html = giftWall.listTemplate(data);
  $('#entry').append(html);
};

wallView.renderListAll = function() {
  giftWall.ref.orderByChild('status').equalTo('UNCLAIMED').once('value', function(snapshot) {
    snapshot.forEach(function(request) {
      var temp = request.val();
      temp.key = request.key();
      wallView.toListHTML(temp);
    });
  });
};

wallView.claim = function($btn) {
  $btn.text('Unclaim').removeClass('claim-button').addClass('unclaim-button');
  $btn.parent().parent().toggleClass('selected');
};

wallView.unclaim = function($btn) {
  $btn.text('Claim').removeClass('unclaim-button').addClass('claim-button');
  $btn.parent().parent().toggleClass('selected');
};
