import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Dialog, DialogTitle, DialogContent, IconButton, Tabs, Tab
} from '@mui/material';
import { getAllPets } from '../../utils/api';
import MedicalHistoryTab from '../../components/MedicalHistoryTab';
import { Visibility, Pets as PetsIcon, EventNote as EventNoteIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';

interface Pet {
  id: number;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  owner?: { name: string };
}

export default function PetsDashboard() {
  const [tab, setTab] = useState(0);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTab(newValue);
  const token = typeof window !== 'undefined' ? localStorage.getItem('user_token') || '' : '';
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openPetId, setOpenPetId] = useState<number | null>(null);
  const [openPetName, setOpenPetName] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllPets();
        setPets(data);
      } catch (err) {
        setError('Error loading pets');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleOpen = (petId: number, petName: string) => {
    setOpenPetId(petId);
    setOpenPetName(petName);
  };
  const handleClose = () => {
    setOpenPetId(null);
    setOpenPetName('');
  };

  return (
    <Box maxWidth={1200} mx="auto" mt={4}>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Dashboard navigation"
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 3, '.MuiTab-root': { minWidth: 120, fontWeight: 600 }, '.Mui-selected': { color: 'primary.main' } }}
        role="tablist"
      >
        <Tab icon={<PetsIcon />} iconPosition="start" label="Mascotas" aria-label="Mascotas" sx={{ textTransform: 'none' }} id="dashboard-tab-mascotas" aria-controls="dashboard-panel-mascotas" tabIndex={0} />
        <Tab icon={<EventNoteIcon />} iconPosition="start" label="Citas" aria-label="Citas" sx={{ textTransform: 'none' }} id="dashboard-tab-citas" aria-controls="dashboard-panel-citas" tabIndex={0} />
        <Tab icon={<AccountCircleIcon />} iconPosition="start" label="Perfil" aria-label="Perfil" sx={{ textTransform: 'none' }} id="dashboard-tab-perfil" aria-controls="dashboard-panel-perfil" tabIndex={0} />
      </Tabs>
      {/* Tab Panels */}
      {tab === 0 && (
        <>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4, boxShadow: 3 }} role="main" aria-label="Sección de mascotas">
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="h4" fontWeight={700}>Mis Mascotas</Typography>
              <Button variant="contained" color="primary" startIcon={<span style={{fontWeight:700, fontSize:22}}>＋</span>} sx={{ borderRadius: 3, px: 3, py: 1.2, fontWeight: 600 }} aria-label="Añadir Mascota" tabIndex={0}>
                Añadir Mascota
              </Button>
            </Box>
            {loading ? (
              <Box display="flex" justifyContent="center" my={4}><CircularProgress /></Box>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 1 }} role="region" aria-label="Tabla de mascotas">
                <Table size="small" sx={{ minWidth: 700 }}>
                  <TableHead sx={{ bgcolor: '#f5f7fa' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre</TableCell>
                      <TableCell>Especie</TableCell>
                      <TableCell>Raza</TableCell>
                      <TableCell>Edad</TableCell>
                      <TableCell>Dueño</TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pets.map((pet, idx) => (
                      <TableRow key={pet.id} sx={{ bgcolor: idx % 2 === 0 ? '#fafbfc' : '#f0f2f5', '&:hover': { bgcolor: '#e3e8ef' } }}>
                        <TableCell sx={{ fontWeight: 600 }}>{pet.name}</TableCell>
                        <TableCell>{pet.species}</TableCell>
                        <TableCell>{pet.breed || '-'}</TableCell>
                        <TableCell>{pet.age || '-'}</TableCell>
                        <TableCell>{pet.owner?.name || '-'}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => handleOpen(pet.id, pet.name)} title="Ver Historial Médico" sx={{ color: '#1976d2' }} aria-label={`Ver historial médico de ${pet.name}`} tabIndex={0}>
                            <Visibility />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {pets.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center">Sin mascotas registradas.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
          <Dialog open={!!openPetId} onClose={handleClose} maxWidth="md" fullWidth aria-modal="true" aria-label={`Historial Médico de ${openPetName}`}> 
            <DialogTitle id="modal-title-historial">Historial Médico de {openPetName}</DialogTitle>
            <DialogContent aria-labelledby="modal-title-historial">
              {openPetId && <MedicalHistoryTab petId={openPetId.toString()} token={token} />}
            </DialogContent>
          </Dialog>
        </>
      )}
    </Box>
  );
}

