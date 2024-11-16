import { ReactNode } from "react";
import useScreenInfo from "../../hooks/useScreenInfo";
import { themeMode } from "../../store/themeStore";
import { breakpoints } from "../../utils/breakpoints";
import CRTScreen from "../CRTScreen";
import Cursor from "../Cursor";
import Frame from "../Frame";
import Guidelines from "../Guidelines";
import SplashScreen from "../SplashScreen";
import StatsComponent from "../StatsComponent";

type Props = {
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
      <StatsComponent />
      <Guidelines />
      <CRTScreen />
      {!(screenInfo?.isTouchOnly) && screenInfo?.hasMouse && <Cursor hovered={cursorHover} txt={cursorText} />}
      <SplashScreen
        setSSAnimFinished={setSSAnimFinished}
      />
      <Frame
        updateCursorStatus={updateCursorStatus}
      />
      {children}
    </main>
  );
};

export default Layout;
