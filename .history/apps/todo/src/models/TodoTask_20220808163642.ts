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
const itemSchema = {
  name: String,
};

const Item = mongoose.model('Item', itemSchema);
module.exports = mongoose.model('Todo', Todoschema);
