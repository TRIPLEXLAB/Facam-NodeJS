var express = require('express');
var path = require('path');

var logger = require('morgan');
var bodyParser = require('body-parser');

//MongoDB 접속
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log('mongodb connect');
});
mongoose.connect('mongodb://127.0.0.1:27017/fastcampus', { useMongoClient: true });

var admin = require('./routes/admin');
var app = express();
var port = 3000;

//확장자가 ejs 로 끈나는 뷰 엔진을 추가한다.
app.set('views', path.join(__dirname,'views'));
app.set('views engine', 'ejs');

// 미들웨어 셋팅
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(_, res){
    res.send('first app');
});

//Routing
app.use('/admin', admin);

app.listen(port, function(){
    console.log('Express', port);
});