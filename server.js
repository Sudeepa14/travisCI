//server implementation
var express = require('express')
var app = express()                        // create our app w/ express
const path = require('path');
var port     =process.env.PORT || 8081;                // set the port
var bodyParser = require('body-parser'); 
//var html = require('html');

app.use(express.static('views'));
// app.use(express.static(__dirname + '/public'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//const api=require('./routes.js');
//app.use('/api', api);

// Catch all other routes and return the index file
//setting static path to the dist folder
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/build/index.html'));
});

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users

app.post('/name', function(req, res){
    res.setHeader('Content-Type', 'application/json');

    //mimic a slow network connection
    //setTimeout(function(){

        res.send(JSON.stringify({
            firstName: req.body.firstName || null,
            lastName: req.body.lastName || null
        }));

   // }, 1000)

    //debugging output for the terminal
    console.log('you posted: First Name: ' + req.body.firstName + ', Last Name: ' + req.body.lastName);
})

app.listen(port,'192.168.56.1');
console.log("App listening on port " + port);
module.exports = app;
