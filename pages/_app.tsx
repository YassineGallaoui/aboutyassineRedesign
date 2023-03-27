import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Layout from '../components/layout'
import { useState } from 'react'

export default function MyApp({ Component, pageProps }) {
  const [cursorText, setCursorText] = useState<string|null>(null)
  const [cursorHover, setCursorHover] = useState<boolean>(false);
  return (
    <Layout cursorText={cursorText} cursorHover={cursorHover}>
      <Component {...pageProps} updateCursorText={setCursorText} cursorIsHover={setCursorHover} />
    </Layout>
  )
}