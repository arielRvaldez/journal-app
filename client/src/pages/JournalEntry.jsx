import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JournalEntry = () => {
  const [goals, setGoals] = useState([]);
  const [entries, setEntries] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });
  const [updateEntryId, setUpdateEntryId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  // Function to fetch goals for the logged-in user
  const fetchGoals = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/goals');
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  // Function to fetch journal entries for the logged-in user
  const fetchEntries = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/entries');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  };

  // Fetch goals and entries when the component mounts
  useEffect(() => {
    fetchGoals();
    fetchEntries();
  }, []);

  const addGoal = async () => {
    try {
      if (newGoal.trim() === '') {
        alert('Please enter a goal.');
        return;
      }

      const response = await axios.post('http://localhost:5001/api/goals', {
        goalContent: newGoal,
        userId: '662340fcc67871b03a352344'
      });

      setGoals([...goals, response.data.goal]);
      setNewGoal('');
      alert('Goal added successfully!');
    } catch (error) {
      console.error('Error adding goal:', error);
      alert('Failed to add goal. Please try again later.');
    }
  };

  const addEntry = async () => {
    try {
      if (newEntry.title.trim() === '' || newEntry.content.trim() === '') {
        alert('Please enter a title and content for the entry.');
        return;
      }

      const response = await axios.post('http://localhost:5001/api/entries', {
        title: newEntry.title,
        content: newEntry.content
      });

      setEntries([...entries, response.data.entry]);
      setNewEntry({ title: '', content: '' });
      alert('Journal entry added successfully!');
    } catch (error) {
      console.error('Error adding journal entry:', error);
      alert('Failed to add journal entry. Please try again later.');
    }
  };

  const deleteGoal = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/goals/${id}`);
      setGoals(goals.filter(goal => goal._id !== id));
      alert('Goal deleted successfully!');
    } catch (error) {
      console.error('Error deleting goal:', error);
      alert('Failed to delete goal. Please try again later.');
    }
  };

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/entries/${id}`);
      setEntries(entries.filter(entry => entry._id !== id));
      alert('Journal entry deleted successfully!');
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      alert('Failed to delete journal entry. Please try again later.');
    }
  };

  const updateEntry = async (id) => {
    try {
      // Find the entry that is being updated
      const entryToUpdate = entries.find(entry => entry._id === id);
      
      // Send a PUT request to the backend endpoint to update the entry
      const response = await axios.put(`http://localhost:5001/api/entries/${id}`, {
        title: updatedTitle || entryToUpdate.title,
        content: updatedContent || entryToUpdate.content
      });
      
      // Find the index of the updated entry in the entries array
      const updatedEntryIndex = entries.findIndex(entry => entry._id === id);
      
      // Update the entries state by replacing the old entry with the updated one
      const updatedEntries = [...entries];
      updatedEntries[updatedEntryIndex] = response.data.entry;
      setEntries(updatedEntries);
      
      // Clear the updateEntryId state to reset the update mode
      setUpdateEntryId(null);
      
      // Optionally, you can show a success message or perform any other action
      alert('Journal entry updated successfully!');
    } catch (error) {
      console.error('Error updating journal entry:', error);
      // Optionally, you can show an error message or perform any other action
      alert('Failed to update journal entry. Please try again later.');
    }
  };
  

  return (
    <div className="container">
      <h1>My Goals</h1>
      <div className="entry-form">
        <input
          type="text"
          placeholder="Goal"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <button onClick={addGoal}>Add Goal</button>
      </div>
      <div className="goals">
        {goals.map(goal => (
          <div key={goal._id} className="goal">
            <p>{goal.content}</p>
            <button onClick={() => deleteGoal(goal._id)}>Delete</button>
          </div>
        ))}
      </div>

      <h1>My Journal Entries</h1>
      <div className="entry-form">
        <input
          type="text"
          placeholder="Title"
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newEntry.content}
          onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
        ></textarea>
        <button onClick={addEntry}>Add Entry</button>
      </div>
      <div className="entries">
        {entries.map(entry => (
          <div key={entry._id} className="entry">
            {updateEntryId === entry._id ? (
              <>
                <input
                  type="text"
                  placeholder="Title"
                  value={updatedTitle || entry.title}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <textarea
                  placeholder="Content"
                  value={updatedContent || entry.content}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                ></textarea>
                <button onClick={() => updateEntry(entry._id)}>Save</button>
              </>
            ) : (
              <>
                <h2>{entry.title}</h2>
                <p>{entry.content}</p>
                <button onClick={() => deleteEntry(entry._id)}>Delete</button>
                <button onClick={() => setUpdateEntryId(entry._id)}>Update</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalEntry;
