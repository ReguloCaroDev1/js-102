import mongoose = require('mongoose');
const itemSchema = {
  name: String,
};

const Item = mongoose.model('Item', itemSchema);
