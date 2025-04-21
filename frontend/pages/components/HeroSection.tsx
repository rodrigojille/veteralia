import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';

export default function HeroSection() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, textAlign: 'center', bgcolor: '#f8fafc' }}>
      <Container maxWidth="md">
        <Typography variant="h1" sx={{ fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.8rem' }, mb: 2, color: '#1d3557' }}>
          Encuentra y agenda con veterinarios de confianza
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, color: '#457b9d' }}>
          Veteralia conecta a dueños de mascotas con veterinarios certificados en México. Reserva citas, consulta perfiles y cuida a tu mejor amigo con la mejor tecnología.
        </Typography>
        <Button variant="contained" color="primary" size="large" href="/signup" sx={{ px: 5, py: 1.5, fontWeight: 700, fontSize: '1.1rem', borderRadius: 3 }}>
          Comienza Ahora
        </Button>
      </Container>
    </Box>
  );
}
