import * as express from 'express';
import bodyParser = require('body-parser');
import dotenv = require('dotenv');
import mongoose = require('mongoose');

dotenv.config();
const app = express();

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', ItemSchema);

const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// POST /login gets urlencoded bodies
app.post('/api', urlencodedParser, function (req, res) {
  res.send({ message: 'Welcome to todo!' });
});

// POST /api/users gets JSON bodies
app.post('/api/datos', jsonParser, async function (req, res) {
  const { title, description } = req.body;
  const item = new Item({
    name: title,
    description: description,
  });
  try {
    await item.save();
    res.redirect('/api');
  } catch (err) {
    res.redirect('/api');
  }
});
//connection to db
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log('Connected to db!');
  app.listen(3333, () => console.log('Server Up and running'));
});
