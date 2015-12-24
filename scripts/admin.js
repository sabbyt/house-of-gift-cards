var admin = {};
admin.ref = new Firebase('https://hogc.firebaseio.com/requests');
admin.all = []; // saving for easy sorting

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
};
