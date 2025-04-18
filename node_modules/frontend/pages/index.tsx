import React from 'react';
import Head from 'next/head';
import { Container, Typography, Box, Button } from '@mui/material';

export default function Home() {
  return (
    <>
      <Head>
        <title>Veteralia | Encuentra y agenda con veterinarios</title>
        <meta name="description" content="La mejor plataforma para dueños de mascotas y veterinarios en México." />
      </Head>
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
        <Box>
          <img src="/logo.png" alt="Veteralia Logo" style={{ width: 120, marginBottom: 24 }} />
          <Typography variant="h3" component="h1" gutterBottom>
            Bienvenido a Veteralia
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            La plataforma moderna para agendar citas veterinarias, inspirada en Doctoralia y Airbnb.
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ mt: 4 }} href="/signup">
            Comienza Ahora
          </Button>
        </Box>
      </Container>
    </>
  );
}
