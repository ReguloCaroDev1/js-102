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
app.get('/api/datos', function (req, res) {
  Item.find({}, function (err, todo) {
    const todoMap = {};

    todo.forEach(function (toDo) {
      todoMap[toDo._id] = toDo;
    });

    res.send(todoMap);
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
app.delete('/api/datos/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then((blog) => {
      if (!blog) {
        return res.status(404).send();
      }
      res.send(blog);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
//connection to db
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log('Connected to db!');
  app.listen(3333, () => console.log('Server Up and running'));
});
