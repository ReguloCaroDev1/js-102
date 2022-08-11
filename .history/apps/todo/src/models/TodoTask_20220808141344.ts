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
export const todoTask = mongoose.model('TodoTask', todoTaskSchema);
