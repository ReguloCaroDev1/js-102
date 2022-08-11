import { Schema, model } from 'mongoose';
const todoTaskSchema = new Schema({
content: {
type: String,
required: true
},
date: {
type: Date,
default: Date.now
}
})
export default model('TodoTask',todoTaskSchema);
