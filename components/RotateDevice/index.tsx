import { animate } from "motion";
import { useEffect } from "react";
import styles from "./RotateDevice.module.scss";
import { RotateDeviceIcon } from "./RotateDeviceIcon";

export const RotateDevice = ({ showComponent, animationFinished }) => {
  useEffect(() => {
    const anim = async () => {
      if (document.querySelector("#rotateDeviceContainer") != null &&
        document.querySelector("#rotateDeviceSvg") != null) {
        await animate("#rotateDeviceSvg", {
          rotate: 0,
          transformOrigin: "50% 50%",
        });

        await animate("#rotateDeviceContainer", {
          zIndex: 25,
          opacity: 1,
        }, { duration: 0.3 },);

        await animate("#arrowOneSvg", {
          y: 250,
          opacity: 1,
        }, {
          duration: 0.3,
          delay: 0,
        });

        await animate("#arrowTwoSvg", {
          y: 500,
          opacity: 1,
        }, {
          duration: 0.3,
          delay: 0,
        });

        await animate("#rotateDeviceSvg", {
          rotate: 90,
          transformOrigin: "50% 50%",
        }, {
          duration: 0.3,
          delay: 0.6,
        });

        await animate("#rotateDeviceContainer", {
          opacity: 0,
        }, {
          duration: 0.3,
          delay: 0.9,
        });

        await animate("#rotateDeviceContainer", {
          zIndex: -2,
        }, {
          duration: 0,
          delay: 1.2,
        });
      }
    }
    if (showComponent) anim();
    animationFinished(false);
  }, [showComponent]);

  return (
    <div id="rotateDeviceContainer" className={styles.rotateDeviceContainer}>
      <div className={styles.imageContainer}>
        <RotateDeviceIcon></RotateDeviceIcon>
      </div>
    </div >
  )
}