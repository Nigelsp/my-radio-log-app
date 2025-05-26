// src/App.js
import React, { useState } from 'react';
import OperatorInfoForm from './OperatorInfoForm';
import ContactLogger from './ContactLogger';

function App() {
  const [operatorInfo, setOperatorInfo] = useState(null);

  return (
    <>
      {!operatorInfo ? (
        <OperatorInfoForm onSubmit={setOperatorInfo} />
      ) : (
        <ContactLogger operatorInfo={operatorInfo} />
      )}
    </>
  );
}

export default App;