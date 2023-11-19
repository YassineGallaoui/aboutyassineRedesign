import React from "react";
import styles from "./Guidelines.module.scss";

const CenterGuidelines = () => {
  return (
    <div className={styles.centerGuidelines}>
      <div className={styles.horizontalLine}></div>
      <div className={styles.verticalLine}></div>
    </div>
  );
};

export default CenterGuidelines;
