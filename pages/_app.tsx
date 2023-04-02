import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Layout from '../components/layout'
import { useState } from 'react'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  const [cursorText, setCursorText] = useState<string|null>(null)
  const [cursorHover, setCursorHover] = useState<boolean>(false);
  return (
    <>
      <Head>
        <title>{`YASSINE`}</title>
      </Head>
      <Layout 
        updateCursorText={setCursorText} 
        updateCursorStatus={setCursorHover} 
        cursorText={cursorText} 
        cursorHover={cursorHover}>
        <Component {...pageProps} updateCursorText={setCursorText} cursorIsHover={setCursorHover} />
      </Layout>
    </>
  )
}