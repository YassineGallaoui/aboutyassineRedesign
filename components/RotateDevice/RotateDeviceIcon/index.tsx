import { motion } from "framer-motion";
import { rotateDeviceDuration } from "..";

export const RotateDeviceIcon = (showComponent) => {
  const svgVariants = {
    animate: {
      rotate: [0, 90, 90],
      opacity: [1, 1, 0],
      transition: {
        duration: rotateDeviceDuration * 4,
        times: [0, 0.3, 1],
        delay: 0.9,
      }
    },
    initial: {
      rotate: 0,
    }
  };

  const arrOneVariants = {
    animate: {
      y: ["-100%", "0%", "0%", "-100%"],
      opacity: [0, 1, 1, 0],
      transition: {
        duration: rotateDeviceDuration * 5,
        time: [0, 0.3, 0.6, 1],
        delay: 0.3
      }
    },
    initial: {
      y: "-100%",
      opacity: 0,
    }
  };

  const arrTwoVariants = {
    animate: {
      y: ["100%", "0%", "0%", "100%"],
      opacity: [0, 1, 1, 0],
      transition: {
        duration: rotateDeviceDuration * 5,
        time: [0, 0.3, 0.6, 1],
        delay: 0.3
      }
    },
    initial: {
      y: "100%",
      opacity: 0,
    }
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      id="rotateDeviceSvg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 2534 3075"
      width="50%"
      overflow="visible"
      variants={svgVariants}
      initial={"initial"}
      animate={showComponent ? "animate" : "initial"}
    >
      <g>
        <path
          id="phoneSvg"
          fill="#fff"
          fillOpacity="0"
          fillRule="nonzero"
          stroke="#fff"
          strokeWidth="30"
          d="M1660.76 889.975c-.018-52.267-42.468-94.688-94.735-94.67l-632.53.218c-52.266.018-94.686 42.468-94.668 94.735l.421 1223.95c.018 52.261 42.466 94.69 94.733 94.672l632.53-.218c52.266-.018 94.687-42.475 94.669-94.736l-.42-1223.95Z"
        ></path>
        <motion.g
          id="arrowOneSvg"
          fill="#fff"
          fillRule="nonzero"
          stroke="#fff"
          strokeWidth="30"
          variants={arrOneVariants}
          initial={"initial"}
          animate={showComponent ? "animate" : "initial"}
        >
          <path d="m2423.87 834.565-115.175 315.013-182.908-281.146z"></path>
          <path
            fillOpacity="0"
            d="M191.058 1150.31c-.2-584.379 474.079-1058.98 1058.45-1059.18 502.387-.171 923.641 350.328 1032.09 819.99"
          ></path>
        </motion.g>
        <motion.g
          id="arrowTwoSvg"
          fill="#fff"
          fillRule="nonzero"
          stroke="#fff"
          strokeWidth="30"
          variants={arrTwoVariants}
          initial={"initial"}
          animate={showComponent ? "animate" : "initial"}
        >
          <path d="M76.129 2169.61 191.3 1854.593l182.912 281.15z"></path>
          <path
            fillOpacity="0"
            d="M2308.93 1853.86c.2 584.375-474.075 1058.98-1058.45 1059.18-502.383.175-923.641-350.329-1032.09-819.987"
          ></path>
        </motion.g>
      </g>
    </motion.svg>
  );
}