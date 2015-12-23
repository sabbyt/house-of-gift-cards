var requests = {};
var requestsDB = {};
var requestArray = [];
var requestsDBRef = new Firebase('https://hogc.firebaseio.com/requests');

requests.handleSubmit = function(){
  $('#requestSubmit').click(function(event) {
    event.preventDefault();
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
    requestsDBRef.push({first_name: firstName, last_name: lastName, age: age, email: email, story: story, category: category, brand: brand, amount: amount, request_dt: request_dt_string, status: status});
    $('#requestform input').val('');
    $('#requestform textarea').val('');
  });
};
