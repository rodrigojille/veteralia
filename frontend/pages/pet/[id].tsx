import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Tabs, Tab, Paper, Typography } from '@mui/material';
import MedicalHistoryTab from '../../components/MedicalHistoryTab';

// Inline placeholder components for other tabs
const GeneralInfoTab = ({ petId }: { petId: string }) => (
  <Typography color="text.secondary">Información general de la mascota aquí.</Typography>
);
const VaccinationsTab = ({ petId }: { petId: string }) => (
  <Typography color="text.secondary">Vacunas de la mascota aquí.</Typography>
);

export default function PetProfilePage() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('user_token') || '' : '';
  const router = useRouter();
  const { id } = router.query;
  const petId = typeof id === 'string' ? id : '';
  const [tab, setTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box maxWidth={800} mx="auto" mt={4}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" mb={2}>Perfil de Mascota</Typography>
        <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab label="Información General" />
          <Tab label="Historial Médico" />
          <Tab label="Vacunas" />
        </Tabs>
        <Box mt={3}>
          {tab === 0 && (
            <Box>
              {/* Replace with actual GeneralInfoTab implementation */}
              <Typography color="text.secondary">Información general de la mascota aquí.</Typography>
            </Box>
          )}
          {tab === 1 && (
            <MedicalHistoryTab petId={petId} token={token} />
          )}
          {tab === 2 && (
            <Box>
              {/* Replace with actual VaccinationsTab implementation */}
              <Typography color="text.secondary">Vacunas de la mascota aquí.</Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
