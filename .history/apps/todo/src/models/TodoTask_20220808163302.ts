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

module.exports = mongoose.model('Todo', Todoschema);
