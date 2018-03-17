var express = require('express');
var app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const connectToDatabase = require('./db');
const Note = require('./models/Note');

app.post('/note', function createNote(req, res){
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

app.get('/note/:id', function getNote(req, res){
  connectToDatabase()
    .then(() =>{
      Note.findById(req.params.id)
        .then((note) =>{
            res.send({
              "title":note.title,
              "description":note.description
            });
        })
        .catch((err) => {
            res.send(err.message);
        });
    });
});
app.get('/notes', function getAllNotes(req, res) {
  connectToDatabase()
    .then(() =>{
      Note.find()
        .then((notes) =>{
          console.log(notes);
          res.send({
            "Status":"ok",
            "Notes":notes
          });
        })
        .catch((err) =>{
          res.send(err.message)
        });
    })
});
app.patch('/note/:id',function updateNote(req, res) {
  connectToDatabase()
    .then(() =>{
      Note.findByIdAndUpdate(req.params.id, JSON.parse(req.body),{new: true})
        .then((note) =>{
          res.send({note})
        })
        .catch((err) =>{
          res.send(err.message)
        });
    });
});
app.delete('/note/:id', function deleteNote(req, res) {
  connectToDatabase()
    .then(() =>{
      Note.findByIdAndRemove(req.params.id)
        .then((note) =>{
          res.send({message : 'Removed note with id: ' + note._id, note: note})
        }).catch((err) =>{
          res.send(err.message)
        });
    })
});
app.listen(3000);
// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
