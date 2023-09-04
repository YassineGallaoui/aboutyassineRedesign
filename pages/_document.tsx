import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect, useState } from 'react';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="./Yassine Icon.ico"></link>
      </Head>
      <body id={"pageBody"}>
        <div className={"lightMode"}></div>
        <div className={"darkMode"}></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}