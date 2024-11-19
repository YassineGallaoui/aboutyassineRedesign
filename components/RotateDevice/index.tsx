import { animate } from "motion";
import { useEffect } from "react";
import styles from "./RotateDevice.module.scss";
import { RotateDeviceIcon } from "./RotateDeviceIcon";

export const RotateDevice = ({ showComponent, animationFinished }) => {
  useEffect(() => {
    const anim = async () => {
      await animate("#rotateDeviceSvg", {
        rotate: 0,
        transformOrigin: "50% 50%",
      });

      await animate(".rotateDeviceContainer", {
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

      await animate(".rotateDeviceContainer", {
        zIndex: -1,
        opacity: 0,
      }, {
        duration: 0.3,
        delay: 0.9,
      });
    }
    anim();
    animationFinished(false);
  }, [showComponent]);

  return (
    <div className={styles.rotateDeviceContainer + " rotateDeviceContainer"}>
      <div className={styles.imageContainer}>
        <RotateDeviceIcon></RotateDeviceIcon>
      </div>
    </div>
  );
};
