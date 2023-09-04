export function generateColors() {
  const brightnessLight = 90;
  const brightnessDark = 15;
  const saturationLight = 50;
  const saturationDark = 15;

  const colors: string[] = [];
  const hue = Math.random() * 360;
  const lightColor = `hsl(${hue}deg, ${saturationLight}%, ${brightnessLight}%)`;
  const darkColor = `hsl(${hue}deg, ${saturationDark}%, ${brightnessDark}%)`;
  colors.push(lightColor);
  colors.push(darkColor);
  return colors;
};