var giftWall = {};

giftWall.toHTML = function(data) {
  var html = giftWall.template(data);
  $('#entry').append(html);
};

giftWall.getTemplate = function() {
  var appTemplate = $('#request-template').html();
  giftWall.template = Handlebars.compile(appTemplate);
};

giftWall.getTemplate();

var ref = new Firebase('https://hogc.firebaseio.com/requests');

ref.once('value', function(data) {
  data.val().forEach(giftWall.toHTML);
});

//truncate story content

//function for popup
