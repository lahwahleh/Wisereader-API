// var express = require('express');
var mysql = require("mysql");

module.exports = {
  connectandGetMysqlPool: function(callback) {
    //MYSQL configuration below
    var pool = mysql.createPool({
      connectionLimit: 10,
      host:  'localhost',
      user:  'wisereader',
      password: 'user',
      database: 'wisereader_db'
    });

    pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
   }
};


