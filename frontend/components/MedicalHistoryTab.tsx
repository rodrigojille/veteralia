import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import {
  getMedicalHistory,
  addMedicalHistory,
  updateMedicalHistory,
  deleteMedicalHistory
} from '../utils/api';

interface MedicalEvent {
  id?: number;
  date: string;
  condition: string;
  vetClinic: string;
  notes?: string;
}

interface MedicalHistoryTabProps {
  petId: string;
  token: string;
}

export default function MedicalHistoryTab({ petId, token }: MedicalHistoryTabProps) {
  const [history, setHistory] = useState<MedicalEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MedicalEvent | null>(null);
  const [form, setForm] = useState<MedicalEvent>({ date: '', condition: '', vetClinic: '', notes: '' });
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getMedicalHistory(petId, token);
      setHistory(data);
    } catch (err: any) {
      setError('Error loading medical history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line
  }, [petId]);

  const handleOpen = (event?: MedicalEvent) => {
    setEditing(event || null);
    setForm(event || { date: '', condition: '', vetClinic: '', notes: '' });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setForm({ date: '', condition: '', vetClinic: '', notes: '' });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleSave = async () => {
    try {
      if (editing && editing.id) {
        await updateMedicalHistory(editing.id, form, token);
      } else {
        await addMedicalHistory(petId, form, token);
      }
      handleClose();
      fetchHistory();
    } catch (err) {
      setError('Error saving medical event');
    }
  };
  const handleDelete = async (id?: number) => {
    if (!id) return;
    try {
      await deleteMedicalHistory(id, token);
      fetchHistory();
    } catch (err) {
      setError('Error deleting medical event');
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Historial Médico</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
          Añadir evento
        </Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Condición/Diagnóstico</TableCell>
              <TableCell>Veterinario/Clínica</TableCell>
              <TableCell>Notas</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map(event => (
              <TableRow key={event.id}>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.condition}</TableCell>
                <TableCell>{event.vetClinic}</TableCell>
                <TableCell>{event.notes}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(event)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(event.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {history.length === 0 && (
              <TableRow><TableCell colSpan={5} align="center">Sin historial médico registrado.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Editar evento médico' : 'Añadir evento médico'}</DialogTitle>
        <DialogContent sx={{ minWidth: 350 }}>
          <TextField
            label="Fecha"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Condición/Diagnóstico"
            name="condition"
            value={form.condition}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Veterinario/Clínica"
            name="vetClinic"
            value={form.vetClinic}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Notas"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
