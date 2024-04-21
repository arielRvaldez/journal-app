import React, { useState } from 'react';
import axios from 'axios';

function JournalEntryForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend endpoint to add a new journal entry
      const response = await axios.post('http://localhost:5001/api/entries', {
        title,
        content,
        userId: '662340fcc67871b03a352344' // Hardcoded user ID for testing (replace with dynamic value)
      });
      console.log(response.data); // Log the response from the backend

      // Clear the form fields after successful submission
      setTitle('');
      setContent('');

      // Optionally, you can show a success message or perform any other action
      alert('Journal entry submitted successfully!');
    } catch (error) {
      console.error('Error submitting journal entry:', error); // Log any errors that occur during submission
      
      // Optionally, you can show an error message or perform any other action
      alert('Failed to submit journal entry. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default JournalEntryForm;
