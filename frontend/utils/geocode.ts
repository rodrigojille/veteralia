// Mapbox Geocoding utility
// Usage: import { geocodeAddress, reverseGeocode } from './geocode';
// geocodeAddress('address', 'MAPBOX_API_KEY')
// reverseGeocode({lat, lng}, 'MAPBOX_API_KEY')

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

export async function reverseGeocode(latlng: { lat: number, lng: number }, apiKey: string) {
  if (!apiKey) throw new Error('Missing Mapbox API key');
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${latlng.lng},${latlng.lat}.json?access_token=${apiKey}&language=es&limit=1`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Reverse geocoding service unavailable');
  const data = await resp.json();
  if (data.features && data.features.length > 0) {
    return data.features[0].place_name;
  }
  throw new Error('No address found for this location');
}
