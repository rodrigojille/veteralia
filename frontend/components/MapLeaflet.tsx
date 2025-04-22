
import React, { useEffect, useRef } from "react";
import L from "leaflet";

interface MapLeafletProps {
  position: { lat: number; lng: number };
  onMapClick: (latlng: { lat: number; lng: number }) => void;
}

export default function MapLeaflet({ position, onMapClick }: MapLeafletProps) {
  const [error, setError] = React.useState<string | null>(null);
  console.log('[MapLeaflet] Rendered, position:', position);
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
    console.log('[MapLeaflet] useEffect running');
    let retries = 0;
    let retryTimeout: NodeJS.Timeout | null = null;
    const tryInit = () => {
      if (!mapRef.current) {
        if (retries < 20) {
          retries++;
          retryTimeout = setTimeout(tryInit, 100);
        } else {
          setError('Map ref is not attached after multiple attempts');
          console.error('[MapLeaflet] Map ref is not attached after multiple attempts');
        }
        return;
      }
      try {
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
        // Force Leaflet to recalculate size after mount
        setTimeout(() => {
          map.invalidateSize();
        }, 200);
      } catch (err) {
        setError('Map initialization failed: ' + (err instanceof Error ? err.message : String(err)));
        console.error('[MapLeaflet] Map initialization failed:', err);
      }
    };
    tryInit();
    return () => { if (retryTimeout) clearTimeout(retryTimeout); if (mapInstance.current) mapInstance.current.remove(); };
  }, []);

  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.setView([position.lat, position.lng]);
    }
    if (markerRef.current) {
      markerRef.current.setLatLng([position.lat, position.lng]);
    }
  }, [position]);

  return (
    <div style={{ width: "100%", height: 280, border: '2px dashed red', background: '#ffeaea', position: 'relative' }}>
      {error && (
        <div style={{ color: 'red', fontWeight: 'bold', padding: 8, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, background: '#fff' }}>
          {error}
        </div>
      )}
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}


