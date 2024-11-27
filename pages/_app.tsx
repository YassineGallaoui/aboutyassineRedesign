import { AnimatePresence } from "motion/react";
import Head from 'next/head';
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { themeMode } from "../store/themeStore";
import "../styles/css/Globals.module.min.css";
import { breakpoints, getDeviceType } from "../utils/breakpoints";
import { colorApplicator, generateColors } from "../utils/colorFunctions";

export default function MyApp({ Component, pageProps, router }) {
  const [cursorHover, setCursorHover] = useState<boolean>(false);

  const [lightColor, setLightColor] = useState<string>("");
  const [darkColor, setDarkColor] = useState<string>("");

  const [SSAnimFinished, setSSAnimFinished] = useState<boolean>(false);
  const [deviceType, setDeviceType] = useState<breakpoints>();

  useEffect(() => {
    const intervalColor = setInterval(() => {
      let newColors = generateColors();
      setLightColor(newColors[0]);
      setDarkColor(newColors[1]);
      colorApplicator(newColors[0], newColors[1]);
    }, 10000);

    const updateTheme = () => {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.body.className = "";
      document.body.classList.add(prefersDarkMode ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", themeMode[themeMode.dark]);
    };
    const resizeDevice = () => {
      setDeviceType(getDeviceType())
    }
    const portraitChange = (e) => {
      if (e.matches) {
        setDeviceType(getDeviceType());
      }
    }

    updateTheme();
    setDeviceType(getDeviceType());

    const portrait = window.matchMedia("(orientation: portrait)");
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");


    window.addEventListener("resize", resizeDevice);
    portrait.addEventListener("change", portraitChange);
    mediaQuery.addEventListener("change", updateTheme);


    return () => {
      clearInterval(intervalColor); // Clear the interval when component unmounts or effect re-runs
      window.removeEventListener("resize", resizeDevice)
      portrait.removeEventListener("change", portraitChange);
    };
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Head>
      <Layout
        updateCursorStatus={setCursorHover}
        cursorHover={cursorHover}
        setSSAnimFinished={setSSAnimFinished}
      >
        <AnimatePresence mode="sync" initial={false}>
          <Component
            {...pageProps}
            cursorIsHover={setCursorHover}
            lightColor={lightColor}
            darkColor={darkColor}
            SSAnimFinished={SSAnimFinished}
            deviceType={deviceType}
            key={router.pathname}
          />
        </AnimatePresence>
      </Layout>
    </>
  );
}
