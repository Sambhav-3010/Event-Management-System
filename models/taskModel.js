const { Schema, model } = require('mongoose');
const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  scheduledTime: {
    type: Date,
    required: true,
  },
  status:{
    type: String,
    enum: ['pending', 'running', 'completed', 'failed'], default: 'pending'
  },
  createdAt:{
    type: Date,
    default: Date.now,
  }
});

module.exports = model('taskModel', taskSchema)