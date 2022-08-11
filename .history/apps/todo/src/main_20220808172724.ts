import * as express from 'express';
import bodyParser = require('body-parser');
import dotenv = require('dotenv');
import mongoose = require('mongoose');
import cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Item = mongoose.model('Item', ItemSchema);
const jsonParser = bodyParser.json();

// GET todos los ToDo
app.get('/api/datos', function (req, res) {
  try {
    Item.find({}, function (err, todo) {
      const todoMap = {};

      todo.forEach(function (toDo) {
        todoMap[toDo._id] = toDo;
      });

      res.status(200).send(todoMap);
    });
  } catch (error) {
    res.status(404);
  }
});
// POST ingresa tasks por json
app.post('/api/datos', jsonParser, async function (req, res) {
  const { title, description } = req.body;
  const item = new Item({
    name: title,
    description: description,
  });
  try {
    await item.save();
    res.status(200).redirect('/');
  } catch (err) {
    res.status(404).redirect('/');
  }
});
//DELETE elimina por id
app.delete('/api/datos/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.status(200).send(todo);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
//conexion a la base de datos
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log('Connected to db!');
  app.listen(3333, () => console.log('Server Up and running'));
});
