import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Dialog, DialogTitle, DialogContent, IconButton
} from '@mui/material';
import { getAllPets } from '../../utils/api';
import MedicalHistoryTab from '../../components/MedicalHistoryTab';
import { Visibility } from '@mui/icons-material';

interface Pet {
  id: number;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  owner?: { name: string };
}

export default function PetsDashboard() {
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
    <Box maxWidth={900} mx="auto" mt={4}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" mb={2}>Dashboard de Mascotas</Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}><CircularProgress /></Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Especie</TableCell>
                  <TableCell>Raza</TableCell>
                  <TableCell>Edad</TableCell>
                  <TableCell>Dueño</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pets.map(pet => (
                  <TableRow key={pet.id}>
                    <TableCell>{pet.name}</TableCell>
                    <TableCell>{pet.species}</TableCell>
                    <TableCell>{pet.breed || '-'}</TableCell>
                    <TableCell>{pet.age || '-'}</TableCell>
                    <TableCell>{pet.owner?.name || '-'}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleOpen(pet.id, pet.name)} title="Ver Historial Médico">
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {pets.length === 0 && (
                  <TableRow><TableCell colSpan={6} align="center">Sin mascotas registradas.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      <Dialog open={!!openPetId} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Historial Médico de {openPetName}</DialogTitle>
        <DialogContent>
          {openPetId && <MedicalHistoryTab petId={openPetId.toString()} token={token} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
