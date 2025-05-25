// src/components/ContactCard.js
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  IconButton,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function ContactCard({ entry, onDelete, onEdit }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            {entry.band} – {entry.contactType}
          </Typography>
          <Box>
            <IconButton onClick={onEdit} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={onDelete} size="small" color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt: 1, mb: 1 }}>
          {entry.callsigns.map((cs, i) => (
            <Chip key={i} label={cs} color="primary" />
          ))}
        </Stack>
        {entry.comment && (
          <Typography variant="body2" color="text.secondary">
            {entry.comment}
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary">
          Logged: {new Date(entry.date).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}