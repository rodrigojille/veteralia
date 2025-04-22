import Head from 'next/head';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

import Link from 'next/link';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    // Aquí podrías integrar el envío real por email o API
  };

  return (
    <>
      <Head>
        <title>Contacto | Vetoralia</title>
      </Head>
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Box textAlign="center" mb={4}>
          <Link href="/" passHref>
            <img src="/logo.png" alt="Vetoralia Logo" style={{ width: 80, marginBottom: 12, cursor: 'pointer' }} />
          </Link>
        </Box>
        <Typography variant="h3" component="h1" fontWeight={700} mb={4} color="primary">
          Contacto
        </Typography>
        <Typography variant="body1" mb={2}>
          ¿Tienes dudas, sugerencias o necesitas ayuda? Completa el siguiente formulario y nuestro equipo de Vetoralia te responderá lo antes posible.
        </Typography>
        <Box sx={{ bgcolor: '#f8fafc', p: 4, borderRadius: 3, boxShadow: 1 }}>
          {enviado ? (
            <Typography color="success.main" fontWeight={600}>
              ¡Gracias por contactarnos! Te responderemos pronto.
            </Typography>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={4}
                sx={{ mb: 3 }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Enviar
              </Button>
            </form>
          )}
        </Box>
      </Container>
    </>
  );
}
