import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'
import useColorScheme from '../hooks/ColorSchema';

export default function Document() {
  const colorScheme = useColorScheme();

  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet" />
      </Head>
      <body className={colorScheme === 'dark' ? 'darkMode' : 'lightMode'}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}