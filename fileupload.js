var fileUpload = {};
var firebaseRef = 'https://house-of-gift-cards.firebaseio.com/';

fileUpload.handleFileSelect = function(evt) {
  var file = evt.target.files[0];
  var reader = new FileReader();
  reader.onload = (function(theFile) {
    return function(e) {
      var filePayload = e.target.result;
      var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(filePayload));
      var file = new Firebase(firebaseRef + 'uploaded/' + hash + '/filePayload');
      file.set(filePayload, function() {
        document.getElementById('uploaded').src = e.target.result;
        $('#file-upload').hide();
        console.log('run');
      });
    };
  })(file);
  reader.readAsDataURL(file);
};

$(document).ready(function() {
  $('#file-upload').on('change', fileUpload.handleFileSelect);
});
