import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, Typography, Paper, Tabs, Tab, AppBar, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, CircularProgress, Alert, Autocomplete, Popper, Select, MenuItem } from "@mui/material";
import { fuzzyMatch } from "../utils/_fuzzyMatch";
import ProfileForm from "../components/ProfileForm";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('user_token');
  }
  return null;
}

// --- PetList Component ---
function PetList({ token }: { token: string }) {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editPet, setEditPet] = useState<any | null>(null);
  const [form, setForm] = useState({ name: '', species: '', breed: '', birthdate: '', notes: '' });
  const [saving, setSaving] = useState(false);

  const fetchPets = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE}/pets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPets(res.data);
    } catch (err: any) {
      setError('Failed to fetch pets');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) fetchPets();
  }, [token]);

  const handleOpenAdd = () => {
    setForm({ name: '', species: '', breed: '', birthdate: '', notes: '' });
    setEditPet(null);
    setAddOpen(true);
  };
  const handleOpenEdit = (pet: any) => {
    setForm({ ...pet, birthdate: pet.birthdate ? pet.birthdate.slice(0, 10) : '' });
    setEditPet(pet);
    setAddOpen(true);
  };
  const handleClose = () => {
    setAddOpen(false);
    setEditPet(null);
  };

  const handleChange = (e: any) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editPet) {
        await axios.patch(`${API_BASE}/pets/${editPet.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_BASE}/pets`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      await fetchPets();
      handleClose();
    } catch (err: any) {
      setError('Failed to save pet');
    }
    setSaving(false);
  };

  const handleDelete = async (pet: any) => {
    if (!window.confirm(`Delete pet ${pet.name}?`)) return;
    try {
      await axios.delete(`${API_BASE}/pets/${pet.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchPets();
    } catch (err: any) {
      setError('Failed to delete pet');
    }
  };

  return (
    <Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box sx={{ mt: 2, mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpenAdd}>Add Pet</Button>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {pets.map(pet => (
            <Grid item xs={12} md={6} lg={4} key={pet.id}>
              <Paper sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography fontWeight={600}>{pet.name} ({pet.species})</Typography>
                  <Typography variant="body2">Breed: {pet.breed || '-'}</Typography>
                  <Typography variant="body2">Birthdate: {pet.birthdate ? pet.birthdate.slice(0,10) : '-'}</Typography>
                  <Typography variant="body2">Notes: {pet.notes || '-'}</Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => handleOpenEdit(pet)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(pet)}><DeleteIcon /></IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog open={addOpen} onClose={handleClose}>
        <DialogTitle>{editPet ? 'Edit Pet' : 'Add Pet'}</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
          <TextField margin="dense" label="Species" name="species" value={form.species} onChange={handleChange} fullWidth required />
          <TextField margin="dense" label="Breed" name="breed" value={form.breed} onChange={handleChange} fullWidth />
          <TextField margin="dense" label="Birthdate" name="birthdate" value={form.birthdate} onChange={handleChange} fullWidth type="date" InputLabelProps={{ shrink: true }} />
          <TextField margin="dense" label="Notes" name="notes" value={form.notes} onChange={handleChange} fullWidth multiline rows={2} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving}>{saving ? <CircularProgress size={20} /> : 'Save'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// --- AppointmentList Component ---
function AppointmentList({ token }: { token: string }) {
  const [appts, setAppts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchAppts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppts(res.data);
    } catch (err: any) {
      setError('Failed to fetch appointments');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) fetchAppts();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Cancel this appointment?')) return;
    setDeletingId(id);
    try {
      await axios.delete(`${API_BASE}/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchAppts();
    } catch (err: any) {
      setError('Failed to cancel appointment');
    }
    setDeletingId(null);
  };

  return (
    <Box sx={{ mt: 2 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading ? <CircularProgress /> : (
        appts.length === 0 ? <Typography>No appointments found.</Typography> :
        <Grid container spacing={2}>
          {appts.map(appt => (
            <Grid item xs={12} md={6} lg={4} key={appt.id}>
              <Paper sx={{ p: 2, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography fontWeight={600}>{appt.pet?.name || 'Pet'} with {appt.veterinarian?.name || 'Vet'}</Typography>
                <Typography variant="body2">Date: {appt.datetime ? new Date(appt.datetime).toLocaleString() : '-'}</Typography>
                <Typography variant="body2">Status: {appt.status}</Typography>
                <Typography variant="body2">Reason: {appt.reason || '-'}</Typography>
                <Typography variant="body2">Notes: {appt.notes || '-'}</Typography>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(appt.id)} disabled={deletingId === appt.id}>
                    {deletingId === appt.id ? <CircularProgress size={18} /> : 'Cancel'}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

// --- BookAppointment Component ---
function BookAppointment({ token }: { token: string }) {
  const [pets, setPets] = useState<any[]>([]);
  const [vets, setVets] = useState<any[]>([]);
  const [vetSearch, setVetSearch] = useState('');
  const [vetLang, setVetLang] = useState('');
  const [form, setForm] = useState({ petId: '', vetId: '', datetime: '', reason: '', notes: '' });
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
          axios.get(`${API_BASE}/users?role=veterinarian`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setPets(petsRes.data);
        setVets(vetsRes.data);
      } catch (err: any) {
        setError('Failed to fetch pets or veterinarians');
      }
      setLoading(false);
    };
    if (token) fetchData();
  }, [token]);

  const handleChange = (e: any) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    // Prevent booking in the past
    if (form.datetime && new Date(form.datetime) < new Date()) {
      setError('Cannot book an appointment in the past.');
      setSubmitting(false);
      return;
    }
    try {
      await axios.post(`${API_BASE}/appointments`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Appointment booked successfully!');
      setForm({ petId: '', vetId: '', datetime: '', reason: '', notes: '' });
    } catch (err: any) {
      // Show backend error if present
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Search Veterinarian"
                value={vetSearch}
                onChange={e => setVetSearch(e.target.value)}
                fullWidth
                placeholder="Type name, email, or specialty..."
                sx={{ mb: 1 }}
              />
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date & Time"
                name="datetime"
                type="datetime-local"
{{ ... }}
                onChange={handleChange}
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

export default function UserDashboard() {
  const [tab, setTab] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const t = getToken();
    console.log('[Dashboard] Token on mount:', t);
    setToken(t);
  }, []);

  useEffect(() => {
    console.log('[Dashboard] Checking token for redirect:', token);
    if (token === null) return; // Wait until token is loaded
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  if (!token) {
    return null; // Or a loading spinner
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Typography variant="h4" fontWeight={700} mb={2} color="#1d3557" sx={{ fontSize: { xs: '1.6rem', sm: '2.2rem' } }}>
        My Dashboard
      </Typography>
      <AppBar position="static" color="default" sx={{ borderRadius: 2, boxShadow: 1, mb: 3 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab label="Pets" />
          <Tab label="Upcoming Appointments" />
          <Tab label="Book Appointment" />
          <Tab label="Profile" />
        </Tabs>
      </AppBar>
      {tab === 0 && (
        <Paper sx={{ p: { xs: 1.5, sm: 3 }, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>My Pets</Typography>
          <PetList token={token} />
        </Paper>
      )}

      {tab === 1 && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6">Upcoming Appointments</Typography>
          <AppointmentList token={token} />
        </Paper>
      )}
      {tab === 2 && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6">Book Appointment</Typography>
          <BookAppointment token={token} />
        </Paper>
      )}
      {tab === 3 && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6">Profile</Typography>
          <ProfileForm token={token} />
          <Box textAlign="right" mt={2}>
            <Button variant="outlined" color="secondary" onClick={() => {
              localStorage.removeItem("user_token");
              router.replace("/login");
            }}>Log out</Button>
          </Box>
        </Paper>
      )}
    </Container>
  );
}
