// src/OperatorInfoForm.js
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';

function OperatorInfoForm({ onSubmit }) {
  const [callsign, setCallsign] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = () => {
    setConfirmOpen(false);
    onSubmit({ callsign, name, location });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmOpen(true);
  };

  const allValid = callsign.trim() && name.trim() && location.trim();

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Enter Operator Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Callsign"
          value={callsign}
          onChange={(e) => setCallsign(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!allValid}
          sx={{ mt: 2 }}
        >
          Continue
        </Button>
      </form>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Operator Information</DialogTitle>
        <DialogContent>
          <Typography>Callsign: {callsign}</Typography>
          <Typography>Name: {name}</Typography>
          <Typography>Location: {location}</Typography>
          <Typography sx={{ mt: 2 }}>
            Is this information correct?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Edit</Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default OperatorInfoForm;