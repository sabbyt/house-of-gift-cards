var request = {};

request.insertRecord = function(item, callback) {
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

request.insertAllRecords = function() {
  $.getJSON('/data/requestData.json', function(data) {
    data.forEach(function(item) {
      request.insertRecord(item);
    });
  });
};

request.emptyRequestTable = function () {
  html5sql.process(
    'DELETE FROM requests',
    function() {
      console.log('Success in emptying requests table.');
    }
  );
};
