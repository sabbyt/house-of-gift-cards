var requests = {};
var requestsDB = {};
var requestArray = [];
var requestsDBRef = new Firebase('https://hogc.firebaseio.com/requests');
var profilePic;

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
    var amount = Math.round($('#requestAmount').val());
    var img = profilePic;
    console.log(img);
    var request_dt = new Date();
    var request_dt_string = request_dt.toString();
    var status = 'UNCLAIMED';
    if (firstName.length == 0 || lastName.length == 0 || age.length == 0 || email.length == 0 || story.length == 0 || brand.length == 0 || amount.length == 0 || typeof img == 'undefined'){
      console.log('this run');
      alert('Please fill out all fields.');
      console.log(firstName, lastName, age, email, story, brand, amount, img);
    } else {
      $('#form-wrapper').hide();
      $('#request-success').fadeIn();
      requestsDBRef.push({first_name: firstName, last_name: lastName, age: age, email: email, story: story, category: category, brand: brand, amount: amount, request_dt: request_dt_string, status: status, img: img});
      $('#requestform input').val('');
      $('#requestform textarea').val('');
      $('#uploaded').remove();
      $('.fp__btn').show();
    }
  });
};

requests.profilePicHandle = function(){
  $('#profilePic').on('change', function(){
    profilePic = (event.fpfile.url);
    $('#uploaded').attr('src', profilePic);
    $('.fp__btn').hide();
  });
};
