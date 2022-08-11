import { Schema, model } from 'mongoose';
const todoTaskSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
});
export default model('TodoTask', todoTaskSchema);
