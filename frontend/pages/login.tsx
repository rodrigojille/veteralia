import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Container, Paper, Typography, TextField } from "@mui/material";
import axios from "axios";
// Minimal JWT payload decoder (no dependency)
function decodeJwtPayload(token: string) {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      console.log("Login response:", res.data); // Debug log
      const token = res.data.access_token;
      localStorage.setItem("user_token", token);
      const decoded: any = decodeJwtPayload(token);
      if (decoded.role === "veterinarian") {
        router.push("/vet-dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError("Invalid login. Please check your credentials.");
      console.error("Login error:", err); // Debug log
    }
  };


  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 3 }}>
        <Box textAlign="center" mb={2}>
          <img src="/logo.png" alt="Veteralia Logo" style={{ width: 80, marginBottom: 12 }} />
          <Typography variant="h4" component="h1" color="primary" gutterBottom>
            Iniciar sesión
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Ingresa tus datos para acceder a tu cuenta.
          </Typography>
        </Box>
        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <TextField
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Contraseña"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
              inputProps={{ minLength: 6 }}
            />
          </Box>
          {error && <Typography color="error" mb={2}>{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ borderRadius: 2, py: 1.5, fontWeight: 600, fontSize: 18 }}>
            Iniciar sesión
          </Button>
        </form>
        <Box textAlign="center" mt={3}>
          <Typography variant="body2">
            ¿No tienes cuenta? <a href="/signup" style={{ color: "#00BFA6", textDecoration: "underline" }}>Regístrate</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
