import { Schema, model } from 'mongoose';
const todoTaskSchema = new Schema({
title: {
type: String,
required: true
},
description: {
type: String,
default: Date.now
}
})
export default model('TodoTask',todoTaskSchema);
