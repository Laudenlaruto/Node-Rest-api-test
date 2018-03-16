var express = require('express');
var app = express();
const connectToDatabase = require('./db');
const Note = require('./models/Note');
require('dotenv').config({ path: './variables.env' });

app.get('/', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});

app.post('/', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});
app.post('/notes', function(event, err){
  connectToDatabase()
    .then(() => {
      Note.create(JSON.parse(event.body))
        .then(note => callback(null, {
          statusCode: 200,
          body: JSON.stringify(note)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the note.'
        }));
    });
});


// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
