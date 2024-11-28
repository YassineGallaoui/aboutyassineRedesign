import { ReactNode } from "react";
import useScreenInfo from "../../hooks/useScreenInfo";
import CRTScreen from "../CRTScreen";
import Cursor from "../Cursor";
import Frame from "../Frame";
import SplashScreen from "../SplashScreen";

type Props = {
  updateCursorStatus: Function;
  cursorHover: boolean;
  setSSAnimFinished: Function;
  children?: ReactNode;
};

const Layout = ({
  updateCursorStatus,
  cursorHover,
  setSSAnimFinished,
  children,
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
      />
      <Frame
        updateCursorStatus={updateCursorStatus}
      />
      {children}
    </main>
  );
};

export default Layout;
