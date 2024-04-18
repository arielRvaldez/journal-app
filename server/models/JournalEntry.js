const { Schema, model } = require('mongoose');

// Define the schema for a journal entry
const journalEntrySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  // Optionally, you can include a reference to a user who created the entry
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Create a model using the schema
const JournalEntry = model('JournalEntry', journalEntrySchema);

module.exports = JournalEntry;