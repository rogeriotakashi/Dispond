var server = require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var MongoClient = require('mongodb').MongoClient;
var db;
chai.use(chaiHttp);

describe('Insert Task', function() {
  it("Insert an new task in the database",function(done){

    var newTask = {
      taskname:'testename',
      responsible:'test',
      date:'2018/01/01'
    };


    chai.request(server)
    .post('/add')
    .send(newTask)
    .end(function (err,res){
      res.should.have.status(302);

      done();
    });

    done();
  });
});