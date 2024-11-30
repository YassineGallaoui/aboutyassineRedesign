import { ReactNode } from "react";
import useScreenInfo from "../../hooks/useScreenInfo";
import { breakpoints } from "../../utils/breakpoints";
import CRTScreen from "../CRTScreen";
import Cursor from "../Cursor";
import Frame from "../Frame";
import SplashScreen from "../SplashScreen";

type Props = {
  updateCursorStatus: Function;
  cursorHover: boolean;
  SSAnimFinished: boolean;
  setSSAnimFinished: Function;
  children?: ReactNode;
  deviceType?: breakpoints;
};

const Layout = ({
  updateCursorStatus,
  cursorHover,
  SSAnimFinished,
  setSSAnimFinished,
  children,
  deviceType
}: Props) => {
  const screenInfo = useScreenInfo();
  const showGuideline = false;

  return (
    <main>
      {/* <StatsComponent /> */}
      {/* <Guidelines /> */}
      <CRTScreen />
      {!(screenInfo?.isTouchOnly) && screenInfo?.hasMouse && <Cursor hovered={cursorHover} />}
      <SplashScreen
        setSSAnimFinished={setSSAnimFinished}
        deviceType={deviceType}
      />
      {SSAnimFinished && <Frame
        updateCursorStatus={updateCursorStatus}
      />}
      {children}
    </main>
  );
};

export default Layout;
