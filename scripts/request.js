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

requests.retrieveFromDB = function(callback){
  requestsDBRef.on('child_added', function(snapshot) {
    var requestRow = snapshot.val();
    requestArray.push(requestRow);
  });
  callback();
};

//below are functions for SQL request data
requests.insertRecord = function(item, callback) {
  callback = callback || function() {};
  webDB.execute(
    [
      {
        'sql': 'INSERT INTO requests (request_id, request_dt, first_name, last_name, age, email, story, category, brand, amount, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        'data': [item.request_id, item.request_dt, item.first_name, item.last_name, item.age, item.email, item.story, item.category, item.brand, item.amount, item.status],
      }
    ],
    callback
  );
};

requests.insertAllRecords = function() {
  $.getJSON('/data/requestData.json', function(data) {
    data.forEach(function(item) {
      request.insertRecord(item);
    });
  });
};

requests.emptyRequestTable = function () {
  html5sql.process(
    'DELETE FROM requests',
    function() {
      console.log('Success in emptying requests table.');
    }
  );
};
