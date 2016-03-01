'use strict'

// -----------------------------------------------------------------------------  
//  SETUP
// -----------------------------------------------------------------------------

var express  = require('express');
var app = express();

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

/*
nano.db.get('heroines', function(err, body) {
  if (!err) {
    console.log(body);
  }
});
*/

/*heroines.list(params, function(error,body,headers) {
  console.log(body);
  console.log(headers.statusCode)
});*/

app.get('/heroines', function(request, response) {
    heroines.list(params, function(err, body, headers) {
        if (!err) {
            console.log("Everything is OK -- " + headers.statusCode)
            body.rows.forEach(function(doc) {
                console.log(doc.doc);
            });
        }
    });
});

// -----------------------------------------------------------------------------  
//  LISTENING
// -----------------------------------------------------------------------------

var port = process.env.PORT || 6000;
app.listen(port);
console.log("App listening on port " + port);