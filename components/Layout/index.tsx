import { ReactNode } from "react";
import useScreenInfo from "../../hooks/useScreenInfo";
import { themeMode } from "../../pages/_app";
import { breakpoints } from "../../utils/breakpoints";
import CRTScreen from "../CRTScreen";
import Cursor from "../Cursor";
import Frame from "../Frame";
import SplashScreen from "../SplashScreen";
import CenterGuidelines from "../Guidelines";

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
  const screenInfo = useScreenInfo();
  const showGuideline = false;

  return (
    <main>
      <div id="guidelines" className={showGuideline ? 'show':''}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* <StatsComponent /> */}
      <CenterGuidelines />
      <CRTScreen />
      {!(screenInfo?.isTouchOnly) && screenInfo?.hasMouse && <Cursor hovered={cursorHover} txt={cursorText} />}
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
