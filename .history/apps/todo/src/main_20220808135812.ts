import * as express from 'express';
import bodyParser = require('body-parser');
import dotenv = require('dotenv');
import mongoose = require('mongoose');
import TodoTask = require('./models/ToDo');

dotenv.config();
const app = express();

app.get('/api/datos', (req, res) => {
  res.send({ message: 'Welcome to todo!' });
});

app.post('/api/datos', async (req, res) => {
  return console.log(req.body);

  /*   console.log(title); */

  /* const todoTask = new TodoTask({
    title: title,
    description: description,
  });
  try {
    await todoTask.save();
    res.redirect('/');
  } catch (err) {
    res.redirect('/');
  } */
});
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// POST /login gets urlencoded bodies
app.post('/api/datos', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username);
});

// POST /api/users gets JSON bodies
app.post('/api/datos', jsonParser, function (req, res) {
  return console.log(req.body);
});
//connection to db
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log('Connected to db!');
  app.listen(3333, () => console.log('Server Up and running'));
});
