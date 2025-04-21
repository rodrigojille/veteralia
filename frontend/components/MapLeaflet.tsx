import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker image for Next.js
// Use custom SVG marker for vet branding
const vetMarkerIcon = L.icon({
  iconUrl: '/vet-marker.svg',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

interface MapLeafletProps {
  position: { lat: number; lng: number };
  onMapClick: (latlng: { lat: number; lng: number }) => void;
}

export default function MapLeaflet({ position, onMapClick }: MapLeafletProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Initialize map once
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    mapInstance.current = L.map(mapRef.current).setView([position.lat, position.lng], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapInstance.current);
    mapInstance.current.on("click", function (e: any) {
      const { lat, lng } = e.latlng;
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng], { icon: vetMarkerIcon, draggable: false }).addTo(mapInstance.current!);
      }
      markerRef.current.setIcon(vetMarkerIcon);
      onMapClick({ lat, lng });
    });
    // Create initial marker
    markerRef.current = L.marker([position.lat, position.lng], { icon: vetMarkerIcon, draggable: false }).addTo(mapInstance.current);
    return () => {
      mapInstance.current && mapInstance.current.remove();
      mapInstance.current = null;
      markerRef.current = null;
    };
  }, []);

  // Update marker position if props.position changes
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng([position.lat, position.lng]);
      markerRef.current.setIcon(vetMarkerIcon);
    }
    if (mapInstance.current) {
      mapInstance.current.setView([position.lat, position.lng], 12);
    }
  }, [position.lat, position.lng]);

  return <div ref={mapRef} style={{ width: "100%", height: 280 }} />;
}
