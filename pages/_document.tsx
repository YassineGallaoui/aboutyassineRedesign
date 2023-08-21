import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect, useState } from 'react';

export default function Document() {
  
  const [themePreference, setThemePreference] = useState('darkMode');

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedThemePreference = localStorage.getItem('yas-theme-preference');
    const themePreference = storedThemePreference || (prefersDarkMode ? 'darkMode' : 'lightMode');
    themePreference === 'darkMode' ? 
    document.documentElement.setAttribute("data-theme", "dark"):
    document.documentElement.setAttribute("data-theme", "light");
    setThemePreference(themePreference);
  }, [themePreference])

  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet" />
      </Head>
      <body className={themePreference}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}