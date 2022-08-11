import { Schema, model } from 'mongoose';
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
export default model('TodoTask', todoTaskSchema);
