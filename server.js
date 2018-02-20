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
});

// This responds a POST request for the homepage
app.get('/register', function (req, res) {
    res.sendFile(__dirname + '/register.html');
});

app.post('/insertUser', function (req, res) {   
    var email = req.body.email;
    var password = req.body.pwd;

    db.collection('Users').insertOne(
        {
            username: email,
            pwd: password
        }
    );

    res.redirect('/');
});

app.get('/dashboard', function (req, res) {   
    res.sendFile(__dirname + '/dashboard.html');
})

app.post('/authentication',function(req,res){
    var email = req.body.email;
    var password = req.body.pwd;
    var query = {username : email, pwd : password};

    var cursor = db.collection('Users').findOne(query,function(err,result){
        if(err) throw err;

        if(result == null){
            res.redirect('/');
        }else
            res.redirect('/dashboard');


    });
    
});

app.get("/addtask", function (req,res){ 
    res.sendFile(__dirname + "/addtask.html");
});

app.post("/add", function(req,res){
    var taskname = req.body.taskname;
    var responsible = req.body.responsible;
    var date = req.body.date;

    db.collection('Tasks').insertOne(
        {
            taskname: taskname,
            responsible:responsible,
            date:date
        }
    );

    res.redirect('/dashboard');
});




var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})



