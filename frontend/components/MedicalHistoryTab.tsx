import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider, Snackbar, Alert
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
  // Validation state
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  // Snackbar state
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!form.date) errors.date = 'La fecha es obligatoria';
    if (!form.condition) errors.condition = 'La condición es obligatoria';
    return errors;
  };

  const handleSave = async () => {
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      if (editing && editing.id) {
        await updateMedicalHistory(editing.id, form, token);
        setSnackbar({ open: true, message: 'Evento actualizado', severity: 'success' });
      } else {
        await addMedicalHistory(petId, form, token);
        setSnackbar({ open: true, message: 'Evento agregado', severity: 'success' });
      }
      handleClose();
      fetchHistory();
    } catch (err) {
      setError('Error al guardar el evento médico');
      setSnackbar({ open: true, message: 'Error al guardar el evento', severity: 'error' });
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
             {history.map((event, idx) => (
              <TableRow key={event.id} sx={{ bgcolor: idx % 2 === 0 ? '#fafbfc' : '#f0f2f5', '&:hover': { bgcolor: '#e3e8ef' } }}>
                <TableCell>{new Date(event.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</TableCell>
                <TableCell>{event.condition}</TableCell>
                <TableCell>{event.vetClinic}</TableCell>
                <TableCell>{event.notes}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(event)} color="primary" title="Editar" aria-label="Editar">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(event.id)} color="error" title="Eliminar" aria-label="Eliminar">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {history.length === 0 && (
              <TableRow><TableCell colSpan={5} align="center">Sin historial médico registrado.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" aria-labelledby="medical-history-modal-title">
        <DialogTitle id="medical-history-modal-title">
          {editing ? 'Editar evento médico' : 'Añadir evento médico'}
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 1, sm: 3 } }}>
          <TextField
            label="Fecha"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!formErrors.date}
            helperText={formErrors.date}
            sx={{ mb: 2 }}
            inputProps={{ 'aria-label': 'Fecha' }}
          />
          <TextField
            label="Condición/Diagnóstico"
            name="condition"
            value={form.condition}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!formErrors.condition}
            helperText={formErrors.condition}
            sx={{ mb: 2 }}
            inputProps={{ 'aria-label': 'Condición o diagnóstico' }}
          />
          <Divider sx={{ my: 2 }} />
          <TextField
            label="Veterinario/Clínica"
            name="vetClinic"
            value={form.vetClinic}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ mb: 2 }}
            inputProps={{ 'aria-label': 'Veterinario o clínica' }}
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
            sx={{ mb: 1 }}
            inputProps={{ 'aria-label': 'Notas' }}
          />
        </DialogContent>
        <DialogActions sx={{ px: { xs: 1, sm: 3 }, pb: { xs: 1, sm: 2 } }}>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
