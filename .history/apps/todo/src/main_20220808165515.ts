import * as express from 'express';
import bodyParser = require('body-parser');
import dotenv = require('dotenv');
import mongoose = require('mongoose');

dotenv.config();
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', ItemSchema);

const jsonParser = bodyParser.json();
const item1 = new Item({ name: 'Primer task' });
const item2 = new Item({ name: 'Segundo task' });
const item3 = new Item({ name: 'tercer task' });

const d = [item1, item2, item3];
app.get('/', function (req, res) {
  User.find({}, function (err, users) {
    var userMap = {};

    users.forEach(function (user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });
});
// POST /api/datos gets JSON bodies
app.post('/api/datos', jsonParser, async function (req, res) {
  const { title, description } = req.body;
  const item = new Item({
    name: title,
    description: description,
  });
  try {
    await item.save();
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
