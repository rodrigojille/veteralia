// Simple fuzzy match utility for vet search
export function fuzzyMatch(text: string, query: string) {
  // Lowercase all and remove spaces
  text = text.toLowerCase().replace(/\s+/g, '');
  query = query.toLowerCase().replace(/\s+/g, '');
  if (!query) return true;
  // Fuzzy: all query chars must appear in order in text
  let ti = 0;
  for (let qi = 0; qi < query.length; qi++) {
    ti = text.indexOf(query[qi], ti);
    if (ti === -1) return false;
    ti++;
  }
  return true;
}
