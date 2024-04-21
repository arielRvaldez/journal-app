const { Schema, model } = require('mongoose');

// Define the schema for a goal
const goalSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Create a model using the schema
const Goal = model('Goal', goalSchema);

module.exports = Goal;
