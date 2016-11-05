var express = require("express");
var bp = require("body-parser");
var MongoClient = require('mongodb').MongoClient;

//create our app
var app = express();
var db;

MongoClient.connect('mongodb://admin:admin@ds059316.mlab.com:59316/abdatabase',
(err, database) =>{
	if(err) return console.log(err);
	db = database;
	
})

//app.use(express.static('public'));
app.use(bp.json());
var arr=[];

app.get('/', function(req,res){
	res.send('welcome to root');
});



app.get('/getmydata', function(req,res){
	//res.json(arr);
	db.collection('mycollections').find().toArray((err, result) => {
		if(err) return console.log('error');
		res.json(result);
	})
});



app.post('/postmydata' , function(req,res){
/*	var bdy = req.body; // body is predefined property for request
	
	arr.push(bdy);
	res.json(arr);
	*/
	db.collection('mycollections').save(req.body, (err, result) => {
		if(err) return console.log(err)
		console.log('saved  to database')
	})
});

app.listen(3000, function(){
	console.log('Express server is up on port 3000');
});


