import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { geocodeAddress } from "../utils/geocode";

interface LocationSearchProps {
  setLatLng: (latlng: { lat: number; lng: number }) => void;
}

const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || '';

export default function LocationSearch({ setLatLng }: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setError(null);
    if (e.target.value.length < 3) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const geocodeResults = await geocodeAddress(e.target.value, MAPBOX_API_KEY);
      setResults(geocodeResults);
    } catch (err) {
      setError('No se pudo buscar la dirección. Puedes seleccionar la ubicación en el mapa.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 8 }}>
      <TextField
        fullWidth
        label="Buscar dirección"
        value={query}
        onChange={handleSearch}
        size="small"
        variant="outlined"
        autoComplete="off"
        disabled={loading}
      />
      {error && <Alert severity="warning" sx={{ mt: 1 }}>{error}</Alert>}
      {results.length > 0 && (
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 4, maxHeight: 150, overflowY: "auto", zIndex: 10, position: "relative" }}>
          {results.map((r) => (
            <div
              key={r.place_id}
              style={{ padding: 8, cursor: "pointer" }}
              onClick={() => {
                setLatLng({ lat: r.lat, lng: r.lng });
                setQuery(r.display_name);
                setResults([]);
              }}
            >
              {r.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
