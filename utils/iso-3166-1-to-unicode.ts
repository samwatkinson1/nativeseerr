export function iso31661ToUnicode(iso31661?: string, fallback?: string) {
  if (!iso31661) return fallback;
  return iso31661
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}
