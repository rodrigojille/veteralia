import React from 'react';
import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarIcon from '@mui/icons-material/Star';

const steps = [
  {
    icon: <PetsIcon fontSize="large" color="primary" />,
    title: 'Regístrate gratis',
    description: 'Crea tu cuenta como dueño de mascota o veterinario en minutos.'
  },
  {
    icon: <EventAvailableIcon fontSize="large" color="primary" />,
    title: 'Agenda tu cita',
    description: 'Elige al veterinario ideal y agenda una cita fácilmente desde cualquier dispositivo.'
  },
  {
    icon: <StarIcon fontSize="large" color="primary" />,
    title: 'Califica y comparte',
    description: 'Comparte tu experiencia y ayuda a otros dueños de mascotas.'
  }
];

export default function HowItWorks() {
  const theme = useTheme();
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: theme.palette.grey[100] }}>
      <Typography variant="h4" component="h2" align="center" fontWeight={700} gutterBottom>
        ¿Cómo funciona?
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
        {steps.map((step, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
              {step.icon}
              <Typography variant="h6" fontWeight={700} sx={{ mt: 2 }}>
                {step.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {step.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
