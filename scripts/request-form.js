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
giftWall.toHTML(JSON.parse({ "request_id": "1",
    "request_dt": "2015-11-29 13:02:12 GMT-0800 (PST)",
    "first_name": "Wanda",
    "last_name": "Maximoff",
    "age": "100",
    "email": "wanda@hotmail.com",
    "story": "I help to cook at the soup kitchen once a month.",
    "category": "Food",
    "brand": "QFC",
    "amount": "20",
    "status": "UNCLAIMED"
  }));



// var Request = function (object) {
//   this.first_name = object.first_name;
//   this.story = object.story;
//   this.category = object.category;
//   this.brand = object.brand;
//   this.amount = object.amount;
// };
//
// requests.newRequest = function() {
//   for (var i = 0; i < requests.requestData.length; i++) {
//     var requestEntry = new Request(requests.requestData[i]);
//     this.appendRequest(requestEntry);
//   }
// };
//
// requests.appendRequest = function(request) {
//   $('#entry').append(request.toHTML());
// };

//toHTML function
