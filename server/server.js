//load the required dependencies
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require("mongoose");
var app = express();

// setup the Express web application framework
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

// setup the routes
routes = require('./routes/tshirt-crud.js')(app);

// setup MongoDB connection
mongoose.connect('mongodb://localhost/tshirt', function(err, res) {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

app.listen(8080);
console.log('Listening on port 8080');

// a route that responds to GET requests with "Hello world!"
app.get('/', function(req, res) {
  res.send("Hello world!");
});