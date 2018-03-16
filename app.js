var express = require('express');
var app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const connectToDatabase = require('./db');
const Note = require('./models/Note');
require("mongoose").Promise = require("bluebird");
require('dotenv').config({ path: './variables.env' });

app.get('/', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});

app.post('/', function(req, res) {

});
app.post('/note', function(req, res){
  console.log(req.body);
  const note = {
    title: req.body.title,
    description: req.body.description
  }
  connectToDatabase()
    .then(() => {
      Note.create(note)
        .then(function(note) {
          console.log(note);
          res.status(200).json(note);
        })
        .catch(function(note){
          res.status(500).json(note);
        });
    });

});

//app.listen(3000);
// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
