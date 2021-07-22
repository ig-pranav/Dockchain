var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var Web3 = require('web3');
var JSAlert = require("js-alert");
var session = require('express-session');


var fileUpload = require("express-fileupload");

//web3 here

var MyContractJSON =require(path.join(__dirname, 'build/contracts/documentVerification.json'));
web3 = new Web3("http://localhost:7545");
account = "0xc78F55f1D6239f875201871c35C93f42F9f93d82";
contractAddress = MyContractJSON.networks['5777'].address;
var contractAbi = MyContractJSON.abi;
DocVerify = new web3.eth.Contract(contractAbi, contractAddress);
console.log(DocVerify);

//web3 here




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var setRouter = require('./routes/setDocument');
var verifyRouter = require('./routes/verifyDocument');
var getDocumentRouter = require('./routes/getDocument');
var uploadRouter = require('./routes/upload');
var sendRouter = require('./routes/sendDocument');
var requestRouter = require('./routes/request');
var aboutRouter = require('./routes/about');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('uploads'));

app.use(fileUpload());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/setDocument', setRouter);
app.use('/verifyDocument', verifyRouter);
app.use('/getDocument', getDocumentRouter);
app.use('/upload', uploadRouter);
app.use('/sendDocument', sendRouter);
app.use('/request', requestRouter);
app.use('/about', aboutRouter);


app.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

//admin session



//admin session




app.post('/setAdmin', function(req, res){
  if(req.body.address == "test"){
    JSAlert.alert('Success');
    res.render('setDocument');
  }
  else
  res.render('login');
});





app.get('/setDocumentDetails', function(req, res){
  res.render('setDocumentDetails')
})


//PWA from here


//PWA ends here







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(4500,function(){
  console.log("server is listening to port 4500");
})

module.exports = app;
