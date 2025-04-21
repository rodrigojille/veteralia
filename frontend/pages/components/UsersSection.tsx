import React from 'react';
import { Box, Typography, Grid, Paper, Avatar, Container } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const users = [
  { icon: <PetsIcon fontSize="large" color="primary" />, title: 'Dueños de Mascotas', desc: 'Encuentra veterinarios, agenda citas y lleva el control de la salud de tus mascotas.' },
  { icon: <LocalHospitalIcon fontSize="large" color="secondary" />, title: 'Veterinarios', desc: 'Gestiona tu agenda, recibe nuevos clientes y haz crecer tu práctica.' },
];

export default function UsersSection() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={700} mb={4} color="#1d3557" align="center">
          ¿Para quién es Veteralia?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {users.map((u, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center', boxShadow: 2 }}>
                <Avatar sx={{ bgcolor: '#f1faee', mx: 'auto', mb: 2, width: 64, height: 64 }}>
                  {u.icon}
                </Avatar>
                <Typography variant="h6" fontWeight={700} mb={1}>{u.title}</Typography>
                <Typography color="text.secondary">{u.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
