import { useEffect, useState } from "react";
import styles from "./HorizontalLines.module.scss";
import { breakpoints, getDeviceType, rootFontSize } from "../../utils/breakpoints";

const HorizontalLines = () => {
  const [lineCountBefore, setLineCountBefore] = useState(0);
  const [lineCountAfter, setLineCountAfter] = useState(0);
  const [referenceLine, setReferenceLine] = useState('');
  const [lineDistanceRem, setLineDistanceRem] = useState(4.75);

  const calculateLineCounts = () => {
    const deviceType: breakpoints = getDeviceType();
    const rem:number = rootFontSize(deviceType);
    
    if (
      deviceType === breakpoints.mobileSmall ||
      deviceType === breakpoints.mobile
    ) {
      setReferenceLine("3rem + 15vh");
      setLineDistanceRem(3);
    } else {
      setReferenceLine("12.5rem + 15vh");
      setLineDistanceRem(4.75);
    }

    const windowHeight = window.innerHeight;
    const existingLineTop = 12.5 * rem + 15 * (windowHeight / 100); // Convert rem and vh to pixels
    const minDistance = lineDistanceRem * rem; // Convert rem to pixels

    const maxLinesBefore = Math.floor(existingLineTop / minDistance);
    const maxLinesAfter = Math.floor(
      (windowHeight - existingLineTop) / minDistance + 3,
    );

    setLineCountBefore(maxLinesBefore);
    setLineCountAfter(maxLinesAfter);
  };

  useEffect(() => {
    // Initial calculation on mount
    calculateLineCounts();

    // Attach event listener for window resize
    window.addEventListener("resize", calculateLineCounts);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", calculateLineCounts);
    };
  }, []);

  return (
    <div className={styles.container}>
      {(lineCountBefore > 0 ? [...Array(lineCountBefore)] : null)?.map(
        (_, index) => (
          <div
            key={`before-${index}`}
            className={styles.line}
            style={
              {
                top: `calc(${referenceLine} - ${
                  lineDistanceRem * (index + 1)
                }rem)`,
                "--i": index,
              } as React.CSSProperties
            }
          />
        ),
      )}
      {(lineCountAfter > 0 ? [...Array(lineCountAfter)] : null)?.map(
        (_, index) => (
          <div
            key={`after-${index}`}
            className={styles.line}
            style={
              {
                top: `calc(${referenceLine} + ${
                  lineDistanceRem * (index + 1)
                }rem)`,
                "--i": index,
              } as React.CSSProperties
            }
          />
        ),
      )}
    </div>
  );
};

export default HorizontalLines;
