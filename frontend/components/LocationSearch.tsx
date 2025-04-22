import React, { useState } from "react";
import TextField from "@mui/material/TextField";

interface LocationSearchProps {
  setLatLng: (latlng: { lat: number; lng: number }) => void;
}

export default function LocationSearch({ setLatLng }: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length < 3) {
      setResults([]);
      return;
    }
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(e.target.value)}`
    );
    const data = await res.json();
    setResults(data);
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
      />
      {results.length > 0 && (
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 4, maxHeight: 150, overflowY: "auto", zIndex: 10, position: "relative" }}>
          {results.map((r) => (
            <div
              key={r.place_id}
              style={{ padding: 8, cursor: "pointer" }}
              onClick={() => {
                setLatLng({ lat: parseFloat(r.lat), lng: parseFloat(r.lon) });
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
