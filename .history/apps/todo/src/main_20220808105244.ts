import * as express from 'express';
import dotenv = require('dotenv');
import mongoose = require('mongoose');
const TodoTask = require('./models/TodoTask');
dotenv.config();
const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to todo!' });
});

app.post('/', (request, response) => {
  console.log(request.body);
  response.status(201).json();
});

//connection to db
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log('Connected to db!');
  app.listen(3333, () => console.log('Server Up and running'));
});
