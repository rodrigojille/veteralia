import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import { Box, Button, Container, Paper, Typography, TextField, Alert } from "@mui/material";
import { apiFetch } from '../utils/api';
// Botón para reenviar correo de verificación
function ResendVerificationEmail({ email }: { email: string }) {
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleResend = async () => {
    setSuccess(""); setError(""); setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/resend-verification-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setSuccess(data.message || "Si el correo no está verificado, se ha reenviado el correo de verificación.");
    } catch {
      setError("Ocurrió un error. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 8 }}>
      <button type="button" onClick={handleResend} disabled={loading || !!success} style={{ background: '#00BFA6', color: 'white', border: 'none', borderRadius: 4, padding: '6px 14px', fontWeight: 600, marginRight: 8 }}>
        {loading ? "Enviando..." : "Reenviar correo de verificación"}
      </button>
      {success && <span style={{ color: '#00BFA6', marginLeft: 8 }}>{success}</span>}
      {error && <span style={{ color: 'red', marginLeft: 8 }}>{error}</span>}
    </div>
  );
}

// Componente inline para recuperación de contraseña
function ForgotPasswordInline({ loginEmail }: { loginEmail: string }) {
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = React.useState(loginEmail || "");
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [log, setLog] = React.useState("");

  // Update email if loginEmail changes (e.g., after failed login)
  React.useEffect(() => {
    if (loginEmail && !show) setEmail(loginEmail);
  }, [loginEmail, show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLog(`Intentando enviar reset para: ${email}`);
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/request-password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setSuccess(data.message || "Si el correo existe, se ha enviado un enlace para restablecer la contraseña.");
    } catch (err) {
      setError("Ocurrió un error. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!show) {
    return (
      <Button type="button" onClick={() => setShow(true)} sx={{ textTransform: 'none', color: "#00BFA6" }}>
        ¿Olvidaste tu contraseña?
      </Button>
    );
  }
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      <Paper elevation={1} sx={{ p: 2, borderRadius: 2, minWidth: 320, maxWidth: 400 }}>
        <Typography align="center" fontWeight={600} mb={1}>
          ¿Olvidaste tu contraseña?
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading || !!success}
            fullWidth
            size="small"
          />
          <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth disabled={loading || !!success} sx={{ fontWeight: 600 }}>
            {loading ? "Enviando..." : "Restablecer"}
          </Button>
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          {log && <Alert severity="info">{log}</Alert>}
        </Box>
      </Paper>
    </Box>
  );
}

// Minimal JWT payload decoder (no dependency)
function decodeJwtPayload(token: string) {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
}



export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      console.log("Login response:", res); // Debug log
      const token = res.access_token;
      localStorage.setItem("user_token", token);
      const decoded: any = decodeJwtPayload(token);
      if (decoded.role === "veterinarian") {
        router.push("/vet-dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      let msg = "Error de inicio de sesión.";
      if (err && err.message) {
        // Try to extract backend message
        const match = err.message.match(/\{.*\}/);
        if (match) {
          try {
            const parsed = JSON.parse(match[0]);
            msg = parsed.message || msg;
          } catch {
            msg = err.message;
          }
        } else {
          msg = err.message;
        }
      }
      // Traducir mensajes comunes al español
      if (msg.toLowerCase().includes('invalid credentials')) {
        msg = 'Correo o contraseña incorrectos.';
      }
      setError(msg);
      console.error("Login error:", err);
    }
  };


  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 3 }}>
        <Box textAlign="center" mb={2}>
          <Link href="/" passHref>
  <img src="/logo.png" alt="Vetoralia Logo" style={{ width: 80, marginBottom: 12, cursor: 'pointer' }} />
</Link>
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
          {error && <>
        <Alert severity="error" sx={{ mb: error.includes('verifica tu correo electrónico') ? 1 : 2 }}>
          {error}
        </Alert>
        {error.includes('verifica tu correo electrónico') && (
          <Box display="flex" flexDirection="column" alignItems="center" width="100%" mb={2}>
            <ResendVerificationEmail email={email} />
          </Box>
        )}
      </>}

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ borderRadius: 2, py: 1.5, fontWeight: 600, fontSize: 18 }}>
            Iniciar sesión
          </Button>
          <Box mt={2} textAlign="right">
            <ForgotPasswordInline loginEmail={email} />
          </Box>
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
