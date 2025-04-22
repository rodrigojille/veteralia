import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

export default function LandingFooter() {
  return (
    <Box sx={{ bgcolor: 'grey.200', py: 4, mt: 8 }} component="footer">
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Vetoralia. Todos los derechos reservados. &nbsp;|
          &nbsp;
          <Link href="/" color="inherit" underline="hover">Inicio</Link>
          &nbsp;|&nbsp;
          <Link href="/about" color="inherit" underline="hover">Acerca de</Link>
          &nbsp;|&nbsp;
          <Link href="/contact" color="inherit" underline="hover">Contacto</Link>
        </Typography>
      </Container>
    </Box>
  );
}
