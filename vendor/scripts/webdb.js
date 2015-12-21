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
  try {
    if (openDatabase) {
      webDB.verbose(true);
      webDB.connect('blogDB', 'Blog Database', 5*1024*1024);
      webDB.setupTables();
      console.log('Init working.');
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

webDB.destroyDB = function () {
  html5sql.process(
    'DELETE FROM articles',
    function() {
      console.log('Success in destroying.');
    }
  );
};

webDB.importArticlesFrom = function (path) {
  $.getJSON(path, webDB.insertAllRecords);
};

webDB.insertAllRecords = function (articles) {
  articles.forEach(webDB.insertRecord);
};

webDB.insertRecord = function (a) {
  html5sql.process(
    [
      {
        'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
        'data': [a.title, a.author, a.authorUrl, a.category, a.publishedOn, a.markdown],
      }
    ],
    function () {
      console.log('Success inserting record for ' + a.title);
    }
  );
};

webDB.setupTables = function () {
  html5sql.process(
    'CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY, title TEXT, author TEXT, authorUrl TEXT, category TEXT, publishedOn TEXT, markdown TEXT);',
    function() {
      console.log('Success setting up tables.');
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
