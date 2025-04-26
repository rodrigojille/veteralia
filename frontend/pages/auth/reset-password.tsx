import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Paper, Typography, TextField, Alert } from '@mui/material';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!password || password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message || '¡Contraseña restablecida con éxito!');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setError(data.message || 'Error al restablecer la contraseña.');
      }
    } catch {
      setError('Error de red. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h5" align="center" fontWeight={700} gutterBottom>
          Restablecer contraseña
        </Typography>
        <Typography align="center" color="text.secondary" mb={2}>
          Ingresa tu nueva contraseña.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nueva contraseña"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fullWidth
            inputProps={{ minLength: 6 }}
          />
          <TextField
            label="Confirmar contraseña"
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            fullWidth
            inputProps={{ minLength: 6 }}
          />
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ py: 1.5, fontWeight: 600, fontSize: 18 }}>
            {loading ? 'Restableciendo...' : 'Restablecer contraseña'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
