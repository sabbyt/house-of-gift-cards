var admin = {};
admin.ref = new Firebase('https://hogc.firebaseio.com/requests');

admin.getListTemplate = function(callback) {
  $.get('/templates/admin-template.html', function(listTemplate) {
    admin.listTemplate = Handlebars.compile(listTemplate);
  }).done(callback);
};
