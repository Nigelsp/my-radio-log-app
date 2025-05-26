// src/ContactLogger.js
import React, { useState } from 'react';
import BandEntry from './BandEntry';
import ContactCard from './ContactCard';
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

function ContactLogger({ operatorInfo }) {
  const [contacts, setContacts] = useState([]);
  const [finalSubmitDialogOpen, setFinalSubmitDialogOpen] = useState(false);

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const updateContact = (index, updatedContact) => {
    const updated = [...contacts];
    updated[index] = updatedContact;
    setContacts(updated);
  };

  const deleteContact = (index) => {
    const updated = [...contacts];
    updated.splice(index, 1);
    setContacts(updated);
  };

  const handleFinalSubmit = () => {
    // This is where you'd send data to a server or generate a report
    console.log('Final submit payload:', {
      operator: operatorInfo,
      contacts,
    });
    setFinalSubmitDialogOpen(false);
    alert('Final submission recorded. Thank you!');
  };

  return (
    <Box p={2}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Log a Contact
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            {operatorInfo.callsign} — {operatorInfo.name} — {operatorInfo.location}
          </Typography>
        </Grid>
      </Grid>

      <BandEntry onSubmit={addContact} />

      {contacts.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Contacts Entered
          </Typography>
          {contacts.map((contact, index) => (
            <ContactCard
              key={index}
              contact={contact}
              onUpdate={(updated) => updateContact(index, updated)}
              onDelete={() => deleteContact(index)}
            />
          ))}

          <Box mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setFinalSubmitDialogOpen(true)}
            >
              Final Submit
            </Button>
          </Box>
        </>
      )}

      <Dialog open={finalSubmitDialogOpen} onClose={() => setFinalSubmitDialogOpen(false)}>
        <DialogTitle>Confirm Final Submission</DialogTitle>
        <DialogContent>
          Are you sure you want to submit your log? You will not be able to edit it afterward.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFinalSubmitDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleFinalSubmit} color="primary" variant="contained">
            Confirm Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ContactLogger;