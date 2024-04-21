import React, { useState } from 'react';
import axios from 'axios';

function GoalEntryForm() {
  const [goal, setGoal] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/goal', { goal });
      console.log(response.data); // Handle successful goal entry
    } catch (error) {
      console.error(error); // Handle goal entry error
    }
  };

  return (
    <div>
      <h2>Goal Entry</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Goal" value={goal} onChange={(e) => setGoal(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GoalEntryForm;
