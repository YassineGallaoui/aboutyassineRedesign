import { useEffect } from "react";
import gsap from "gsap";
import styles from "./RotateDevice.module.scss";
import { RotateDeviceIcon } from "./RotateDeviceIcon";

export const RotateDevice = ({ showComponent, animationFinished }) => {
  const tl = gsap.timeline({});

  useEffect(() => {
    if (showComponent)
      tl.to("#rotateDeviceSvg", {
        rotate: 0,
        transformOrigin: "50% 50%",
        duration: 0,
      })
        .to(".rotateDeviceContainer", {
          zIndex: 25,
          opacity: 1,
          duration: 0.3,
        })
        .fromTo(
          "#arrowOneSvg",
          {
            y: -500,
            opacity: 0,
            duration: 0,
            delay: 0,
          },
          {
            y: 250,
            opacity: 1,
            duration: 0.3,
          }
        )
        .fromTo(
          "#arrowTwoSvg",
          {
            y: 1250,
            opacity: 0,
            duration: 0,
            delay: 0,
          },
          {
            y: 500,
            opacity: 1,
            duration: 0.3,
          },
          "<"
        )
        .to(
          "#rotateDeviceSvg",
          {
            rotate: 90,
            transformOrigin: "50% 50%",
            duration: 0.3,
          },
          "+=0.3"
        )
        .to(
          ".rotateDeviceContainer",
          {
            zIndex: -1,
            opacity: 0,
            duration: 0.3,
          },
          "+=0.6"
        );

        animationFinished(false);
  }, [showComponent]);

  return (
    <div className={styles.rotateDeviceContainer + " rotateDeviceContainer"}>
      <div className={styles.imageContainer}>
        {/* <Image src={rotateImage} alt={"Please rotate the device"} fill /> */}
        <RotateDeviceIcon></RotateDeviceIcon>
      </div>
    </div>
  );
};
