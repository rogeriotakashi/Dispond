var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var db;



app.use(express.static(__dirname + '/css'));
app.use(bodyParser.urlencoded({extended:false}));





MongoClient.connect('mongodb://usertest:usertest@ds125578.mlab.com:25578/mydb', (err, database) => {
    if (err) return console.log(err);
    db = database.db('mydb');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

// This responds a POST request for the homepage
app.get('/register', function (req, res) {
    res.sendFile(__dirname + '/register.html');
})

app.post('/insertUser', function (req, res) {   
    var email = req.body.email;
    var password = req.body.pwd;

    db.collection('Users').insert(
        {
            username: email,
            pwd: password
        }
    );

    res.send("User insertion success!");
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
    console.log("Got a DELETE request for /del_user");
    res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
    console.log("Got a GET request for /list_user");
    res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function (req, res) {
    console.log("Got a GET request for /ab*cd");
    res.send('Page Pattern Match');
})



var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})



