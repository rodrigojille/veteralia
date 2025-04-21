import React from 'react';
import Head from 'next/head';
import { Container, Typography, Box, Button } from '@mui/material';
import dynamic from 'next/dynamic';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

import { useEffect, useState } from 'react';

// Example veterinarian data (replace with API data as needed)
const VETS = [
  {
    id: 1,
    name: 'Dra. Ana López',
    specialty: 'Perros y gatos',
    location: { lat: 19.4326, lng: -99.1332 },
    address: 'CDMX, Roma Norte',
  },
  {
    id: 2,
    name: 'Dr. Carlos Méndez',
    specialty: 'Exóticos',
    location: { lat: 19.427, lng: -99.14 },
    address: 'CDMX, Condesa',
  },
  {
    id: 3,
    name: 'Dra. María Torres',
    specialty: 'Aves',
    location: { lat: 19.45, lng: -99.15 },
    address: 'CDMX, Polanco',
  },
];

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredVets, setFilteredVets] = useState(VETS);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Filter vets by name, specialty, or address
    const q = search.toLowerCase();
    setFilteredVets(
      VETS.filter(
        vet =>
          vet.name.toLowerCase().includes(q) ||
          vet.specialty.toLowerCase().includes(q) ||
          vet.address.toLowerCase().includes(q)
      )
    );
  }, [search]);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Head>
        <title>Veteralia | Encuentra y agenda con veterinarios</title>
        <meta name="description" content="La mejor plataforma para dueños de mascotas y veterinarios en México." />
      </Head>
      {/* NavBar */}
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 4 } }}>
          <Box display="flex" alignItems="center">
            <img src="/logo.png" alt="Veteralia Logo" style={{ width: 40, marginRight: 12 }} />
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700, letterSpacing: 1 }}>
              Veteralia
            </Typography>
          </Box>
          <Box display="flex" gap={2} alignItems="center">
            <Link href="#como-funciona" passHref legacyBehavior><Button color="inherit">Cómo funciona</Button></Link>
            <Link href="#resenas" passHref legacyBehavior><Button color="inherit">Reseñas</Button></Link>
            <Link href="#buscar-vet" passHref legacyBehavior><Button color="inherit">Buscar veterinario</Button></Link>
            <Link href="/login" passHref legacyBehavior><Button color="primary" variant="outlined">Iniciar sesión</Button></Link>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Hero Section */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        px: { xs: 2, md: 8 },
        py: { xs: 6, md: 10 },
        bgcolor: 'background.paper',
        gap: { xs: 4, md: 8 },
      }}>
        <Box flex={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 2, color: 'primary.main', letterSpacing: 1 }}>
            Encuentra y agenda con los mejores veterinarios
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Plataforma moderna para dueños de mascotas y veterinarios en México. Fácil, rápido y confiable.
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ px: 5, py: 1.5, fontWeight: 700 }} href="/signup">
            Comienza Ahora
          </Button>
        </Box>
        <Box flex={1} display="flex" justifyContent="center">
          <img
            src="/hero-vet.svg"
            alt="Veterinario y mascota ilustración"
            style={{ maxWidth: '340px', width: '100%', height: 'auto', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
            onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
          />
        </Box>
      </Box>

      {/* Buscar veterinario Section (client-only to fix hydration) */}
      {isClient && (
        <Box id="buscar-vet" sx={{
          bgcolor: 'grey.50',
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 8 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography variant="h4" component="h2" align="center" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
            Buscar veterinario
          </Typography>
          <Typography color="text.secondary" align="center" sx={{ mb: 4, maxWidth: 500 }}>
            Ingresa el nombre, especialidad o ubicación para encontrar el veterinario ideal para tu mascota.
          </Typography>
          <Box component="form" sx={{ display: 'flex', gap: 2, width: '100%', maxWidth: 500 }} onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Ej. Ciudad, especialidad, nombre..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid #ccc',
                fontSize: 18,
                outline: 'none',
              }}
            />
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ px: 4, borderRadius: 8 }}>
              Buscar
            </Button>
          </Box>
        </Box>
      )}

      {/* Cómo funciona Section */}
      <Box id="como-funciona" sx={{
        bgcolor: 'grey.50',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 8 },
      }}>
        <Typography variant="h4" component="h2" align="center" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
          ¿Cómo funciona?
        </Typography>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="center" alignItems="stretch" gap={4}>
          {/* Step 1 */}
          <Box flex={1} sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 1, p: 4, minWidth: 220, textAlign: 'center' }}>
            <span style={{ fontSize: 48, color: '#00bfae' }}>🐾</span>
            <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
              Busca veterinarios
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Encuentra veterinarios por especialidad, ubicación o servicios.
            </Typography>
          </Box>
          {/* Step 2 */}
          <Box flex={1} sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 1, p: 4, minWidth: 220, textAlign: 'center' }}>
            <span style={{ fontSize: 48, color: '#00bfae' }}>📅</span>
            <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
              Agenda tu cita
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Elige el horario que más te convenga y reserva en segundos.
            </Typography>
          </Box>
          {/* Step 3 */}
          <Box flex={1} sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 1, p: 4, minWidth: 220, textAlign: 'center' }}>
            <span style={{ fontSize: 48, color: '#00bfae' }}>💬</span>
            <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
              Recibe confirmación
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Obtén confirmación y recordatorios automáticos para tu cita.
            </Typography>
          </Box>
          {/* Step 4 */}
          <Box flex={1} sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 1, p: 4, minWidth: 220, textAlign: 'center' }}>
            <span style={{ fontSize: 48, color: '#00bfae' }}>🏥</span>
            <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
              Acude a tu consulta
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Lleva a tu mascota y disfruta de un servicio profesional.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Reseñas Section */}
      <Box id="resenas" sx={{
        bgcolor: 'background.paper',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 8 },
      }}>
        <Typography variant="h4" component="h2" align="center" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
          Reseñas de clientes
        </Typography>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="center" alignItems="stretch" gap={{ xs: 2, md: 4 }}>
          {/* Review 1 */}
          <Box flex={1} sx={{ bgcolor: 'grey.50', borderRadius: 3, boxShadow: 1, p: { xs: 2, md: 4 }, minWidth: 220, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', marginBottom: 16 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Ana López</Typography>
            <Box sx={{ color: '#FFD600', mb: 1 }}>★★★★★</Box>
            <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
              “Excelente plataforma, encontré veterinario para mi perro en minutos. Súper recomendable.”
            </Typography>
          </Box>
          {/* Review 2 */}
          <Box flex={1} sx={{ bgcolor: 'grey.50', borderRadius: 3, boxShadow: 1, p: { xs: 2, md: 4 }, minWidth: 220, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: { xs: 2, md: 0 } }}>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', marginBottom: 16 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Carlos Méndez</Typography>
            <Box sx={{ color: '#FFD600', mb: 1 }}>★★★★★</Box>
            <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
              “El proceso de agendar fue muy fácil y el veterinario fue muy profesional.”
            </Typography>
          </Box>
          {/* Review 3 */}
          <Box flex={1} sx={{ bgcolor: 'grey.50', borderRadius: 3, boxShadow: 1, p: { xs: 2, md: 4 }, minWidth: 220, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: { xs: 2, md: 0 } }}>
            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', marginBottom: 16 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>María Torres</Typography>
            <Box sx={{ color: '#FFD600', mb: 1 }}>★★★★★</Box>
            <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
              “Me encantó la experiencia, recibí recordatorios y todo fue muy sencillo.”
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider', mt: 10, py: 4 }}>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="space-between" maxWidth="lg" mx="auto" px={2} gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <img src="/logo.png" alt="Veteralia Logo" style={{ width: 36, height: 36 }} />
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>Veteralia</Typography>
          </Box>
          <Box display="flex" gap={3} alignItems="center" mt={{ xs: 2, md: 0 }}>
            <Link href="/terminos" passHref legacyBehavior><Button color="inherit" size="small">Términos</Button></Link>
            <Link href="/privacidad" passHref legacyBehavior><Button color="inherit" size="small">Privacidad</Button></Link>
            <Link href="/contacto" passHref legacyBehavior><Button color="inherit" size="small">Contacto</Button></Link>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          © {new Date().getFullYear()} Veteralia. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
}

