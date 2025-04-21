import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
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
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 2 }}>
        <Typography variant="h5" mb={2} color="#1d3557">User Login</Typography>
        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
            />
          </Box>
          <Box mb={2}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
            />
          </Box>
          {error && <Typography color="error" mb={2}>{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ borderRadius: 2 }}>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
