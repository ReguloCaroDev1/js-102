import mongoose, { Schema, model } from 'mongoose';
const todoTaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const toDo = mongoose.model('ToDo', todoTaskSchema);
