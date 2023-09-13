export function generateColors():string[] {
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

export function colorApplicator(lightColor:string, darkColor:string):void {
  const body = document.querySelector('body') as HTMLElement;
  const projectModalContainer = document.querySelector('.projectModalContainer') as HTMLElement;

  if(body.classList.contains('lightMode')) {
    body.style.setProperty("background-color", lightColor);
    projectModalContainer!=null && projectModalContainer.style.setProperty("background-color", lightColor);
  } else {
    body.style.setProperty("background-color", darkColor);
    projectModalContainer!=null && projectModalContainer.style.setProperty("background-color", darkColor);
  }
}