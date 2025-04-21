import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import Link from 'next/link';

export default function NavBar() {
  return (
    <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0', bgcolor: '#fff' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <img src="/logo.png" alt="Veteralia Logo" style={{ width: 50, marginRight: 12 }} />
            <Typography variant="h6" color="#1d3557" fontWeight={700} sx={{ letterSpacing: 1 }}>
              Veteralia
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Button component={Link} href="/" color="primary" sx={{ fontWeight: 600 }}>
              Inicio
            </Button>
            <Button component={Link} href="/signup" color="primary" sx={{ fontWeight: 600 }}>
              Registrarse
            </Button>
            <Button component={Link} href="/login" color="primary" sx={{ fontWeight: 600 }}>
              Iniciar Sesión
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
