import { AnimatePresence } from "motion/react";
import Head from 'next/head';
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { themeMode } from "../store/themeStore";
import "../styles/css/Globals.module.min.css";
import { breakpoints, getDeviceType } from "../utils/breakpoints";
import { colorApplicator, generateColors } from "../utils/colorFunctions";

export default function MyApp({ Component, pageProps, router }) {
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [cursorHover, setCursorHover] = useState<boolean>(false);
  const [preferredTheme, setPreferredTheme] = useState<themeMode>(
    themeMode.dark,
  );
  const [lightColor, setLightColor] = useState<string>("");
  const [darkColor, setDarkColor] = useState<string>("");
  const [SSAnimFinished, setSSAnimFinished] = useState<boolean>(false);
  const [deviceType, setDeviceType] = useState<breakpoints>();

  useEffect(() => {
    const prefersdark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const preferslight = window.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches;

    const storedThemePreference: themeMode | null =
      themeMode[localStorage.getItem("yas-theme-preference")];
    const themePreferenceSelection = (): themeMode => {
      return storedThemePreference != null
        ? storedThemePreference
        : preferslight
          ? themeMode.light
          : themeMode.dark;
    };

    let themePreference: themeMode = themePreferenceSelection();

    themePreference === themeMode.dark
      ? document.documentElement.setAttribute("data-theme", "dark")
      : document.documentElement.setAttribute("data-theme", "light");

    const body = document.querySelector("body");
    body.className = "";

    body.classList.add(themeMode[themePreference]);
    setPreferredTheme(themePreference);

    const intervalColor = setInterval(() => {
      let newColors = generateColors();
      setLightColor(newColors[0]);
      setDarkColor(newColors[1]);
      colorApplicator(newColors[0], newColors[1]);
    }, 10000);

    let portrait = window.matchMedia("(orientation: portrait)");
    setDeviceType(getDeviceType());
    const changeDeviceType = () => {
      setDeviceType(getDeviceType())
    }
    const portraitChange = (e) => {
      //changing display orientation
      if (e.matches) {
        setDeviceType(getDeviceType());
      }
    }
    window.addEventListener("resize", changeDeviceType);
    portrait.addEventListener("change", portraitChange);


    return () => {
      clearInterval(intervalColor); // Clear the interval when component unmounts or effect re-runs
      window.removeEventListener("resize", changeDeviceType)
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
        updateCursorText={setCursorText}
        updateCursorStatus={setCursorHover}
        cursorText={cursorText}
        cursorHover={cursorHover}
        preferredTheme={preferredTheme}
        lightColor={lightColor}
        darkColor={darkColor}
        setSSAnimFinished={setSSAnimFinished}
        deviceType={deviceType}
      >
        <AnimatePresence mode="sync" initial={false}>
          <Component
            {...pageProps}
            updateCursorText={setCursorText}
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
