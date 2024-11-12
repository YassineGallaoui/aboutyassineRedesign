"use client";

import { useEffect, useState } from "react";
import useScreenInfo from "../../hooks/useScreenInfo";
import styles from "./StatsComponent.module.scss";

export default function StatsComponent() {
  const screenInfo = useScreenInfo();
  const [visibile, setVisibile] = useState<boolean>(true);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === 's' || event.key.toLowerCase() === 'S') {
        setVisibile((prevState) => !prevState);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [])

  return (
    <div className={styles.statsContainer + ' ' + (visibile ? styles.show : '')}>
      <p>Size: {screenInfo?.width + ' x ' + screenInfo?.height}</p>
      <p>Aspect ratio: {screenInfo?.aspectRatio}</p>
      <p>Touch: {screenInfo?.isTouchOnly ? 'Yes' : 'No'}</p>
      <p>Has Mouse: {screenInfo?.hasMouse ? 'Yes' : 'No'}</p>
      <p>xTilt: {screenInfo?.xTilt}</p>
    </div>
  )
}
