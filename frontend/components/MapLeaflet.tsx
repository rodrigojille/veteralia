
import React, { useEffect, useRef } from "react";
import L from "leaflet";

interface MapLeafletProps {
  position: { lat: number; lng: number };
  onMapClick: (latlng: { lat: number; lng: number }) => void;
}

export default function MapLeaflet({ position, onMapClick }: MapLeafletProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Fix for default icon path issues in Next.js/Leaflet
  useEffect(() => {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);


  useEffect(() => {
    if (!mapRef.current) return;
    if (mapInstance.current) return;
    const map = L.map(mapRef.current).setView([position.lat, position.lng], 12);
    mapInstance.current = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
    // Add marker
    markerRef.current = L.marker([position.lat, position.lng]).addTo(map);
    map.on('click', (e: L.LeafletMouseEvent) => {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    });
    return () => { map.remove(); };
  }, []);

  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.setView([position.lat, position.lng]);
    }
    if (markerRef.current) {
      markerRef.current.setLatLng([position.lat, position.lng]);
    }
  }, [position]);

  return <div ref={mapRef} style={{ width: "100%", height: 280 }} />;
}


