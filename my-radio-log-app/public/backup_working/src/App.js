// src/App.js
import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import BandEntry from './components/BandEntry';
import ContactCard from './components/ContactCard';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleNewEntry = (data) => {
    if (editingIndex !== null) {
      const updated = [...entries];
      updated[editingIndex] = data;
      setEntries(updated);
      setEditingIndex(null);
    } else {
      setEntries([data, ...entries]);
    }
  };

  const handleDelete = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Amateur Radio Contact Logger
      </Typography>
      <BandEntry
        onSubmit={handleNewEntry}
        initialData={editingIndex !== null ? entries[editingIndex] : null}
      />
      {entries.map((entry, idx) => (
        <ContactCard
          key={idx}
          entry={entry}
          onDelete={() => handleDelete(idx)}
          onEdit={() => handleEdit(idx)}
        />
      ))}
    </Container>
  );
}