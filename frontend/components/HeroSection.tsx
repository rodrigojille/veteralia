import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

export default function HeroSection() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 8, md: 12 }, textAlign: 'center', borderRadius: 3, mt: 4, mb: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" fontWeight={800} gutterBottom>
          Encuentra y agenda con los mejores veterinarios
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4, fontWeight: 400 }}>
          Veteralia es la plataforma moderna para dueños de mascotas y veterinarios en México. Citas fáciles, seguras y rápidas.
        </Typography>
        <Button href="/signup" variant="contained" size="large" color="secondary" sx={{ fontWeight: 700, px: 5, py: 2, fontSize: '1.2rem' }}>
          Comienza ahora
        </Button>
      </Container>
    </Box>
  );
}
