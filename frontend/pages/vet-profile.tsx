import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Paper, CircularProgress, Alert, Button, Chip } from '@mui/material';
import { apiFetch } from '../utils/api';

export default function VetProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    apiFetch(`/vet-profile/public/${id}`)
      .then(setProfile)
      .catch(() => setError('No se encontró el perfil del veterinario.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ mt: 6 }}>{error}</Alert>;
  if (!profile) return null;

  return (
    <Box maxWidth={600} mx="auto" mt={6}>
      <Box display="flex" justifyContent="center" mb={2}>
        <a href="/">
          <img src="/logo.png" alt="Veteralia" style={{ height: 48, cursor: 'pointer' }} />
        </a>
      </Box>
      <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 3 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          {profile.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {Array.isArray(profile.specialty) ? profile.specialty.join(', ') : profile.specialty}
        </Typography>
        <Typography variant="body1" mb={2}>
          {profile.bio || 'Sin biografía.'}
        </Typography>
        {profile.location && (
          <Typography variant="body2" color="text.secondary" mb={2}>
            Ubicación: {profile.location}
          </Typography>
        )}
        {profile.languages && (
          <Box mb={2}>
            Idiomas: {profile.languages.map((lang: string) => (
              <Chip key={lang} label={lang} size="small" sx={{ mr: 1 }} />
            ))}
          </Box>
        )}
        <Button variant="contained" color="primary" onClick={() => router.push('/login')}>
          Agendar cita
        </Button>
      </Paper>
    </Box>
  );
}
