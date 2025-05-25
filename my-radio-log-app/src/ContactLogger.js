// src/ContactLogger.js
import React, { useState } from 'react';
import BandEntry from './components/BandEntry';
import {
  Container,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const bands = [
  '160m', '80m', '40m', '30m', '20m', '17m',
  '15m', '12m', '10m', '6m', '2m', '70cm'
];

const contactTypes = ['Worked', 'Tried', 'Heard'];

export default function ContactLogger() {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [lastDeleted, setLastDeleted] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = (data) => {
    if (editingEntry !== null) {
      setEntries((prev) =>
        prev.map((entry, index) =>
          index === editingEntry ? data : entry
        )
      );
      setEditingEntry(null);
    } else {
      setEntries((prev) => [...prev, data]);
    }
  };

  const confirmDelete = (index) => {
    setEntryToDelete(index);
  };

  const handleDeleteConfirmed = () => {
    const deleted = entries[entryToDelete];
    setLastDeleted({ entry: deleted, index: entryToDelete });
    setEntries((prev) => prev.filter((_, i) => i !== entryToDelete));
    setEntryToDelete(null);
    setSnackbarOpen(true);
  };

  const handleUndo = () => {
    if (lastDeleted) {
      const restored = [...entries];
      restored.splice(lastDeleted.index, 0, lastDeleted.entry);
      setEntries(restored);
      setLastDeleted(null);
    }
    setSnackbarOpen(false);
  };

  const groupedEntries = {};
  entries.forEach((entry, index) => {
    const key = `${entry.band}_${entry.contactType}`;
    if (!groupedEntries[key]) {
      groupedEntries[key] = { ...entry, index };
    }
  });

  return (
    <Container maxWidth="md" sx={{ pt: 4 }}>
      <BandEntry
        onSubmit={handleSubmit}
        initialData={editingEntry !== null ? entries[editingEntry] : null}
      />

      <Typography variant="h6" gutterBottom>
        Progress Tracker
      </Typography>

      <Paper elevation={2} sx={{ maxHeight: 300, overflow: 'auto', mb: 4 }}>
        <List dense>
          {bands.map((band) => {
            const enteredTypes = contactTypes.filter((type) =>
              groupedEntries[`${band}_${type}`]
            );
            if (enteredTypes.length === 0) return null;

            return (
              <React.Fragment key={band}>
                <ListItem>
                  <Typography variant="subtitle1">{band}</Typography>
                </ListItem>
                {enteredTypes.map((type) => {
                  const key = `${band}_${type}`;
                  const entry = groupedEntries[key];
                  return (
                    <ListItem key={key} sx={{ pl: 4 }}>
                      <ListItemText
                        primary={type}
                        secondary="✅ Entered"
                      />
                      <Box>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => setEditingEntry(entry.index)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => confirmDelete(entry.index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                  );
                })}
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={entryToDelete !== null}
        onClose={() => setEntryToDelete(null)}
      >
        <DialogTitle>Delete Entry</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this entry? This action can be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEntryToDelete(null)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteConfirmed}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Undo Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          severity="info"
          action={
            <Button color="inherit" size="small" onClick={handleUndo}>
              UNDO
            </Button>
          }
        >
          Entry deleted.
        </Alert>
      </Snackbar>
    </Container>
  );
}