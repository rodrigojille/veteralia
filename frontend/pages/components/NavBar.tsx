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
  { label: 'Buscar Veterinario', href: '#buscar-vet' },
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
            <Link href="/" passHref legacyBehavior>
  <Box component="a" display="flex" alignItems="center" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
    <Box
      component="img"
      src="/logo.png"
      alt="Veteralia Logo"
      sx={{ width: { xs: 40, sm: 56 }, height: { xs: 40, sm: 56 }, mr: 1.5, borderRadius: 2, boxShadow: 1, bgcolor: '#fff', p: 0.3 }}
      onClick={() => { window.location.href = '/'; }}
      style={{ cursor: 'pointer' }}
    />
    <Typography
      variant="h6"
      color="#1d3557"
      fontWeight={700}
      sx={{ fontFamily: 'Inter, Arial, sans-serif', letterSpacing: 1, fontSize: { xs: '1.18rem', sm: '1.32rem' }, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: { xs: 120, sm: 180 }, ml: 0 }}
    >
      Veteralia
    </Typography>
  </Box>
</Link>
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
                  <Link href="/" passHref legacyBehavior>
                    <Box component="a" display="flex" alignItems="center" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                      <Box
                        component="img"
                        src="/logo.png"
                        alt="Veteralia Logo"
                        sx={{ width: { xs: 40, sm: 56 }, height: { xs: 40, sm: 56 }, mr: 1.5, borderRadius: 2, boxShadow: 1, bgcolor: '#fff', p: 0.3 }}
                      />
                      <Typography
                        variant="h6"
                        color="#1d3557"
                        fontWeight={700}
                        sx={{ fontFamily: 'Inter, Arial, sans-serif', letterSpacing: 1, fontSize: { xs: '1.18rem', sm: '1.32rem' }, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: { xs: 120, sm: 180 }, ml: 0 }}
                      >
                        Veteralia
                      </Typography>
                    </Box>
                  </Link>
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
                  sx={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 600, fontSize: { xs: '1rem', md: '1.05rem' } }}
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
