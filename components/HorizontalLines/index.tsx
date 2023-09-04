import { useEffect, useState } from 'react';
import styles from './HorizontalLines.module.scss';

const HorizontalLines = () => {
  const [lineCountBefore, setLineCountBefore] = useState(0);
  const [lineCountAfter, setLineCountAfter] = useState(0);
  const lineDistanceRem = 4.75;

  const calculateLineCounts = () => {
    const windowHeight = window.innerHeight;
    const existingLineTop = 12.5 * 16 + 15 * (windowHeight / 100); // Convert rem and vh to pixels
    const minDistance = lineDistanceRem * 16; // Convert rem to pixels

    const maxLinesBefore = Math.floor(existingLineTop / minDistance);
    const maxLinesAfter = Math.floor((windowHeight - existingLineTop) / minDistance);

    setLineCountBefore(maxLinesBefore);
    setLineCountAfter(maxLinesAfter);
  };

  useEffect(() => {
    // Initial calculation on mount
    calculateLineCounts();

    // Attach event listener for window resize
    window.addEventListener('resize', calculateLineCounts);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', calculateLineCounts);
    };
  }, []);

  return (
    <div className={styles.container}>
      {[...Array(lineCountBefore)].map((_, index) => (
        <div
          key={`before-${index}`}
          className={styles.line}
          style={{
            top: `calc(12.5rem + 15vh - ${lineDistanceRem  * (index + 1)}rem)`, '--i': index,
          }}
        />
      ))}
      {[...Array(lineCountAfter)].map((_, index) => (
        <div
          key={`after-${index}`}
          className={styles.line}
          style={{
            top: `calc(12.5rem + 15vh + ${lineDistanceRem  * (index + 1)}rem)`, '--i': index,
          }}
        />
      ))}
    </div>
  );
};

export default HorizontalLines;
