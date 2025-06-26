import React, { useState } from 'react';
import BandEntry from './components/BandEntry';
import ContactCard from './components/ContactCard';
import { db } from './components/firebase'; // adjust path if needed
import { collection, addDoc } from 'firebase/firestore';

import {
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

function ContactLogger({ operatorInfo }) {
  const [contacts, setContacts] = useState([]);
  const [finalSubmitOpen, setFinalSubmitOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleAddContact = (contact) => {
    if (editIndex !== null) {
      setContacts((prev) =>
        prev.map((c, i) => (i === editIndex ? contact : c))
      );
      setEditIndex(null);
    } else {
      setContacts((prev) => [...prev, contact]);
    }
  };

  const handleDeleteContact = (indexToDelete) => {
    setContacts((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  const handleFinalSubmit = async () => {
  try {
    await addDoc(collection(db, "logs"), {
      operatorInfo,
      contacts,
      submittedAt: new Date().toISOString()
    });
    setFinalSubmitOpen(false);
    setSubmitted(true);
    // Optionally, show a success message or reset state here
  } catch (error) {
    console.error("Error saving log:", error);
    // Optionally, show an error message to the user
  }
};
 if (submitted) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Submission Successful!
        </Typography>
        <Typography variant="body1">
          Thank you for submitting your log.
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      {/* Operator Info Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        {/* <Typography variant="h5" gutterBottom>
          Log a Contact
        </Typography> */}
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line', textAlign: 'right' }}>
          {operatorInfo.callsign} – {operatorInfo.name}, {operatorInfo.location}
        </Typography>
      </Box>

      {/* Main Content Box */}
      <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, background: '#fafafa' }}>
        <BandEntry
          onAddContact={handleAddContact}
          initialData={editIndex !== null ? contacts[editIndex] : null}
        />

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Logged Contacts
          </Typography>
          <Grid container spacing={2}>
            {contacts.map((contact, index) => (
              <Grid item xs={12} key={index}>
                <ContactCard
                  contact={contact}
                  onDelete={() => setDeleteIndex(index)}
                  onEdit={() => setEditIndex(index)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setFinalSubmitOpen(true)}
            disabled={contacts.length === 0}
          >
            Final Submit
          </Button>
        </Box>
      </Box>

      {/* Final Submit Confirmation */}
      <Dialog open={finalSubmitOpen} onClose={() => setFinalSubmitOpen(false)}>
        <DialogTitle>Confirm Final Submission</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to submit your log for final processing?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFinalSubmitOpen(false)}>Cancel</Button>
          <Button onClick={handleFinalSubmit} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteIndex !== null} onClose={() => setDeleteIndex(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this contact?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteIndex(null)}>Cancel</Button>
          <Button
            onClick={() => {
              handleDeleteContact(deleteIndex);
              setDeleteIndex(null);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ContactLogger;