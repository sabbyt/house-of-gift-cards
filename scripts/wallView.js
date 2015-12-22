var wallView = {};

wallView.toListHTML = function(data) {
  var html = giftWall.listTemplate(data);
  $('#entry').append(html);
};

wallView.renderListAll = function() {
  giftWall.ref.once('value', function(snapshot) {
    snapshot.forEach(function(request) {
      var temp = request.val();
      temp.key = request.key();
      wallView.toListHTML(temp);
    });
  });
};
