import React from 'react';
import { Box, Typography, Grid, Paper, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const steps = [
  { icon: <SearchIcon color="primary" sx={{ fontSize: 40 }} />, title: 'Busca', desc: 'Encuentra veterinarios certificados cerca de ti.' },
  { icon: <EventAvailableIcon color="secondary" sx={{ fontSize: 40 }} />, title: 'Agenda', desc: 'Reserva tu cita en línea de forma rápida y sencilla.' },
  { icon: <ThumbUpAltIcon sx={{ color: '#00BFA6', fontSize: 40 }} />, title: 'Cuida', desc: 'Lleva el control de la salud y bienestar de tus mascotas.' },
];

export default function HowItWorksSection() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#f8fafc' }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={700} mb={4} color="#1d3557" align="center">
          ¿Cómo funciona Veteralia?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {steps.map((step, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center', boxShadow: 1 }}>
                <Box mb={2}>{step.icon}</Box>
                <Typography variant="h6" fontWeight={700} mb={1}>{step.title}</Typography>
                <Typography color="text.secondary">{step.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
