// Mapbox Geocoding utility
// Usage: import { geocodeAddress } from './geocode';
// geocodeAddress('address', 'MAPBOX_API_KEY')

export async function geocodeAddress(query: string, apiKey: string) {
  if (!apiKey) throw new Error('Missing Mapbox API key');
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${apiKey}&autocomplete=true&limit=5&language=es`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Geocoding service unavailable');
  const data = await resp.json();
  return (data.features || []).map((f: any) => ({
    place_id: f.id,
    display_name: f.place_name,
    lat: f.center[1],
    lng: f.center[0],
  }));
}
