import React, { useEffect, useState, useMemo } from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container, Typography, Paper, Box, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { getVetAppointments, updateAppointment } from '../utils/api';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const DragAndDropCalendar = withDragAndDrop(Calendar);

interface AppointmentEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  notes?: string;
  status: string;
}

export default function VetCalendarPage() {
  const [events, setEvents] = useState<AppointmentEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<AppointmentEvent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editNotes, setEditNotes] = useState('');
  const [editDate, setEditDate] = useState<Date | null>(null);

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('vet_token') || localStorage.getItem('user_token');
        const data = await getVetAppointments(token);
        const mapped = (data || []).map((appt: any) => ({
          id: appt.id,
          title: `${appt.pet?.name || 'Pet'} with ${appt.petOwner?.name || 'Owner'}`,
          start: new Date(appt.datetime),
          end: new Date(new Date(appt.datetime).getTime() + 30 * 60 * 1000), // 30min default
          notes: appt.notes,
          status: appt.status,
        }));
        setEvents(mapped);
      } catch (e: any) {
        setError('Failed to load appointments');
      }
      setLoading(false);
    }
    fetchAppointments();
  }, []);

  // Handler for drag-and-drop event move
  const onEventDrop = async ({ event, start, end }: any) => {
    const token = localStorage.getItem('vet_token') || localStorage.getItem('user_token');
    try {
      // Optimistically update UI
      setEvents((prev) => prev.map((e) => e.id === event.id ? { ...e, start, end } : e));
      await updateAppointment(event.id, { datetime: start.toISOString() }, token);
      // Refetch to ensure data consistency
      const data = await getVetAppointments(token);
      const mapped = (data || []).map((appt: any) => ({
        id: appt.id,
        title: `${appt.pet?.name || 'Pet'} with ${appt.petOwner?.name || 'Owner'}`,
        start: new Date(appt.datetime),
        end: new Date(new Date(appt.datetime).getTime() + 30 * 60 * 1000),
        notes: appt.notes,
        status: appt.status,
      }));
      setEvents(mapped);
    } catch (err) {
      setError('Failed to update appointment');
    }
  };

  // Handler for opening modal
  const handleSelectEvent = (event: AppointmentEvent) => {
    setSelectedEvent(event);
    setEditNotes(event.notes || '');
    setEditDate(event.start);
    setModalOpen(true);
  };

  // Handler for saving modal edits
  const [saving, setSaving] = useState(false);
  const [modalMsg, setModalMsg] = useState<string | null>(null);
  const handleSave = async () => {
    if (!selectedEvent || !editDate) return;
    setSaving(true);
    setModalMsg(null);
    const token = localStorage.getItem('vet_token') || localStorage.getItem('user_token');
    try {
      await updateAppointment(selectedEvent.id, { datetime: editDate.toISOString(), notes: editNotes }, token);
      setModalMsg('Appointment updated!');
      // Refetch for consistency
      const data = await getVetAppointments(token);
      const mapped = (data || []).map((appt: any) => ({
        id: appt.id,
        title: `${appt.pet?.name || 'Pet'} with ${appt.petOwner?.name || 'Owner'}`,
        start: new Date(appt.datetime),
        end: new Date(new Date(appt.datetime).getTime() + 30 * 60 * 1000),
        notes: appt.notes,
        status: appt.status,
      }));
      setEvents(mapped);
      setTimeout(() => {
        setModalOpen(false);
        setModalMsg(null);
      }, 1200);
    } catch (err) {
      setModalMsg('Failed to update appointment');
    }
    setSaving(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} color="#1d3557" mb={3}>
        My Appointment Calendar
      </Typography>
      <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, minHeight: 500 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <DragAndDropCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            views={['month', 'week', 'day']}
            popup
            draggableAccessor={() => true}
            onEventDrop={onEventDrop}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.status === 'cancelled' ? '#eee' : '#a8dadc',
                color: '#1d3557',
                borderRadius: 8,
                border: 'none',
                fontWeight: 500,
              },
            })}
            onSelectEvent={handleSelectEvent}
          />
        )}
        {/* Modal for event details and editing */}
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogContent>
            <Typography gutterBottom><b>Title:</b> {selectedEvent?.title}</Typography>
            <Typography gutterBottom><b>Status:</b> {selectedEvent?.status}</Typography>
            <TextField
              label="Notes"
              fullWidth
              multiline
              rows={3}
              value={editNotes}
              onChange={e => setEditNotes(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Date & Time"
              type="datetime-local"
              fullWidth
              value={editDate ? new Date(editDate).toISOString().slice(0,16) : ''}
              onChange={e => setEditDate(new Date(e.target.value))}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}
