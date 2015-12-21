var webDB = {};
webDB.sqlResult = null;

webDB.verbose = function (verbose) {
  var msg;
  if (verbose) {
    html5sql.logInfo = true;
    html5sql.logErrors = true;
    html5sql.putSelectResultsInArray = true;
    msg = 'html5sql verbosity on';
  } else {
    html5sql.logInfo = false;
    html5sql.logErrors = false;
    html5sql.putSelectResultsInArray = false;
    msg = 'html5sql verbosity off';
  }
  console.log(msg);
};

webDB.init = function() {
  // Open and init DB
  try {
    if (openDatabase) {
      webDB.verbose(true);
      webDB.connect('blogDB', 'Blog Database', 5*1024*1024);
      webDB.setupTables();
    } else {
      console.log('Web Databases not supported.');
    }
  } catch (e) {
    console.error('Error occured during DB init. Web Database may not be supported.');
  }
};

webDB.connect = function (database, title, size) {
  html5sql.openDatabase(database, title, size);
};

webDB.clearRows = function () {
  html5sql.process(
    'DELETE FROM articles',
    function() {
      // on success
      console.log('CLEARED THE TABLE');
    }
  );
};

webDB.setupRequestTable = function () {
  html5sql.process(
    'CREATE TABLE IF NOT EXISTS articles (request_id INTEGER PRIMARY KEY, request_dt DATETIME DEFAULT CURRENT_TIMESTAMP, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, age INTEGER, email VARCHAR(255) NOT NULL, story TEXT, category VARCHAR(255) NOT NULL, brand VARCHAR(255) NOT NULL, amount INTEGER NOT NULL, status VARCHAR(255) NOT NULL DEFAULT "UNCLAIMED", claimed_by VARCHAR(255), claimed_dt DATETIME);',
    function() {
      // on success
      console.log('Success setting up request table.');
    }
  );
};

webDB.setupDonorTable = function () {
  html5sql.process(
    'CREATE TABLE IF NOT EXISTS articles (username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL);',
    function() {
      // on success
      console.log('Success setting up donor table.');
    }
  );
};


webDB.execute = function (sql, callback) {
  callback = callback || function() {};
  html5sql.process(
    sql,
    function (tx, result, resultArray) {
      callback(resultArray);
    }
  );
};
