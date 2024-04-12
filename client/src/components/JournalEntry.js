import React from 'react';

const JournalEntry = ({ entry }) => {
  return (
    <div className="journal-entry">
      <h2>{entry.title}</h2>
      <p>{entry.content}</p>
      <p>Date: {entry.date}</p>
    </div>
  );
};

export default JournalEntry;