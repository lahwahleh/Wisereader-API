var express = require('express');
var router = express.Router();
var url = require('url');
var cors = require('cors'); 
var mysql = require('mysql');
var config_mysql = require('../config/mysql');
var util = require('../utils/util');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wisereader App' });
});

module.exports = router;

/* Upload book */
router.post('/books', function(req,res,next){
try{
	var reqObj = req.body;	
	console.log(reqObj);
	req.getConnection(function(err, conn){
		if(err)
		{
			console.error('SQL Connection error: ', err);
			return next(err);
		}
		else
		{
			var insertSql = "INSERT INTO books SET ?";
			var insertValues = {
			"title" : reqObj.title,
			"author" : reqObj.author,
			"category" : reqObj.category,
            "imgUrl" : reqObj.imgUrl,
            "pdfUrl" : reqObj.pdfUrl,
            "shortDesc" : reqObj.shortDesc,
            "longDesc" : reqObj.longDesc
			};
			var query = conn.query(insertSql, insertValues, function (err, result){
				if(err){
				console.error('SQL error: ', err);
				return next(err);
				}
				console.log(result);
				var id = result.insertId;
				res.json({"id":id});
			});
		}
		});
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
});

/* Get Books */
router.get('/books', function(req, res, next){
        config_mysql.connectandGetMysqlPool(function(err, connection) {
            if (err) {
              console.error(err);
              util.broadcastError(res, err.message);
              return;
        }
            var query = "SELECT * FROM ??";
            var table = ["books"];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows){
                   connection.release();
                if (err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    res.json({"Error" : false, "Message" : "Success", "books" : rows});
                }
            });
        });
    });
