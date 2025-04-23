import React, { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";

interface MapLibreMapProps {
  position: { lat: number; lng: number };
  onMapClick: (coords: { lat: number; lng: number }) => void;
}

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY || "";
const DEFAULT_STYLE = `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`;

export default function MapLibreMap({ position, onMapClick }: MapLibreMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (mapRef.current) return;

    // Create the map
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: DEFAULT_STYLE,
      center: [position.lng, position.lat],
      zoom: 12,
      attributionControl: true,
    });

    // Add marker
    markerRef.current = new maplibregl.Marker()
      .setLngLat([position.lng, position.lat])
      .addTo(mapRef.current);

    mapRef.current.on("click", (e) => {
      onMapClick({ lat: e.lngLat.lat, lng: e.lngLat.lng });
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  // Update marker position when position changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter([position.lng, position.lat]);
    }
    if (markerRef.current) {
      markerRef.current.setLngLat([position.lng, position.lat]);
    }
  }, [position]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: 280, border: "2px dashed green", background: "#eaffea" }}
    />
  );
}
