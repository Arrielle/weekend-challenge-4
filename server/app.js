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
      client.query('SELECT todo_list.id, todo_list.task_description, todo_list.complete FROM todo_list;', function(err, result){
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
    } else if (newTask.task_description == '') {
        req.body = null;
        res.status(500).send("Please enter a task");
        console.log('enter a task');
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
});//ends app post

app.delete('/taskDelete/:id', function(req, res){
  var taskID = req.params.id;
  console.log('task id to delete: ', taskID);

  pool.connect(function(err, client, done){
    if(err) {
      // There was an error connecting to the database
      console.log('Error connecting to database: ', err);
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now, we're gonna' git stuff!!!!!
      client.query('DELETE FROM todo_list WHERE id=$1;', //PARAM 1 $1 tells PG that we're looking for a variable
      [taskID], //PARAM 2 variable that we're adding to the PG query (Replaces $1 in the query)
      function(err, result){ //PARAM 3 the function that is run after the query takes place
        done();
        if(err) {
          console.log('Error making the database query: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }//ends client.query function
      });//ends client.query
    } //ends ppol connect function
  });//ends pool connect
});//ends delete router

app.put('/taskComplete/:id', function(req, res){
  var taskID = req.params.id; //finds the optional parameter
  var taskComplete = req.body;
  console.log('task id to save: ', taskID);
  console.log('completion status: ', taskComplete.complete);
  pool.connect(function(err, client, done){
    if(err) {
      // There was an error connecting to the database
      console.log('Error connecting to database: ', err);
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now, we're gonna' git stuff!!!!!
      client.query('UPDATE todo_list SET complete=$1 WHERE id=$2;', //PARAM 1 $1 tells PG that we're looking for a variable
      [taskComplete.complete, taskID], //PARAM 2 variable that we're adding to the PG query (Replaces $1 in the query)
      function(err, result){ //PARAM 3 the function that is run after the query takes place
        done();
        if(err) {
          console.log('no edition?', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }//ends client.query function
      });//ends client.query
    } //ends ppol connect function
  });//ends pool connect
});//ends save router

app.listen(port, function() {
  console.log('We are running on port: ', port);
});
