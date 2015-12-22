var giftWall = {};

giftWall.ref = new Firebase('https://hogc.firebaseio.com/requests');

giftWall.getListTemplate = function(callback) {
  $.get('/templates/wall-template-list.html', function(listTemplate) {
    giftWall.listTemplate = Handlebars.compile(listTemplate);
  }).done(callback);
};

//truncate story content

//function for popup
