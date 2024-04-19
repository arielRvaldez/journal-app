import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});
 
function App() {


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
    <ApolloProvider client={client}>
      <Outlet />
    </ApolloProvider>

  );
}

export default App;