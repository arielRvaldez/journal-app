const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');

// Route to get all journal entries
router.get('/entries', async (req, res) => {
  try {
    // Fetch all journal entries from the database
    const entries = await JournalEntry.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to add a new journal entry
router.post('/entries', async (req, res) => {
  try {
    const { title, content } = req.body; // Assuming your request body contains 'title' and 'content'
    
    // For the logged-in user, you can access the user ID from the request object
    // For example, if you are using JWT authentication, you can get the user ID from the decoded token
    const userId = req.user.id; // Assuming 'userId' is the field in the decoded token containing the user ID
    
    // Create a new journal entry object
    const newEntry = new JournalEntry({
      title,
      content,
      user: userId
    });

    // Save the new journal entry to the database
    await newEntry.save();

    // Send a success response
    res.status(201).json({ message: 'Journal entry added successfully', entry: newEntry });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({ error: error.message });
  }
});

// Route to get a single journal entry by ID
router.get('/entries/:id', async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update a journal entry by ID
router.put('/entries/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedEntry = await JournalEntry.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!updatedEntry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }
    res.json({ message: 'Journal entry updated successfully', entry: updatedEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a journal entry by ID
router.delete('/entries/:id', async (req, res) => {
  try {
    const deletedEntry = await JournalEntry.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }
    res.json({ message: 'Journal entry deleted successfully', entry: deletedEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
