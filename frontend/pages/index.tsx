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
      {/* Shared NavBar */}
      {require('./components/NavBar').default()}

      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: { xs: 'auto', md: '60vh' },
          px: { xs: 2, md: 8 },
          py: { xs: 6, md: 10 },
          bgcolor: 'background.paper',
          gap: { xs: 4, md: 8 },
          width: '100%',
          mx: 'auto',
        }}
      >
        {/* Left: Headline, desc, CTA (centered on mobile, left on desktop) */}
        <Box
          flex={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
            justifyContent: 'center',
            mx: { xs: 'auto', md: 0 },
            maxWidth: 540,
            width: '100%',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 2,
              color: 'primary.main',
              letterSpacing: 1,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Encuentra y agenda con los mejores veterinarios
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
          >
            Plataforma moderna para dueños de mascotas y veterinarios en México. Fácil, rápido y confiable.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              fontWeight: 700,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: 2,
              mb: 2,
              width: { xs: '100%', sm: 'auto' },
              fontSize: { xs: '1rem', sm: '1.125rem' },
            }}
          >
            COMIENZA AHORA
          </Button>
        </Box>
        {/* Right: Hero Illustration (centered on mobile/desktop) */}
        <Box flex={1} display="flex" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
          <img
            src="/hero-vet.svg"
            alt="Veteralia Hero"
            style={{ width: '100%', maxWidth: 340, minWidth: 180 }}
          />
        </Box>
      </Box>

      {/* Buscar veterinario Section (client-only to fix hydration) */}
      {/* Search Section */}
      <Box
        id="buscar-vet"
        sx={{
          bgcolor: 'grey.50',
          py: { xs: 4, md: 6 },
          px: { xs: 2, md: 0 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          maxWidth={{ xs: '100%', sm: 500, md: 700 }}
          width="100%"
          sx={{ mb: 2, mx: 'auto' }}
        >
          <Typography
            variant="h4"
            component="h2"
            align="center"
            sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}
          >
            Buscar veterinario
          </Typography>
          <Typography color="text.secondary" align="center" sx={{ mb: 3 }}>
            Ingresa el nombre, especialidad o ubicación para encontrar el veterinario ideal para tu mascota.
          </Typography>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={2}
            width="100%"
          >
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Ej. Ciudad, especialidad, nombre..."
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: 16,
                width: '100%',
                marginBottom: 0,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                px: 4,
                py: 1,
                fontSize: 16,
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              Buscar
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Cómo funciona Section */}
      <Box id="como-funciona" sx={{ bgcolor: 'grey.50', py: { xs: 6, md: 10 }, px: { xs: 2, md: 8 } }}>
        <Typography variant="h4" component="h2" align="center" sx={{ fontWeight: 700, mb: 4, color: 'primary.main', fontFamily: 'Inter, Arial, sans-serif' }}>
          ¿Cómo funciona?
        </Typography>
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }} gap={{ xs: 3, md: 4 }}>
          {/* Step 1 */}
          <Box component="div" sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 1, p: { xs: 3, md: 4 }, minWidth: 180, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 56, color: '#00bfae' }}>🐾</span>
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 2, fontSize: { xs: '1.1rem', md: '1.2rem' }, fontFamily: 'Inter, Arial, sans-serif' }}>
              Busca veterinarios
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, fontSize: { xs: '0.98rem', md: '1.05rem' } }}>
              Encuentra veterinarios por especialidad, ubicación o servicios.
            </Typography>
          </Box>
          {/* Step 2 */}
          <Box component="div" sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 1, p: { xs: 3, md: 4 }, minWidth: 180, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 56, color: '#00bfae' }}>📅</span>
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 2, fontSize: { xs: '1.1rem', md: '1.2rem' }, fontFamily: 'Inter, Arial, sans-serif' }}>
              Agenda tu cita
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, fontSize: { xs: '0.98rem', md: '1.05rem' } }}>
              Elige el horario que más te convenga y reserva en segundos.
            </Typography>
          </Box>
          {/* Step 3 */}
          <Box component="div" sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 1, p: { xs: 3, md: 4 }, minWidth: 180, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 56, color: '#00bfae' }}>💬</span>
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 2, fontSize: { xs: '1.1rem', md: '1.2rem' }, fontFamily: 'Inter, Arial, sans-serif' }}>
              Recibe confirmación
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, fontSize: { xs: '0.98rem', md: '1.05rem' } }}>
              Obtén confirmación y recordatorios automáticos para tu cita.
            </Typography>
          </Box>
          {/* Step 4 */}
          <Box component="div" sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 1, p: { xs: 3, md: 4 }, minWidth: 180, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 56, color: '#00bfae' }}>🏥</span>
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 2, fontSize: { xs: '1.1rem', md: '1.2rem' }, fontFamily: 'Inter, Arial, sans-serif' }}>
              Acude a tu consulta
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, fontSize: { xs: '0.98rem', md: '1.05rem' } }}>
              Lleva a tu mascota y disfruta de un servicio profesional.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Reseñas Section */}
      <Box id="resenas" sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 8 },
        bgcolor: 'background.paper',
      }}>
        <Typography variant="h4" component="h2" align="center" sx={{ fontWeight: 700, mb: 4, color: 'primary.main', fontFamily: 'Inter, Arial, sans-serif' }}>
          Reseñas de clientes
        </Typography>
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }} gap={{ xs: 2, md: 4 }}>
          {/* Review 1 */}
          <Box component="div" sx={{ bgcolor: 'grey.50', borderRadius: 3, boxShadow: 1, p: { xs: 3, md: 4 }, minWidth: 180, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', marginBottom: 16 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700, fontFamily: 'Inter, Arial, sans-serif' }}>Ana López</Typography>
            <Box sx={{ color: '#FFD600', mb: 1, fontSize: 22 }}>★★★★★</Box>
            <Typography color="text.secondary" sx={{ fontStyle: 'italic', fontSize: { xs: '1rem', md: '1.05rem' } }}>
              “Excelente plataforma, encontré veterinario para mi perro en minutos. Súper recomendable.”
            </Typography>
          </Box>
          {/* Review 2 */}
          <Box component="div" sx={{ bgcolor: 'grey.50', borderRadius: 3, boxShadow: 1, p: { xs: 3, md: 4 }, minWidth: 180, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', marginBottom: 16 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700, fontFamily: 'Inter, Arial, sans-serif' }}>Carlos Méndez</Typography>
            <Box sx={{ color: '#FFD600', mb: 1, fontSize: 22 }}>★★★★★</Box>
            <Typography color="text.secondary" sx={{ fontStyle: 'italic', fontSize: { xs: '1rem', md: '1.05rem' } }}>
              “El proceso de agendar fue muy fácil y el veterinario fue muy profesional.”
            </Typography>
          </Box>
          {/* Review 3 */}
          <Box component="div" sx={{ bgcolor: 'grey.50', borderRadius: 3, boxShadow: 1, p: { xs: 3, md: 4 }, minWidth: 180, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', marginBottom: 16 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700, fontFamily: 'Inter, Arial, sans-serif' }}>María Torres</Typography>
            <Box sx={{ color: '#FFD600', mb: 1, fontSize: 22 }}>★★★★★</Box>
            <Typography color="text.secondary" sx={{ fontStyle: 'italic', fontSize: { xs: '1rem', md: '1.05rem' } }}>
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

