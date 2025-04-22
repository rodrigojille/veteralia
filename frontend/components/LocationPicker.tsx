import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./MapLeaflet"), { ssr: false });

interface LocationPickerProps {
  value: { lat: number; lng: number } | null;
  onChange: (val: { lat: number; lng: number }) => void;
  address?: string;
  setAddress?: React.Dispatch<React.SetStateAction<string>>;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LocationPicker({ value, onChange }: LocationPickerProps) {
  // Default to Mexico City if nothing is set
  const defaultPosition = { lat: 19.4326, lng: -99.1332 };
  const [position, setPosition] = useState(value || defaultPosition);

  const handleMapClick = (latlng: { lat: number; lng: number }) => {
    setPosition(latlng);
    onChange(latlng);
  };

  return (
    <Box mb={2}>
      <Typography variant="subtitle2" mb={1}>
        Selecciona tu ubicación en el mapa
      </Typography>
      <Box sx={{ height: 280, borderRadius: 2, overflow: "hidden", border: "1px solid #ddd" }}>
        <Map position={position} onMapClick={handleMapClick} />
      </Box>
    </Box>
  );
}
