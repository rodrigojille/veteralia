import React from "react";
import { Box, Container, Typography, Grid, Paper, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Tabs, Tab, AppBar, Alert } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

import { useState, useEffect } from "react";
import { getPendingProfiles, approveProfile, getAnalytics } from "../utils/adminApi";

const recentActions = [
  { action: "Approved", user: "Admin1", time: "2m ago", details: "Dr. Smith" },
  { action: "Rejected", user: "Admin2", time: "10m ago", details: "Dr. Lee" },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState(0);
  const [token, setToken] = useState("");
  const [pendingProfiles, setPendingProfiles] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([
      getPendingProfiles(token),
      getAnalytics(token),
    ])
      .then(([pendingData, analyticsData]) => {
        setPendingProfiles(pendingData || []);
        setAnalytics(analyticsData || null);
        setLoading(false);
      })
      .catch((e) => {
        setError("Failed to load dashboard data");
        setLoading(false);
      });
  }, [token]);

  const handleApprove = async (id: string) => {
    if (!token) return;
    await approveProfile(token, id);
    // Refresh pending profiles
    const data = await getPendingProfiles(token);
    setPendingProfiles(data || []);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      // @ts-ignore
      const { loginAdmin } = await import("../utils/adminApi");
      const t = await loginAdmin(loginEmail, loginPassword);
      setToken(t);
    } catch (err: any) {
      setLoginError("Invalid login. Please check your credentials.");
    }
  };

  if (!token) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 2 }}>
          <Typography variant="h5" mb={2} color="#1d3557">Admin Login</Typography>
          <form onSubmit={handleLogin}>
            <Box mb={2}>
              <input
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="Admin email"
                required
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
              />
            </Box>
            <Box mb={2}>
              <input
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="Password"
                required
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
              />
            </Box>
            {loginError && <Typography color="error" mb={2}>{loginError}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ borderRadius: 2 }}>
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight={700} color="#1d3557">
          Veteralia Admin Dashboard
        </Typography>
        <Button variant="outlined" color="secondary" onClick={() => {
          localStorage.removeItem('admin_token');
          setToken("");
        }} title="Cerrar sesión" sx={{ ml: 2 }}>
          Log out
        </Button>
      </Box>
      <AppBar position="static" color="default" sx={{ borderRadius: 2, boxShadow: 1, mb: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab label="Overview" />
          <Tab label="Pending Profiles" />
          <Tab label="Analytics" />
        </Tabs>
      </AppBar>
      {tab === 0 && (
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2} mb={3} justifyContent="center" alignItems="stretch">
            {[{
              label: 'Total Users', value: analytics?.totalUsers
            }, {
              label: 'Vets', value: analytics?.totalVets
            }, {
              label: 'Pet Owners', value: analytics?.totalPetOwners
            }, {
              label: 'Secretaries', value: analytics?.totalSecretaries
            }, {
              label: 'Admins', value: analytics?.totalAdmins
            }, {
              label: 'Total Pets', value: analytics?.totalPets
            }].map((item, i) => (
              <Grid item xs={12} sm={6} md={2} key={item.label} display="flex">
                <Paper sx={{
                  p: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  bgcolor: '#f1faee',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 100
                }}>
                  <Typography variant="subtitle1" fontWeight={500} gutterBottom align="center">{item.label}</Typography>
                  <Typography variant="h4" color="#457b9d" align="center">{item.value ?? '-'}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} justifyContent="center" alignItems="stretch">
            {[{
              label: 'Approved', value: analytics?.approved ?? '-' 
            }, {
              label: 'Approval Rate', value: analytics?.approvalRate !== undefined ? analytics.approvalRate + '%' : '-' 
            }].map((item, i) => (
              <Grid item xs={12} sm={6} md={3} key={item.label} display="flex">
                <Paper sx={{
                  p: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  bgcolor: '#f1faee',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 100
                }}>
                  <Typography variant="subtitle1" fontWeight={500} gutterBottom align="center">{item.label}</Typography>
                  <Typography variant="h4" color="#457b9d" align="center">{item.value}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {tab === 1 && (
        <Paper sx={{ p: 3, borderRadius: 3, mt: 2 }}>
          <Typography variant="h5" mb={2} color="#1d3557">Pending Vet Profiles</Typography>
          {loading && <Typography>Loading pending profiles...</Typography>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {!loading && pendingProfiles.length === 0 && !error && (
            <Typography>No pending vet profiles found.</Typography>
          )}
          <List>
            {pendingProfiles.map((profile) => (
              <React.Fragment key={profile.id}>
                <ListItem
                  secondaryAction={
                    <Button variant="contained" color="success" sx={{ borderRadius: 2 }} onClick={() => handleApprove(profile.id)}>
                      Approve
                    </Button>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#a8dadc" }}>{profile.user?.name?.charAt(0) || "?"}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={profile.user?.name || profile.id}
                    secondary={`${profile.specialty || ''} | ${profile.location || ''}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
      {tab === 2 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
              <Typography variant="h6" mb={2} color="#1d3557">Analytics</Typography>
              {analytics && analytics.perMonth && analytics.perMonth.length > 0 ? (
                <Box>
                  <Typography variant="subtitle1" mb={1}>Profiles Created Per Month</Typography>
                  <Box sx={{ width: '100%', height: { xs: 200, sm: 300 } }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics.perMonth} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis allowDecimals={false} fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#457b9d" radius={[8,8,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">No analytics data available.</Typography>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, mt: { xs: 2, md: 0 } }}>
              <Typography variant="h6" mb={2} color="#1d3557">Recent Admin Actions</Typography>
              <List>
                {recentActions.map((action, i) => (
                  <ListItem key={i}>
                    <ListItemText
                      primary={`${action.action} ${action.details}`}
                      secondary={`${action.user} • ${action.time}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
