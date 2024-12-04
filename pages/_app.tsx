import { AnimatePresence } from "motion/react";
import Head from 'next/head';
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import useThemeStore, { themeMode } from "../store/themeStore";
import "../styles/css/Globals.module.min.css";
import { breakpoints, getDeviceType } from "../utils/breakpoints";
import { colorApplicator, generateColors } from "../utils/colorFunctions";

export default function MyApp({ Component, pageProps, router }) {
  const { setColors, setTheme } = useThemeStore();
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
      setColors(newColors[0], newColors[1])
    }, 5000);

    const updateTheme = () => {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDarkMode ? themeMode.dark : themeMode.light)
      document.body.className = "";
      document.body.classList.add(prefersDarkMode ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", prefersDarkMode ? themeMode[themeMode.dark] : themeMode[themeMode.light]);
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
      mediaQuery.removeEventListener("change", updateTheme);
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
        SSAnimFinished={SSAnimFinished}
        setSSAnimFinished={setSSAnimFinished}
        deviceType={deviceType}
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
