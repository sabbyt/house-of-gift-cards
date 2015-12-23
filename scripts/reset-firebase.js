/* This script can be used to reset Firebase - should be kept for admin use only */

// set path to JSON files here
var requestDataUrl = '/data/requestData.json';
var donorDataUrl = '/data/donor.json';

// calling this function will reset the data in firebase with provide JSON files
var resetFirebase = function() {
  var hogcDataRef = new Firebase('https://hogc.firebaseio.com/');
  var requestData, donorData;

  $.getJSON(requestDataUrl, function(requests) {
    requestData = requests;
  }).done(function() {
    $.getJSON(donorDataUrl, function(donors) {
      donorData = donors;
    }).done(importToFirebase);
  });

  var importToFirebase = function() {
    hogcDataRef.child('requests').set(requestData);
    hogcDataRef.child('donors').set(donorData);
    console.log('Firebase reset complete');
  };

  hogcDataRef.on('child_added', function(snapshot) {
    console.log('Resetting ' + snapshot.key() + ' with ' + snapshot.val().length + ' rows of data');
  });
};
