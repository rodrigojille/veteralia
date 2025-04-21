import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Registrarse', href: '/signup' },
  { label: 'Iniciar Sesión', href: '/login' },
];

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0', bgcolor: '#fff' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" minWidth={0} sx={{ flexShrink: 1 }}>
            <Box
              component="img"
              src="/logo.png"
              alt="Veteralia Logo"
              sx={{ width: { xs: 36, sm: 50 }, mr: 1.5, flexShrink: 0 }}
            />
            <Typography
              variant="h6"
              color="#1d3557"
              fontWeight={700}
              sx={{ letterSpacing: 1, fontSize: { xs: '1.1rem', sm: '1.25rem' }, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: { xs: 110, sm: 180 } }}
            >
              Veteralia
            </Typography>
          </Box>
          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                PaperProps={{ sx: { width: 220 } }}
              >
                <Box sx={{ mt: 2, mb: 1, px: 2, display: 'flex', alignItems: 'center' }}>
                  <Box
                    component="img"
                    src="/logo.png"
                    alt="Veteralia Logo"
                    sx={{ width: 36, mr: 1 }}
                  />
                  <Typography variant="h6" color="#1d3557" fontWeight={700} sx={{ letterSpacing: 1 }}>
                    Veteralia
                  </Typography>
                </Box>
                <List>
                  {navLinks.map(({ label, href }) => (
                    <ListItem key={href} disablePadding>
                      <ListItemButton
                        component={Link}
                        href={href}
                        onClick={handleDrawerToggle}
                      >
                        <ListItemText primary={label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </>
          ) : (
            <Box display="flex" gap={2}>
              {navLinks.map(({ label, href }) => (
                <Button
                  key={href}
                  component={Link}
                  href={href}
                  color="primary"
                  sx={{ fontWeight: 600 }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
