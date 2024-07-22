export function getDayOrNightIcon(
  iconName: string,
  sunrise: number,
  sunset: number,
  dateTimeString: string
): string {
  const hour = new Date(dateTimeString).getHours();
  const sunriseHour = new Date(sunrise * 1000).getHours(); // Convert to milliseconds and get hours
  const sunsetHour = new Date(sunset * 1000).getHours();
  console.log(hour, sunriseHour, sunsetHour);

  const isDayTime = hour >= sunriseHour && hour <= sunsetHour;
  return isDayTime
    ? iconName.replace(/.$/, 'd')
    : iconName.replace(/.$/, 'n');
}