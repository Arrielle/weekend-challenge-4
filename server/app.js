console.log('Starting up the server');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

var pg = require('pg');
var config = {
  database: 'phi', // the name of the database
  host: 'localhost', // where is your database
  port: 5432, // the port number for your database
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

var pool = new pg.Pool(config);

app.get('/getTasks', function(req, res){
  pool.connect(function(err, client, done){
    if(err) {
      // There was an error connecting to the database
      console.log('Error connecting to database: ', err);
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now, we're gonna' git stuff!!!!!
      client.query('SELECT todo_list.task_description, todo_list.complete FROM todo_list;', function(err, result){
        done();
        if(err) {
          console.log('Error making the database query: ', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      });
    }
  });
});//ends app.gets

app.post('/newTask', function(req, res){
  var newTask = req.body;
  pool.connect(function(err, client, done){
    if(err) {
      console.log('Error connecting to database: ', err);
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO todo_list (task_description, complete) VALUES ($1, $2);',
      [newTask.task_description, newTask.complete],
      function(err, result){
        done();
        if(err) {
          console.log('Error making the database query: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

app.listen(port, function() {
  console.log('We are running on port: ', port);
});
