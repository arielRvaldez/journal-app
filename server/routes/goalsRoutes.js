const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal'); // Assuming your Goal model is in 'models/goal.js'

// Route to get all goals
router.get('/goals', async (req, res) => {
    try {
        // Fetch all goals from the database
        const goals = await Goal.find();
        res.json(goals);
    } catch (error) {
        // Send an error response if something goes wrong
        res.status(500).json({ error: error.message });
    }
});

// Route to add a new goal
router.post('/goals', async (req, res) => {
    try {
        const { goalContent, userId } = req.body; // Assuming your request body contains 'goalContent' and 'userId'
        
        // Create a new goal object
        const newGoal = new Goal({
            content: goalContent,
            user: userId
        });

        // Save the new goal to the database
        await newGoal.save();

        // Send a success response
        res.status(201).json({ message: 'Goal added successfully', goal: newGoal });
    } catch (error) {
        // Send an error response if something goes wrong
        res.status(500).json({ error: error.message });
    }
});


// Route to delete a goal by ID
router.delete('/goals/:id', async (req, res) => {
    try {
        const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
        if (!deletedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.json({ message: 'Goal deleted successfully', goal: deletedGoal });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
