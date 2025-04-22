import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Container, Typography, Box, Paper, CircularProgress, Alert, Button, List, ListItem, ListItemText, AppBar, Tabs, Tab } from "@mui/material";
import { useRouter } from "next/router";
import { fetchVetProfile } from "./api/fetchVetProfile";
import { fetchVetAppointments } from "./api/fetchVetAppointments";
import { fetchVetUserProfile } from "./api/fetchVetUserProfile";

function decodeJwtPayload(token: string) {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
}

export default function VetDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [vetProfileError, setVetProfileError] = useState<string | null>(null);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      router.replace("/login");
      return;
    }
    let decoded: any = null;
    try {
      decoded = decodeJwtPayload(token);
    } catch {
      setError("Token inválido. Por favor, inicia sesión de nuevo.");
      localStorage.removeItem("user_token");
      router.replace("/login");
      return;
    }
    if (decoded.role !== "veterinarian") {
      router.replace("/dashboard");
      return;
    }
    // Fetch vet profile, user profile, and appointments
    Promise.all([
      fetchVetProfile(token).catch((err) => {
        if (err?.response?.status === 403) {
          setVetProfileError("You do not have a veterinarian profile. Please contact support if this is an error.");
          return null;
        }
        setVetProfileError("Error loading veterinarian profile.");
        return null;
      }),
      fetchVetUserProfile(token),
      fetchVetAppointments(token),
    ])
      .then(([profileData, userProfileData, appointmentsData]) => {
        setProfile(profileData);
        setUserProfile(userProfileData);
        setAppointments(Array.isArray(appointmentsData) ? appointmentsData : []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar datos del veterinario.");
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>Vet Dashboard | Veteralia</title>
      </Head>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" fontWeight={700} mb={2} color="#1d3557" sx={{ fontSize: { xs: '1.6rem', sm: '2.2rem' } }}>
          Veterinarian Dashboard
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
            <Tab label="Profile" />
            <Tab label="Appointments" />
            <Tab label="Edit Profile" />
            <Tab label="Approve Appointments" />
            <Tab label="Buy Membership" />
          </Tabs>
        </AppBar>
        {tab === 0 && (
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Box textAlign="center" mb={2}>
              <img src="/logo.png" alt="Veteralia Logo" style={{ width: 80, marginBottom: 12 }} />
            </Box>
            <Typography variant="h6">Profile</Typography>
            {userProfile && (
              <>
                <Typography><b>Name:</b> {userProfile?.name}</Typography>
                <Typography><b>Email:</b> {userProfile?.email}</Typography>
                <Typography><b>Phone:</b> {userProfile?.phone || '-'}</Typography>
                <Typography><b>Role:</b> {userProfile?.role || '-'}</Typography>
              </>
            )}
            {profile && (
              <>
                <Typography><b>Specialty:</b> {profile?.specialty || '-'}</Typography>
                <Typography><b>Location:</b> {profile?.location || '-'}</Typography>
                <Typography><b>Plan:</b> {profile?.pricingTier || '-'}</Typography>
                <Typography><b>Approved:</b> {profile?.approved ? 'Yes' : 'No'}</Typography>
              </>
            )}
            {vetProfileError && (
              <Alert severity="warning" sx={{ mt: 2 }}>{vetProfileError}</Alert>
            )}
            <Box textAlign="right" mt={2}>
              <Button variant="outlined" color="secondary" onClick={() => {
                localStorage.removeItem("user_token");
                router.replace("/login");
              }}>Log out</Button>
            </Box>
          </Paper>
        )}
        {tab === 1 && (
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6">Upcoming Appointments</Typography>
            {appointments.length === 0 ? (
              <Typography color="text.secondary">No upcoming appointments.</Typography>
            ) : (
              <List>
                {appointments.map((appt: any) => (
                  <ListItem key={appt.id} divider>
                    <ListItemText
                      primary={`Patient: ${appt.pet?.name || '-'} (${appt.pet?.species || ''})`}
                      secondary={`Date: ${appt.datetime ? new Date(appt.datetime).toLocaleString() : '-'} | Owner: ${appt.petOwner?.name || '-'}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        )}
        {tab === 2 && (
          <Paper sx={{ p: { xs: 1.5, sm: 3 }, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>Edit Profile</Typography>
            {/* Simple Edit Profile Form */}
            <EditProfileForm profile={profile} token={localStorage.getItem("user_token") || ""} onUpdate={p => setProfile(p)} />
          </Paper>
        )}
        {tab === 3 && (
          <Paper sx={{ p: { xs: 1.5, sm: 3 }, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>Approve Appointments</Typography>
            <Typography variant="h6" mb={2}>Approve Appointments</Typography>
            <ApproveAppointments token={localStorage.getItem("user_token") || ""} />
          </Paper>
        )}
        {tab === 4 && (
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" mb={2}>Buy Membership</Typography>
            <BuyMembership profile={profile} token={localStorage.getItem("user_token") || ""} onUpdate={p => setProfile(p)} />
          </Paper>
        )}
      </Container>
    </>
  );
}

// --- Edit Profile Form Component ---
function EditProfileForm({ profile, token, onUpdate }: { profile: any, token: string, onUpdate: (p: any) => void }) {
  const [form, setForm] = React.useState({
    specialty: profile?.specialty || '',
    location: profile?.location || '',
    pricingTier: profile?.pricingTier || 'basic',
  });
  const [saving, setSaving] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setForm({
      specialty: profile?.specialty || '',
      location: profile?.location || '',
      pricingTier: profile?.pricingTier || 'basic',
    });
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${API_BASE}/vet-profile/me`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      const updated = await res.json();
      onUpdate(updated);
      setSuccess(true);
    } catch (err: any) {
      setError('Could not update profile');
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <Typography fontWeight={600}>Specialty</Typography>
        <input name="specialty" value={form.specialty} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
      </Box>
      <Box mb={2}>
        <Typography fontWeight={600}>Location</Typography>
        <input name="location" value={form.location} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
      </Box>
      <Box mb={2}>
        <Typography fontWeight={600}>Plan</Typography>
        <select name="pricingTier" value={form.pricingTier} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }}>
          <option value="basic">Basic</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
      </Box>
      {success && <Typography color="success.main" mb={2}>Profile updated!</Typography>}
      {error && <Typography color="error" mb={2}>{error}</Typography>}
      <Button type="submit" variant="contained" color="primary" disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}

// --- Approve Appointments Component (UI only, replace with real API if available) ---
function ApproveAppointments({ token }: { token: string }) {
  const [appointments, setAppointments] = React.useState<any[]>([
    // Placeholder data
    { id: 1, pet: { name: 'Firulais' }, owner: { name: 'Juan' }, datetime: new Date().toISOString(), status: 'pending' },
    { id: 2, pet: { name: 'Michi' }, owner: { name: 'Ana' }, datetime: new Date().toISOString(), status: 'pending' },
  ]);
  const [actionMsg, setActionMsg] = React.useState<string | null>(null);

  const handleApprove = (id: number) => {
    setAppointments(appts => appts.map(a => a.id === id ? { ...a, status: 'approved' } : a));
    setActionMsg('Appointment approved!');
    setTimeout(() => setActionMsg(null), 1500);
  };
  const handleReject = (id: number) => {
    setAppointments(appts => appts.map(a => a.id === id ? { ...a, status: 'rejected' } : a));
    setActionMsg('Appointment rejected.');
    setTimeout(() => setActionMsg(null), 1500);
  };

  return (
    <Box>
      {actionMsg && <Typography color="success.main" mb={2}>{actionMsg}</Typography>}
      <List>
        {appointments.map(appt => (
          <ListItem key={appt.id} divider>
            <ListItemText
              primary={`Pet: ${appt.pet.name} | Owner: ${appt.owner.name}`}
              secondary={`Date: ${new Date(appt.datetime).toLocaleString()} | Status: ${appt.status}`}
            />
            {appt.status === 'pending' && (
              <Box>
                <Button color="success" variant="contained" sx={{ mr: 1 }} onClick={() => handleApprove(appt.id)}>Approve</Button>
                <Button color="error" variant="outlined" onClick={() => handleReject(appt.id)}>Reject</Button>
              </Box>
            )}
            {appt.status !== 'pending' && (
              <Typography color={appt.status === 'approved' ? 'success.main' : 'error.main'}>{appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}</Typography>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

// --- Buy Membership Component (UI only) ---
function BuyMembership({ profile, token, onUpdate }: { profile: any, token: string, onUpdate: (p: any) => void }) {
  const [selected, setSelected] = React.useState(profile?.pricingTier || 'basic');
  const [msg, setMsg] = React.useState<string | null>(null);

  const handleBuy = (tier: string) => {
    setSelected(tier);
    setMsg(`Membership "${tier}" purchased! (UI only)`);
    // Here you would call backend to update membership
    setTimeout(() => setMsg(null), 2000);
  };

  return (
    <Box>
      <Typography mb={2}>Choose your plan:</Typography>
      <Box display="flex" gap={2} mb={2}>
        {['basic', 'standard', 'premium'].map(tier => (
          <Paper key={tier} sx={{ p: 2, border: selected === tier ? '2px solid #00BFA6' : '1px solid #ccc', borderRadius: 2, minWidth: 120, textAlign: 'center' }}>
            <Typography fontWeight={600}>{tier.charAt(0).toUpperCase() + tier.slice(1)}</Typography>
            <Button variant={selected === tier ? 'contained' : 'outlined'} color="primary" sx={{ mt: 1 }} onClick={() => handleBuy(tier)}>
              {selected === tier ? 'Current' : 'Buy'}
            </Button>
          </Paper>
        ))}
      </Box>
      {msg && <Typography color="success.main">{msg}</Typography>}
    </Box>
  );
}

