import "bootstrap/dist/css/bootstrap.css";
import "../styles/css/globals.module.min.css";
import { colorApplicator, generateColors } from "../utils/colorFunctions";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { motion, AnimatePresence } from "framer-motion";

export enum themeMode {
  lightMode,
  darkMode,
}

export default function MyApp({ Component, pageProps, router }) {
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [cursorHover, setCursorHover] = useState<boolean>(false);
  const [preferredTheme, setPreferredTheme] = useState<themeMode>(
    themeMode.darkMode,
  );
  const [lightColor, setLightColor] = useState("");
  const [darkColor, setDarkColor] = useState("");
  const [SSAnimFinished, setSSAnimFinished] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const prefersLightMode = window.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches;

    const storedThemePreference: themeMode | null =
      themeMode[localStorage.getItem("yas-theme-preference")];
    const themePreferenceSelection = (): themeMode => {
      return storedThemePreference != null
        ? storedThemePreference
        : prefersDarkMode || !prefersLightMode
        ? themeMode.darkMode
        : themeMode.lightMode;
    };

    let themePreference: themeMode = themePreferenceSelection();

    themePreference === themeMode.darkMode
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

    return () => {
      clearInterval(intervalColor); // Clear the interval when component unmounts or effect re-runs
    };
  }, []);

  return (
    <Layout
      updateCursorText={setCursorText}
      updateCursorStatus={setCursorHover}
      cursorText={cursorText}
      cursorHover={cursorHover}
      preferredTheme={preferredTheme}
      lightColor={lightColor}
      darkColor={darkColor}
      setSSAnimFinished={setSSAnimFinished}
    >
      <AnimatePresence mode="sync" initial={false}>
        <Component
          {...pageProps}
          updateCursorText={setCursorText}
          cursorIsHover={setCursorHover}
          lightColor={lightColor}
          darkColor={darkColor}
          SSAnimFinished={SSAnimFinished}
          key={router.pathname}
        />
      </AnimatePresence>
    </Layout>
  );
}
