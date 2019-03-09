'use strict'

// -----------------------------------------------------------------------------  
//  SETUP
// -----------------------------------------------------------------------------

var express  = require('express');
var app = express();
var cors = require("cors");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// -----------------------------------------------------------------------------  
//  CORS
// -----------------------------------------------------------------------------

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header("Access-Control-Allow-Methods", "POST, GET");  
  next();     
});

// -----------------------------------------------------------------------------  
//  USING NANO
// -----------------------------------------------------------------------------

var nano = require('nano')('http://localhost:5984')
  , params   = {include_docs: true}
  ;
var heroines = nano.db.use('heroines');


// -----------------------------------------------------------------------------  
//  REST
// -----------------------------------------------------------------------------

console.log('GET Heroines');

app.get('/heroines', function(request, response) {
    
        heroines.list(params, function(err,body) {
         var docs = [];
           body.rows.forEach(function(doc) {
               docs.push(doc);
            });
            response.json(docs);
        });  
});



console.log('POST add Heroine');

app.post('/add_heroine', function(request,response) {
   heroines.insert({
       "first_name" : request.body.first_name,
       "last_name" : request.body.last_name,
       "name" : request.body.first_name + "-" + request.body.last_name,
       "nation" : request.body.nation,
       "discipline" : request.body.discipline,
       "year" : request.body.year,
       "desc" : request.body.desc
   }, function(err, body) {
    if (!err)
        console.log(body);
    })
});


// -----------------------------------------------------------------------------  
//  LISTENING
// -----------------------------------------------------------------------------

var port = process.env.PORT || 9001;
app.listen(port);
console.log("App listening on port " + port);

// hello