//this file takes values from form and adds to firebase database
//then it takes the values and renders it to the html.
//currently not linked to any file - was using on with a firebase.html local file but to be hooked up to request.html
//input at top of html <script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
//to append to html <div id="requesterList"></div>

var myData = {};
var myDataRef = new Firebase('https://house-of-gift-cards.firebaseio.com/');
$('#requestSubmit').click(function(event) {
  event.preventDefault();
  console.log('im being clicked');
  var firstName = $('#requesterFirstName').val();
  var lastName = $('#requesterLastName').val();
  var age = $('#requesterAge').val();
  var email = $('#requesterEmail').val();
  var story = $('#requesterStory').val();
  var category = $('#requestCategory option:selected').text();
  var brand = $('#requestBrand').val();
  var amount = $('#requestAmount').val();
  var request_dt = new Date();
  var request_dt_string = request_dt.toString();
  var status = 'UNCLAIMED';
  myDataRef.push({first_name: firstName, last_name: lastName, age: age, email: email, story: story, category: category, brand: brand, amount: amount, request_dt: request_dt_string, status: status});
});

myDataRef.on('child_added', function(snapshot) {
  var requestAdded = snapshot.val();
  console.log(requestAdded);
  myData.displayRequest(requestAdded.first_name, requestAdded.last_name, requestAdded.age, requestAdded.email, requestAdded.story, requestAdded.category, requestAdded.brand, requestAdded.amount, requestAdded.request_dt);
});

myData.displayRequest = function(firstName, lastName, age, email, story, category, brand, amount, request_dt){
  $('<div/>').text(firstName +' '+ lastName +' '+ age +' '+ email +' '+ story +' '+ category +' '+ brand +' '+ amount +' '+ request_dt).prepend($('<p/>')).appendTo($('#requesterList'));
  console.log('run');
};
