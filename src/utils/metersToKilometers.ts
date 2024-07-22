export function metersToKilometers(meters: number): string {
  return `${(meters / 1000).toFixed(0)}km`;
}