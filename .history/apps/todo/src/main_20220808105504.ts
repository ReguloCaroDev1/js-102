import * as express from 'express';
import dotenv = require('dotenv');
import mongoose = require('mongoose');
import TodoTask = require('./model.js');
dotenv.config();
const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to todo!' });
});

app.post('/api', async (req, res) => {
  const todoTask = new TodoTask({
    content: req.body,
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
