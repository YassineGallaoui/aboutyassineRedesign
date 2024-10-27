"use client";

import { useEffect, useState } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import styles from "./StatsComponent.module.scss";

export default function StatsComponent() {
  const screenSize = useScreenSize();
  const [visibile, setVisibile] = useState<boolean>(false);

  useEffect(()=>{
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === 's') {
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
      <div>{screenSize?.width + ' x ' + screenSize?.height}</div>
      <div>{'Aspect ratio ' + screenSize?.aspectRatio}</div>
    </div>
  )
}
