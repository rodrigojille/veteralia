import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, CircularProgress, Alert } from "@mui/material";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function ProfileForm({ token }: { token: string }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [success, setSuccess] = useState<string|null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API_BASE}/users/me`, { headers: { Authorization: `Bearer ${token}` } });
        setForm({
          name: res.data.name || '',
          email: res.data.email || '',
          phone: res.data.phone || '',
        });
      } catch (err: any) {
        setError('Failed to load profile');
      }
      setLoading(false);
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.patch(`${API_BASE}/users/me`, form, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to update profile');
    }
    setSaving(false);
  };

  if (loading) return <CircularProgress />;

  return (
    <Box component="form" onSubmit={handleSave} sx={{ mt: 2, maxWidth: 500 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required type="email" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" disabled={saving}>
            {saving ? <CircularProgress size={20} /> : 'Save Changes'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
