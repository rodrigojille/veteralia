import React from 'react';
import { Box, Typography, Grid, Paper, Avatar, Rating } from '@mui/material';

const opinions = [
  {
    name: 'Ana López',
    comment: '¡Excelente plataforma! Encontré a un veterinario increíble para mi perro en minutos.',
    rating: 5,
    avatar: '/user1.jpg'
  },
  {
    name: 'Carlos Méndez',
    comment: 'Muy fácil de usar y con muchas opciones de veterinarios cercanos.',
    rating: 4,
    avatar: '/user2.jpg'
  },
  {
    name: 'Lucía Torres',
    comment: 'Me encantó poder calificar y leer opiniones de otros usuarios.',
    rating: 5,
    avatar: '/user3.jpg'
  }
];

export default function UserOpinions() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h4" component="h2" align="center" fontWeight={700} gutterBottom>
        Opiniones de usuarios
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
        {opinions.map((op, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
              <Avatar src={op.avatar} alt={op.name} sx={{ width: 64, height: 64, mx: 'auto', mb: 2 }} />
              <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                "{op.comment}"
              </Typography>
              <Rating value={op.rating} readOnly sx={{ mt: 1 }} />
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                {op.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
