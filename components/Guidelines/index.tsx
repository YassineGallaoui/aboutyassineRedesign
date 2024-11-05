import { useEffect, useState } from "react";
import styles from "./Guidelines.module.scss";

const Guidelines = () => {
  const [visibile, setVisibile] = useState<boolean>(false);
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === 'g' || event.key.toLowerCase() === 'G') {
        setVisibile((prevState) => !prevState);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [])
  return (
    <div className={styles.centerGuidelines + ' ' + (visibile ? styles.show : '')}>
      <div className={styles.horizontalLine}></div>
      <div className={styles.verticalLine}></div>
    </div>
  );
};

export default Guidelines;
