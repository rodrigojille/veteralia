import React from 'react';
import { Box, Typography, Container, Link as MuiLink } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#1d3557', color: '#fff', py: 4, mt: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="body1" align="center" sx={{ mb: 1 }}>
          © {new Date().getFullYear()} Veteralia. Todos los derechos reservados.
        </Typography>
        <Typography variant="body2" align="center">
          <MuiLink href="/" color="inherit" underline="hover" sx={{ mx: 1 }}>
            Inicio
          </MuiLink>
          |
          <MuiLink href="/signup" color="inherit" underline="hover" sx={{ mx: 1 }}>
            Registrarse
          </MuiLink>
          |
          <MuiLink href="/login" color="inherit" underline="hover" sx={{ mx: 1 }}>
            Iniciar Sesión
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
}
