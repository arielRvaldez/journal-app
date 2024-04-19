const [entries, setEntries] = useState([]);
  const [goals, setGoals] = useState([]);
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryContent, setNewEntryContent] = useState('');
  const [newGoal, setNewGoal] = useState('');

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