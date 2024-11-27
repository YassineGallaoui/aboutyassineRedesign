"use client";

import { useEffect, useState } from "react";
import useScreenInfo from "../../hooks/useScreenInfo";
import styles from "./StatsComponent.module.scss";

export default function StatsComponent() {
  const screenInfo = useScreenInfo();
  const [visibile, setVisibile] = useState<boolean>(true);
  const [x, setX] = useState({ w1: null, w2: null, w3: null, w4: null, w5: null, w6: null, w7: null, w8: null });

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

  useEffect(() => {
    const tiltEffect = () => {
      setX((prevState) => ({
        ...prevState,
        w6: !matchMedia('(hover: none) and (pointer: coarse)').matches,
        w7: window.DeviceOrientationEvent && matchMedia('(hover: none) and (pointer: coarse)').matches && screenInfo != null,
        w8: screenInfo?.xTilt ? ((window.innerWidth / 2 - (window.innerWidth * ((screenInfo.xTilt + 1) / 2))) / (window.innerWidth * 0.5)) : 0,
      }));
    }

    if (window.DeviceOrientationEvent && matchMedia('(hover: none) and (pointer: coarse)').matches) {
      window.addEventListener("deviceorientation", tiltEffect, true);
    }
  }, [screenInfo])

  /*   useEffect(() => {
      let mf = 0.5;
      const handleOrientation = () => {
        setX((prevState)=>({...prevState,
          w1: window.innerWidth,
          w2: (window.innerWidth * ((screenInfo?.xTilt + 1) / 2)),
          w3: mf,
          w4: screenInfo?.xTiltActive ? "true" : "false",
          w5: screenInfo?.xTilt,
        }));
      }
      if (window.DeviceOrientationEvent && matchMedia('(hover: none) and (pointer: coarse)').matches) {
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    }, [screenInfo]) */

  return (
    <div className={styles.statsContainer + ' ' + (visibile ? styles.show : '')}>
      <p>Size: {screenInfo?.width + ' x ' + screenInfo?.height}</p>
      <p>Aspect ratio: {screenInfo?.aspectRatio}</p>
      <p>Touch: {screenInfo?.isTouchOnly ? 'Yes' : 'No'}</p>
      <p>Has Mouse: {screenInfo?.hasMouse ? 'Yes' : 'No'}</p>
      <p>xTilt Active: {screenInfo?.xTiltActive ? 'Yes' : 'No'}</p>
      {screenInfo?.xTiltActive && <p>xTilt: {screenInfo?.xTilt}</p>}
      {x?.w6 &&
        <p>DESKTOP</p>
      }
      {x?.w7 &&
        <p>MOBILE</p>
      }
      {x?.w8 &&
        <p>value: {x?.w8}</p>
      }
      {/*       <p>w1: {x?.w1}</p>
      <p>w2: {x?.w2}</p>
      <p>w3: {x?.w3}</p>
      <p>w4: {x?.w4}</p>
      <p>w5: {x?.w5}</p> */}
    </div>
  )
}
