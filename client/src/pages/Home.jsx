import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Auth from '../utils/auth'; // Import your authentication utility

function Home() {
  const [entries, setEntries] = useState([]);
  const [goals, setGoals] = useState([]);
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryContent, setNewEntryContent] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const history = useHistory();

  // Effect to check authentication status on component mount
  useEffect(() => {
    if (!Auth.isAuthenticated()) {
      // Redirect to login page if not authenticated
      history.push('/login');
    }
  }, [history]);

  const addEntry = () => {
    // Check authentication before allowing user to add entry
    if (!Auth.isAuthenticated()) {
      history.push('/login');
      return;
    }

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
    // Check authentication before allowing user to add goal
    if (!Auth.isAuthenticated()) {
      history.push('/login');
      return;
    }

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
    // Check authentication before allowing user to delete item
    if (!Auth.isAuthenticated()) {
      history.push('/login');
      return;
    }

    setEntries(entries.filter(entry => entry.id !== id));
    setGoals(goals.filter(goal => goal.id !== id));
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
            <h2>{entry.title}</h2>
            <p>{entry.content}</p>
            <p className="date">Date: {entry.date}</p>
            <button onClick={() => deleteItem(entry.id)}>Delete</button>
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

export default Home;
