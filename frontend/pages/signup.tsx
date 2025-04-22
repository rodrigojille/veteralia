import React, { useState } from "react";
import Link from 'next/link';
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Alert,
  Chip,
  OutlinedInput,
  Stack,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { apiFetch } from '../utils/api';
import { VET_SPECIALTIES_EN } from "../components/VetSpecialties_en";
import { VET_SPECIALTIES_ES } from "../components/VetSpecialties_es";
import LocationPicker from "../components/LocationPicker";
import SpecialtySelector from "../components/SpecialtySelector";



export default function Signup() {
  const [role, setRole] = useState("pet_owner");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    language: "es",
    specialty: [], // multi-select
    location: null as { lat: number; lng: number } | null,
    pricingTier: "basic", // always basic on registration
  });
  const [address, setAddress] = useState<string>("");
  const [addressLoading, setAddressLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    // Multi-select for specialty
    if (name === "specialty") {
      setForm((f) => ({ ...f, specialty: Array.isArray(value) ? value : (typeof value === "string" ? value.split(',') : []) }));
    } else {
      setForm((f) => ({ ...f, [name as string]: value }));
    }
  };

  // Handler for language select
  const handleLanguageChange = (e: SelectChangeEvent<string>) => {
    setForm((f) => ({ ...f, language: e.target.value as string }));
  };

  // Update specialty options based on language
  const specialtyOptions = form.language === "es" ? VET_SPECIALTIES_ES : VET_SPECIALTIES_EN;

  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    setRole(e.target.value as string);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        ...form,
        role,
        pricingTier: "basic", // always
        location: form.location ? JSON.stringify(form.location) : undefined,
        specialty: Array.isArray(form.specialty) ? form.specialty : [form.specialty],
      };
      // Only send vet fields if role is veterinarian
      if (role !== "veterinarian") {
        delete payload.specialty;
        delete payload.location;
        delete payload.pricingTier;
      }
      await apiFetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
      setTimeout(() => router.push("/login"), 1200);
    } catch (err: any) {
      setError(
        err?.response?.data?.message?.join?.(". ") ||
          err?.response?.data?.message ||
          "Error en el registro. Por favor revisa tus datos."
      );
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Registro | Vetoralia</title>
      </Head>
      <Container maxWidth="sm" sx={{ mt: 8, mb: 6 }}>
        <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 3 }}>
          <Box textAlign="center" mb={2}>
            <Link href="/" passHref>
  <img src="/logo.png" alt="Vetoralia Logo" style={{ width: 80, marginBottom: 12, cursor: 'pointer' }} />
</Link>
            <Typography variant="h4" component="h1" color="primary" gutterBottom>
              Crea tu cuenta
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {role === "veterinarian"
                ? "Regístrate como veterinario para gestionar tu perfil y agenda."
                : "Regístrate para agendar citas para tus mascotas."}
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="role-label">Tipo de cuenta</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                label="Tipo de cuenta"
                onChange={handleRoleChange}
                name="role"
              >
                <MenuItem value="pet_owner">Dueño de mascota</MenuItem>
                <MenuItem value="veterinarian">Veterinario</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Nombre"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Correo electrónico"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              type="email"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Contraseña"
              name="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
              type="password"
              sx={{ mb: 2 }}
              inputProps={{ minLength: 6 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="lang-label">Idioma</InputLabel>
              <Select
                labelId="lang-label"
                value={form.language}
                label="Idioma"
                onChange={handleLanguageChange}
                name="language"
              >
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="en">English</MenuItem>
              </Select>
            </FormControl>
            {role === "veterinarian" && (
              <>
                <SpecialtySelector
                  value={form.specialty}
                  options={specialtyOptions}
                  language={form.language}
                  onConfirm={(selected) => setForm((f) => ({ ...f, specialty: selected }))}
                />
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>Ubicación</Typography>
                  <LocationPicker
                    value={form.location}
                    onChange={loc => setForm(f => ({ ...f, location: loc }))}
                    address={address}
                    setAddress={setAddress}
                    loading={addressLoading}
                    setLoading={setAddressLoading}
                  />
                    }
                    setAddressLoading(false);
                  }}
                />
                <Box mt={1} mb={2}>
                  {addressLoading && <CircularProgress size={18} sx={{ mr: 1 }} />}
                  {address && (
                    <Alert severity="info" sx={{ mt: 1 }}>
                      {form.language === "es" ? "Dirección seleccionada:" : "Selected address:"} <br />
                      <strong>{address}</strong>
                    </Alert>
                  )}
                  {!address && form.location && !addressLoading && (
                    <Alert severity="warning" sx={{ mt: 1 }}>
                      {form.language === "es" ? "No se pudo obtener la dirección para la ubicación seleccionada." : "Could not fetch address for selected location."}
                    </Alert>
                  )}
                </Box>
                <input type="hidden" name="pricingTier" value="basic" />
              </>
            )}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5, fontWeight: 600, fontSize: 18 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Registrarse"}
            </Button>
          </Box>
          <Box textAlign="center" mt={3}>
            <Typography variant="body2">
              ¿Ya tienes cuenta? <a href="/login" style={{ color: "#00BFA6", textDecoration: "underline" }}>Inicia sesión</a>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
