import mongoose = require('mongoose');
const Todoschema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  email_: {
    type: String,
    required: true,
  },
});
const ItemSchema = {
  name: String,
};

const Item = mongoose.model('Item', ItemSchema);
module.exports = mongoose.model('Todo', Todoschema);
