export function rgbToRgba(value: string, alpha: number) {
  const match = value.match(/\d+/g);
  if (!match) return value;

  const [r, g, b] = [...match];
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
