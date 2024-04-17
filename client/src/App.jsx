import React, { useState } from 'react';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [goals, setGoals] = useState([]);
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryContent, setNewEntryContent] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [editingEntryId, setEditingEntryId] = useState(null); // Track the ID of the entry being edited
  const [updatedEntryTitle, setUpdatedEntryTitle] = useState(''); // Track the updated entry title
  const [updatedEntryContent, setUpdatedEntryContent] = useState(''); // Track the updated entry content

  const addEntry = () => {
    if (newEntryTitle.trim() === '' || newEntryContent.trim() === '') {
      alert('Please fill out both title and content fields.');
      return;
    }

    const newEntry = {
      id: Date.now(),
      type: 'journal',
      title: newEntryTitle,
      content: newEntryContent,
      date: new Date().toLocaleDateString()
    };
    setEntries([...entries, newEntry]);
    setNewEntryTitle('');
    setNewEntryContent('');
  };

  const addGoal = () => {
    if (newGoal.trim() === '') {
      alert('Please enter a goal.');
      return;
    }

    const newGoalItem = {
      id: Date.now(),
      type: 'goal',
      goal: newGoal,
    };
    setGoals([...goals, newGoalItem]);
    setNewGoal('');
  };

  const deleteItem = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const handleUpdate = (id) => {
    // Find the entry to be updated
    const entryToUpdate = entries.find(entry => entry.id === id);
    if (!entryToUpdate) return;

    // Set the editing state and pre-fill the updated entry fields
    setEditingEntryId(id);
    setUpdatedEntryTitle(entryToUpdate.title);
    setUpdatedEntryContent(entryToUpdate.content);
  };

  const saveUpdatedEntry = () => {
    // Find the index of the entry to be updated
    const index = entries.findIndex(entry => entry.id === editingEntryId);
    if (index === -1) return;

    // Update the entry with new values
    const updatedEntries = [...entries];
    updatedEntries[index] = {
      ...updatedEntries[index],
      title: updatedEntryTitle,
      content: updatedEntryContent,
    };

    // Update the state with the new entries and reset editing state
    setEntries(updatedEntries);
    setEditingEntryId(null);
    setUpdatedEntryTitle('');
    setUpdatedEntryContent('');
  };

  const cancelUpdate = () => {
    // Reset the editing state
    setEditingEntryId(null);
    setUpdatedEntryTitle('');
    setUpdatedEntryContent('');
  };

  return (
    <div className="container">
      <h1>My Journal and Goals</h1>
      <div className="entry-form">
        <input
          type="text"
          placeholder="Journal Entry Title"
          value={newEntryTitle}
          onChange={(e) => setNewEntryTitle(e.target.value)}
        />
        <textarea
          placeholder="Journal Entry Content"
          value={newEntryContent}
          onChange={(e) => setNewEntryContent(e.target.value)}
        ></textarea>
        <button onClick={addEntry}>Add Journal Entry</button>
        <input
          type="text"
          placeholder="Goal"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <button onClick={addGoal}>Add Goal</button>
      </div>
      <div className="entries">
        {entries.map(entry => (
          <div key={entry.id} className="entry">
            {editingEntryId === entry.id ? (
              <>
                <input
                  type="text"
                  value={updatedEntryTitle}
                  onChange={(e) => setUpdatedEntryTitle(e.target.value)}
                />
                <textarea
                  value={updatedEntryContent}
                  onChange={(e) => setUpdatedEntryContent(e.target.value)}
                ></textarea>
                <div className="button-container">
                  <button className="update-button" onClick={saveUpdatedEntry}>Save</button>
                  <button className="delete-button" onClick={cancelUpdate}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h2>{entry.title}</h2>
                <p>{entry.content}</p>
                <p className="date">Date: {entry.date}</p>
                <div className="button-container">
                  <button className="update-button" onClick={() => handleUpdate(entry.id)}>Update</button>
                  <button className="delete-button" onClick={() => deleteItem(entry.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
        {goals.map(goal => (
          <div key={goal.id} className="goal">
            <p>{goal.goal}</p>
            <button onClick={() => deleteItem(goal.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;