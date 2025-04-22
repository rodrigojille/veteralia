import React, { useState } from "react";
import { Box, Typography, Alert } from "@mui/material";
import dynamic from "next/dynamic";
import LocationSearch from "./LocationSearch";
import { reverseGeocode } from "../utils/geocode";

const Map = dynamic(() => import("./MapLeaflet"), { ssr: false });

interface LocationPickerProps {
  value: { lat: number; lng: number } | null;
  onChange: (val: { lat: number; lng: number }) => void;
  address?: string;
  setAddress?: React.Dispatch<React.SetStateAction<string>>;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || '';

export default function LocationPicker({ value, onChange, address, setAddress }: LocationPickerProps) {
  // Default to Mexico City if nothing is set
  const defaultPosition = { lat: 19.4326, lng: -99.1332 };
  const [position, setPosition] = useState(value || defaultPosition);
  const [localAddress, setLocalAddress] = useState(address || "");
  const [error, setError] = useState<string | null>(null);

  const handleMapClick = async (latlng: { lat: number; lng: number }) => {
    setPosition(latlng);
    onChange(latlng);
    setError(null);
    try {
      const addr = await reverseGeocode(latlng, MAPBOX_API_KEY);
      setLocalAddress(addr);
      setAddress && setAddress(addr);
    } catch (err) {
      setLocalAddress("");
      setAddress && setAddress("");
      setError("No se pudo obtener la dirección para la ubicación seleccionada. Puedes continuar seleccionando en el mapa.");
    }
  };

  return (
    <Box mb={2} sx={{ minHeight: 320, background: '#e0f7fa' }}>
      <LocationSearch setLatLng={async (latlng) => {
        setPosition(latlng);
        onChange(latlng);
        setError(null);
        try {
          const addr = await reverseGeocode(latlng, MAPBOX_API_KEY);
          setLocalAddress(addr);
          setAddress && setAddress(addr);
        } catch {
          setLocalAddress("");
          setAddress && setAddress("");
        }
      }} />
      <Typography variant="subtitle2" mb={1}>
        Selecciona tu ubicación en el mapa
      </Typography>
      <Box sx={{ height: 280, borderRadius: 2, overflow: "hidden", border: "1px solid #ddd" }}>
        <Map position={position} onMapClick={handleMapClick} />
      </Box>
      {localAddress && (
        <Typography variant="body2" color="text.secondary" mt={1}>
          {localAddress}
        </Typography>
      )}
      {error && <Alert severity="warning" sx={{ mt: 1 }}>{error}</Alert>}
    </Box>
  );
}

