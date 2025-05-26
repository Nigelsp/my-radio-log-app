// src/App.js
import React, { useState } from 'react';
import OperatorInfoForm from './OperatorInfoForm';
import ContactLogger from './ContactLogger';
import { Box, Typography, Divider } from '@mui/material';

function App() {
  const [operatorInfo, setOperatorInfo] = useState(null);

  if (!operatorInfo) {
    return <OperatorInfoForm onSubmit={setOperatorInfo} />;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Operator Info</Typography>
        <Typography>Callsign: {operatorInfo.callsign}</Typography>
        <Typography>Name: {operatorInfo.name}</Typography>
        <Typography>Location: {operatorInfo.location}</Typography>
        <Divider sx={{ mt: 2 }} />
      </Box>

      <ContactLogger operatorInfo={operatorInfo} />
    </Box>
  );
}

export default App;