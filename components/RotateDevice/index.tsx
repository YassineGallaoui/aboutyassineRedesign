import { motion } from "motion/react"
import { useEffect } from "react";
import styles from "./RotateDevice.module.scss";
import { RotateDeviceIcon } from "./RotateDeviceIcon";

export const rotateDeviceDuration = 0.3;
export const RotateDevice = ({ showComponent, animationFinished }) => {

  useEffect(() => {
    if (showComponent) {
      const timer = setTimeout(() => { animationFinished(false) }, rotateDeviceDuration * 1000 * 6);
      return () => clearTimeout(timer);
    }
  }, [showComponent]);

  const dcVariants = {
    animate: {
      zIndex: [-2, 3],
      opacity: [0, 1],
      transition: {
        duration: rotateDeviceDuration
      }
    },
    initial: {
      zIndex: [-2],
      opacity: [0],
      transition: {
        duration: 0.3,
      }
    }
  }

  return (
    <motion.div
      id="rotateDeviceContainer"
      className={styles.rotateDeviceContainer}
      variants={dcVariants}
      initial={"initial"}
      animate={showComponent ? "animate" : "initial"}
    >
      {showComponent && <RotateDeviceIcon showComponent={showComponent}></RotateDeviceIcon>}
    </motion.div >
  )
}