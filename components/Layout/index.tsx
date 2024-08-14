import { ReactNode, useEffect, useState } from "react";
import { themeMode } from "../../pages/_app";
import { breakpoints } from "../../utils/breakpoints";
import Cursor from "../Cursor";
import Frame from "../Frame";
import SplashScreen from "../SplashScreen";

type Props = {
  updateCursorText: Function;
  updateCursorStatus: Function;
  cursorHover: boolean;
  cursorText: string | null;
  preferredTheme: themeMode;
  lightColor: string;
  darkColor: string;
  setSSAnimFinished: Function;
  deviceType: breakpoints;
  children?: ReactNode;
};

const Layout = ({
  updateCursorText,
  updateCursorStatus,
  cursorHover,
  cursorText,
  preferredTheme,
  lightColor,
  darkColor,
  setSSAnimFinished,
  deviceType,
  children,
}: Props) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const onTouchStart = () => {
      setIsTouchDevice(true);
    };

    if ("ontouchstart" in window) {
      // The 'ontouchstart' event is supported, indicating a touch device.
      setIsTouchDevice(true);
    } else {
      // Add an event listener to detect touch events.
      window.addEventListener("touchstart", onTouchStart, { passive: true });
    }

    return () => {
      // Clean up the event listener when the component unmounts.
      window.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  return (
    <main>
      <div id="guidelines">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {!isTouchDevice && <Cursor hovered={cursorHover} txt={cursorText} />}
      <SplashScreen
        setSSAnimFinished={setSSAnimFinished}
        deviceType={deviceType}
      />
      <Frame
        updateCursorText={updateCursorText}
        updateCursorStatus={updateCursorStatus}
        preferredTheme={preferredTheme}
        lightColor={lightColor}
        darkColor={darkColor}
        deviceType={deviceType}
      />
      {children}
    </main>
  );
};

export default Layout;
