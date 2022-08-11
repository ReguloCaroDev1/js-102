import * as express from 'express';
import bodyParser = require('body-parser');
import dotenv = require('dotenv');
import mongoose = require('mongoose');

dotenv.config();
const app = express();
const TodoTask = require('./models/TodoTask');
app.get('/api/datos', (req, res) => {
  res.send({ message: 'Welcome to todo!' });
});

const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// POST /login gets urlencoded bodies
app.post('/api', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username);
});

// POST /api/users gets JSON bodies
app.post('/api/datos', jsonParser, async function (req, res) {
  const { title, description } = req.body;
  const todoTask = new TodoTask({
    title: title,
    description: description,
  });
  try {
    await todoTask.save();
    res.redirect('/');
  } catch (err) {
    res.redirect('/');
  }
});
//connection to db
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log('Connected to db!');
  app.listen(3333, () => console.log('Server Up and running'));
});
