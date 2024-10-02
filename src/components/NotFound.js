// NotFound.js
import React from 'react';
import { Typography, Container } from '@mui/material';

function NotFound() {
  return (
    <Container style={{ marginTop: '40px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Página não encontrada
      </Typography>
      <Typography variant="body1" align="center">
        A página que você está tentando acessar não existe.
      </Typography>
    </Container>
  );
}

export default NotFound;
