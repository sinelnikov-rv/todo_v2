var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');

var todoes = [];

app.use('/js' ,express.static('public/js'));
app.use('/css', express.static('public/css'));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+"/index_1.html"));
});
app.get('/test', function(req,res){
    res.sendFile(path.join(__dirname+"test.html"))
});
app.use(bodyParser.json());


/*app.get('/endpoint', function(req, res){
 var obj = {};
 obj.title = 'title';
 obj.data = 'data';

 console.log('params: ' + JSON.stringify(req.params));
 console.log('body: ' + JSON.stringify(req.body));
 console.log('query: ' + JSON.stringify(req.query));

 res.header('Content-type','application/json');
 res.header('Charset','utf8');
 res.send(req.query.callback + '('+ JSON.stringify(obj) + ');');
 });*/

app.post('/addtask', function(req, res){
    todoes.push(req.body);
    res.send(req.body);
});
app.get('/todoes', function(req,res){
    res.json(todoes)
});
app.listen(3000);

