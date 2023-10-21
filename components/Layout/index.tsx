import React, { ReactNode } from "react";
import Cursor from "../Cursor";
import SplashScreen from "../SplashScreen";
import Frame from "../Frame";
import { themeMode } from "../../pages/_app";

type Props = {
  updateCursorText: Function;
  updateCursorStatus: Function;
  cursorHover: boolean;
  cursorText: string | null;
  preferredTheme: themeMode;
  lightColor: string;
  darkColor: string;
  setSSAnimFinished: Function;
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
  children,
}: Props) => {
  return (
    <main>
      <Cursor hovered={cursorHover} txt={cursorText} />
      <SplashScreen
        setSSAnimFinished={setSSAnimFinished}
      />
      <Frame
        updateCursorText={updateCursorText}
        updateCursorStatus={updateCursorStatus}
        preferredTheme={preferredTheme}
        lightColor={lightColor}
        darkColor={darkColor}
      />
      {children}
    </main>
  );
};

export default Layout;
