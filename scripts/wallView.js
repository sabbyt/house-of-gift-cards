var wallView = {};

wallView.toListHTML = function(data) {
  var html = giftWall.listTemplate(data);
  $('#entry').append(html);
};

wallView.renderListAll = function() {
  giftWall.ref.once('value', function(data) {
    data.val().forEach(wallView.toListHTML);
  });
};
