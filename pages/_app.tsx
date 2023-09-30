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

export default function MyApp({ Component, pageProps }) {
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [cursorHover, setCursorHover] = useState<boolean>(false);
  const [preferredTheme, setPreferredTheme] = useState<themeMode>(
    themeMode.darkMode
  );
  const [lightColor, setLightColor] = useState("");
  const [darkColor, setDarkColor] = useState("");

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const prefersLightMode = window.matchMedia(
      "(prefers-color-scheme: light)"
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
    <AnimatePresence mode="wait">
      <Layout
        updateCursorText={setCursorText}
        updateCursorStatus={setCursorHover}
        cursorText={cursorText}
        cursorHover={cursorHover}
        preferredTheme={preferredTheme}
        lightColor={lightColor}
        darkColor={darkColor}
      >
        <motion.div
          style={{ position: "absolute", top: 0, left: 0 }}
          initial={{ x: "-20vw", opacity: 0 }}
          animate={{ x: "0vw", opacity: 1 }}
          exit={{ x: "20vw", opacity: 0 }}
          transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
        >
          <Component
            {...pageProps}
            updateCursorText={setCursorText}
            cursorIsHover={setCursorHover}
            lightColor={lightColor}
            darkColor={darkColor}
          />
        </motion.div>
      </Layout>
    </AnimatePresence>
  );
}
