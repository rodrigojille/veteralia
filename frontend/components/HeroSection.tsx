import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

export default function HeroSection() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 8, md: 12 }, textAlign: 'center', borderRadius: 3, mt: 4, mb: 8 }}>
      <Container maxWidth="md">
        <Box
          component="img"
          src="/logo.png"
          alt="Veteralia Logo"
          sx={{
            width: { xs: 80, sm: 100, md: 120 },
            display: 'block',
            mx: 'auto',
            mb: { xs: 2.5, md: 3 },
            mt: { xs: 0, md: 1 },
          }}
        />
        <Typography
          variant="h2"
          component="h1"
          fontWeight={800}
          gutterBottom
          sx={{
            fontSize: { xs: '2.1rem', sm: '2.7rem', md: '3.2rem' },
            mb: { xs: 2, md: 3 },
            lineHeight: 1.15,
          }}
        >
          Encuentra y agenda con los mejores veterinarios
        </Typography>
        <Typography
          variant="h5"
          component="p"
          sx={{
            mb: { xs: 3, md: 4 },
            fontWeight: 400,
            fontSize: { xs: '1.05rem', sm: '1.2rem', md: '1.4rem' },
            lineHeight: 1.35,
          }}
        >
          Veteralia es la plataforma moderna para dueños de mascotas y veterinarios en México. Citas fáciles, seguras y rápidas.
        </Typography>
        <Button
          href="/signup"
          variant="contained"
          size="large"
          color="secondary"
          sx={{
            fontWeight: 700,
            px: { xs: 4, sm: 5 },
            py: { xs: 1.2, sm: 2 },
            fontSize: { xs: '1rem', sm: '1.13rem', md: '1.2rem' },
            borderRadius: 2.5,
            boxShadow: 2,
          }}
        >
          Comienza ahora
        </Button>
      </Container>
    </Box>
  );
}
