import { Schema, model } from 'mongoose';
const todoTaskSchema = new Schema({
title: {
type: String,
required: true
},
description: {
type: String,
requerid: true
}
})
export default model('TodoTask',todoTaskSchema);
