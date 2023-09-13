import 'bootstrap/dist/css/bootstrap.css'
import '../styles/css/globals.module.min.css';
import { colorApplicator, generateColors } from '../utils/colorFunctions';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';


export default function MyApp({ Component, pageProps }) {
  const [cursorText, setCursorText] = useState<string|null>(null)
  const [cursorHover, setCursorHover] = useState<boolean>(false);
  const [lightColor, setLightColor] = useState('');
  const [darkColor, setDarkColor] = useState('');

  useEffect(() => {

    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const storedThemePreference = localStorage.getItem('yas-theme-preference');
      const themePreference = storedThemePreference || (prefersDarkMode ? 'darkMode' : 'lightMode');
      themePreference === 'darkMode' ? 
      document.documentElement.setAttribute("data-theme", "dark"):
      document.documentElement.setAttribute("data-theme", "light");

    const intervalColor = setInterval(() => {

      let newColors = generateColors();
      setLightColor(newColors[0]);
      setDarkColor(newColors[1]);
      colorApplicator(newColors[0], newColors[1]);
    },10000)

    return () => {
      clearInterval(intervalColor); // Clear the interval when component unmounts or effect re-runs
    };
  })

  return (
      <Layout
        updateCursorText={setCursorText}
        updateCursorStatus={setCursorHover}
        cursorText={cursorText}
        cursorHover={cursorHover}
        lightColor={lightColor}
        darkColor={darkColor}>
        <Component 
          {...pageProps} 
          updateCursorText={setCursorText} cursorIsHover={setCursorHover} 
          lightColor={lightColor}
          darkColor={darkColor}/>
      </Layout>
  )
}