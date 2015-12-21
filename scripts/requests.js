// function Request (opts) {
//   Object.key(opts).forEach(function(propName, index, keys) {
//     this[propName] = opts[propName];
//   },this);
// }
//
// Request.all = [];
//
var request = {};

request.insertRecord = function(callback) {
  webDB.execute(
    [
      {
        'sql': 'INSERT INTO requests (request_id, request_dt, first_name, last_name, age, email, story, category, brand, amount, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        'data': [this.request_id, this.request_dt, this.first_name, this.last_name, this.age, this.email, this.story, this.category, this.brand, this.amount, this.status],
      }
    ],
    callback
  );
};


request.insertAllRecords = function () {
  $.getJSON('/data/requestData.json', function (data) {
    data.forEach(function(item) {
      // var request = new Request(item);
      request.insertRecord();
      // Request.all.push(request);
    });
  });
};
//
// Request.loadAll = funcrtion(callback) {
//   var callback = callback || function() {};
//
//   if (Request.all.length === 0) {
//     webDB.execute(
//       'SELECT * FROM requests;',
//       function (rows) {
//         rows.forEach(function(row) {
//           Request.all.push(new Request(row));
//         });
//       };
//     );
//   } else {
//     callback();
//   }
// };
