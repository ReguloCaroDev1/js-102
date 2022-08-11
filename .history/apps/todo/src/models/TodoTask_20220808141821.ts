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
const Blog = mongoose.model('ToDo', todoTaskSchema);
