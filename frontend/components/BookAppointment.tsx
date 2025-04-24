import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, MenuItem, Button, CircularProgress, Alert, Typography, Select } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { fuzzyMatch } from '../utils/_fuzzyMatch';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface BookAppointmentProps {
  token: string;
  vetId?: string;
  hideVetSelect?: boolean;
  onBooked?: () => void;
}

export default function BookAppointment({ token, vetId, hideVetSelect = false, onBooked }: BookAppointmentProps) {
  const [pets, setPets] = useState<any[]>([]);
  const [vets, setVets] = useState<any[]>([]);
  const [vetSearch, setVetSearch] = useState('');
  const [vetLang, setVetLang] = useState('');
  const [form, setForm] = useState({ petId: '', vetId: vetId || '', datetime: '', reason: '', notes: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Unique vet languages for filter
  const vetLanguages = Array.from(new Set(vets.map((v: any) => v.language))).filter(Boolean);

  // Filtered vets based on search and language
  const filteredVets = vets.filter((vet: any) => {
    const q = vetSearch.toLowerCase();
    const matchesSearch =
      vet.name.toLowerCase().includes(q) ||
      vet.email.toLowerCase().includes(q) ||
      (vet.specialty || '').toLowerCase().includes(q);
    const matchesLang = vetLang ? vet.language === vetLang : true;
    return matchesSearch && matchesLang;
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [petsRes, vetsRes] = await Promise.all([
          axios.get(`${API_BASE}/pets`, { headers: { Authorization: `Bearer ${token}` } }),
          hideVetSelect && vetId
            ? Promise.resolve({ data: [] })
            : axios.get(`${API_BASE}/users?role=veterinarian`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setPets(petsRes.data);
        setVets(hideVetSelect && vetId ? [] : vetsRes.data);
      } catch (err: any) {
        setError('Failed to fetch pets or veterinarians');
      }
      setLoading(false);
    };
    if (token) fetchData();
  }, [token, hideVetSelect, vetId]);

  const handleChange = (e: any) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    if (form.datetime && new Date(form.datetime) < new Date()) {
      setError('Cannot book an appointment in the past.');
      setSubmitting(false);
      return;
    }
    try {
      await axios.post(`${API_BASE}/appointments`, { ...form, vetId: vetId || form.vetId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Appointment booked successfully!');
      setForm({ petId: '', vetId: vetId || '', datetime: '', reason: '', notes: '' });
      if (onBooked) onBooked();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to book appointment');
    }
    setSubmitting(false);
  };

  return (
    <Box sx={{ mt: 2 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {loading ? <CircularProgress /> : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Pet"
                name="petId"
                value={form.petId}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="">Select Pet</MenuItem>
                {pets.map((pet: any) => (
                  <MenuItem key={pet.id} value={pet.id}>{pet.name} ({pet.species})</MenuItem>
                ))}
              </TextField>
            </Grid>
            {!hideVetSelect && (
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" sx={{ ml: 1 }}>Language</Typography>
                  <Select
                    value={vetLang}
                    onChange={e => setVetLang(e.target.value)}
                    displayEmpty
                    fullWidth
                    size="small"
                  >
                    <MenuItem value="">All Languages</MenuItem>
                    {vetLanguages.map(lang => (
                      <MenuItem key={lang} value={lang}>{lang.toUpperCase()}</MenuItem>
                    ))}
                  </Select>
                </Box>
                <Autocomplete
                  options={vets.filter((vet: any) => vetLang ? vet.language === vetLang : true)}
                  getOptionLabel={(vet: any) => vet.name + (vet.specialty ? ` (${vet.specialty})` : '')}
                  value={vets.find(v => v.id === form.vetId) || null}
                  onChange={(_, newValue) => setForm(f => ({ ...f, vetId: newValue ? newValue.id : '' }))}
                  filterOptions={(options, { inputValue }) => {
                    const q = inputValue.toLowerCase();
                    return options.filter((vet: any) =>
                      fuzzyMatch(vet.name, q) ||
                      fuzzyMatch(vet.email, q) ||
                      fuzzyMatch(vet.specialty || '', q)
                    );
                  }}
                  inputValue={vetSearch}
                  onInputChange={(_, value, reason) => {
                    setVetSearch(value);
                    if (reason === 'clear') setForm(f => ({ ...f, vetId: '' }));
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Veterinarian" required fullWidth />
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date & Time"
                name="datetime"
                type="datetime-local"
                onChange={handleChange}
                value={form.datetime}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: new Date().toISOString().slice(0,16) }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Reason"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={submitting}>
                {submitting ? <CircularProgress size={20} /> : 'Book Appointment'}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
}
