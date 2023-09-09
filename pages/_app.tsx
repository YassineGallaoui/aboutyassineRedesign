import 'bootstrap/dist/css/bootstrap.css'
import '../styles/css/globals.module.min.css';
import { generateColors } from '../utils/colorGenerator';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';


export default function MyApp({ Component, pageProps }) {
  const [cursorText, setCursorText] = useState<string|null>(null)
  const [cursorHover, setCursorHover] = useState<boolean>(false);
  const [themePreference, setThemePreference] = useState('darkMode');
  const [lightColor, setLightColor] = useState('');
  const [darkColor, setDarkColor] = useState('');

  useEffect(() => {

    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const storedThemePreference = localStorage.getItem('yas-theme-preference');
      const themePreference = storedThemePreference || (prefersDarkMode ? 'darkMode' : 'lightMode');
      themePreference === 'darkMode' ? 
      document.documentElement.setAttribute("data-theme", "dark"):
      document.documentElement.setAttribute("data-theme", "light");
      setThemePreference(themePreference);

    const intervalColor = setInterval(() => {

      let newColors = generateColors();
      setLightColor(newColors[0]);
      setDarkColor(newColors[1]);
      const body = document.querySelector('body');
      const projectModalContainer = document.querySelector('.projectModalContainer') as HTMLElement;
      if(body.classList.contains('lightMode')) {
        body.style.setProperty("background-color", newColors[0]);
        projectModalContainer!=null && projectModalContainer.style.setProperty("background-color", newColors[0]);
      } else {
        body.style.setProperty("background-color", newColors[1]);
        projectModalContainer!=null && projectModalContainer.style.setProperty("background-color", newColors[1]);
      }
    }, 10000)

    return () => {
      clearInterval(intervalColor); // Clear the interval when component unmounts or effect re-runs
    };
  })

  return (
      <Layout
        updateCursorText={setCursorText}
        updateCursorStatus={setCursorHover}
        cursorText={cursorText}
        cursorHover={cursorHover}>
        <Component {...pageProps} updateCursorText={setCursorText} cursorIsHover={setCursorHover} />
      </Layout>
  )
}