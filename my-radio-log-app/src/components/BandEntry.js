// src/components/BandEntry.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';

const bands = [
  '160m', '80m', '40m', '30m', '20m', '17m', '15m', '12m', '10m', '6m', '2m', '70cm'
];

const contactTypes = ['Worked', 'Tried', 'Heard'];

const callsignRegex = /^(?:[A-Z0-9]{1,3}\/)?[A-Z]{1,2}[0-9][A-Z0-9]{1,4}(?:\/[A-Z0-9]+)?$/i;

function validateCallsigns(input) {
  return input
    .split(/[ ,]+/) // Only split by space or comma, not newline
    .map(cs => cs.trim())
    .filter(Boolean)
    .map(cs => ({
      callsign: cs,
      isValid: callsignRegex.test(cs),
    }));
}

export default function BandEntry({ onSubmit, initialData }) {
  const [band, setBand] = useState(initialData?.band || '');
  const [contactType, setContactType] = useState(initialData?.contactType || '');
  const [callsigns, setCallsigns] = useState(
    initialData?.callsigns?.join(' ') || ''
  );
  const [comment, setComment] = useState(initialData?.comment || '');
  const [invalidCallsigns, setInvalidCallsigns] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [validatedCalls, setValidatedCalls] = useState([]);

  useEffect(() => {
    setBand(initialData?.band || '');
    setContactType(initialData?.contactType || '');
    setCallsigns(initialData?.callsigns?.join(' ') || '');
    setComment(initialData?.comment || '');
  }, [initialData]);

  const handlePreSubmit = () => {
    if (!band || !contactType || !callsigns.trim()) return;

    const validated = validateCallsigns(callsigns);
    const invalids = validated.filter(c => !c.isValid).map(c => c.callsign);
    setInvalidCallsigns(invalids);

    if (invalids.length > 0) return;

    setValidatedCalls(validated.map(c => c.callsign));
    setConfirmOpen(true); // Open confirmation dialog
  };

  const handleConfirmSubmit = () => {
    const data = {
      band,
      contactType,
      callsigns: validatedCalls,
      comment,
      date: new Date().toISOString()
    };

    onSubmit(data);

    // Reset state
    setBand('');
    setContactType('');
    setCallsigns('');
    setComment('');
    setInvalidCallsigns([]);
    setValidatedCalls([]);
    setConfirmOpen(false);
  };

  return (
    <Box
      sx={{
        p: 3,
        border: '1px solid #ddd',
        borderRadius: 2,
        boxShadow: 1,
        mb: 4,
        backgroundColor: '#fafafa'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Log a Contact
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Band</InputLabel>
        <Select value={band} label="Band" onChange={(e) => setBand(e.target.value)}>
          {bands.map((b) => (
            <MenuItem key={b} value={b}>
              {b}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Contact Type</InputLabel>
        <Select
          value={contactType}
          label="Contact Type"
          onChange={(e) => setContactType(e.target.value)}
        >
          {contactTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Callsigns (separated by space or comma)"
        multiline
        rows={3}
        fullWidth
        margin="normal"
        value={callsigns}
        onChange={(e) => setCallsigns(e.target.value)}
        error={invalidCallsigns.length > 0}
        helperText={
          invalidCallsigns.length > 0
            ? `Invalid: ${invalidCallsigns.join(', ')}`
            : 'Separate callsigns by spaces or commas'
        }
      />

      <TextField
        label="Comment (optional)"
        multiline
        rows={2}
        fullWidth
        margin="normal"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {invalidCallsigns.length > 0 && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Please fix invalid callsigns.
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handlePreSubmit}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you're done entering callsigns for <strong>{band}</strong> <strong>{contactType}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmSubmit} color="primary" variant="contained">
            Yes, Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}