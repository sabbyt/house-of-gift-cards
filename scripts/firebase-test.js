var hogcDataRef = new Firebase('https://hogc.firebaseio.com/');
var requestData, donorData;

// THIS FUNCTION WILL RESET THE DATA IN FIREBASE
var resetFirebase = function() {
  $.getJSON('/data/requests-export.json', function(requests) {
    requestData = requests;
  }).done(function() {
    $.getJSON('/data/donors-export.json', function(donors) {
      donorData = donors;
    }).done(importToFirebase);
  });
};

var importToFirebase = function() {
  hogcDataRef.child('requests').set(requestData);
  hogcDataRef.child('donors').set(donorData);
  console.log('done');
};

hogcDataRef.on('child_added', function(snapshot) {
  console.log(snapshot.val());
});
