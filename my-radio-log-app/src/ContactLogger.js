// src/ContactLogger.js
import React, { useState } from 'react';
import BandEntry from './components/BandEntry';
import ContactCard from './components/ContactCard';
import {
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from '@mui/material';

function ContactLogger({ operatorInfo }) {
  const [contacts, setContacts] = useState([]);
  const [finalSubmitOpen, setFinalSubmitOpen] = useState(false);

  const handleAddContact = (contact) => {
    setContacts((prev) => [...prev, contact]);
  };

  const handleDeleteContact = (indexToDelete) => {
    setContacts((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  const handleFinalSubmit = () => {
    // Placeholder for final submission logic
    console.log('Final Submission:', {
      operatorInfo,
      contacts,
    });
    setFinalSubmitOpen(false);
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Log a Contact
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line', textAlign: 'right' }}>
          {operatorInfo.callsign} – {operatorInfo.name}, {operatorInfo.location}
        </Typography>
      </Box>

      <BandEntry onAddContact={handleAddContact} />

      <Box mt={4}>
        <Typography variant="h6">Logged Contacts</Typography>
        <Grid container spacing={2}>
          {contacts.map((contact, index) => (
            <Grid item xs={12} md={6} key={index}>
              <ContactCard
                contact={contact}
                onDelete={() => handleDeleteContact(index)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setFinalSubmitOpen(true)}
          disabled={contacts.length === 0}
        >
          Final Submit
        </Button>
      </Box>

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
    </Box>
  );
}

export default ContactLogger;