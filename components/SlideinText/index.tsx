import styles from "./SlideinText.module.scss";

export function createSpanStructureV2(w) {
  const charArr = w.split("");
  return charArr.map((element, index) => (
    <span key={index} className={styles.charContainer} style={{ "--i": index + 1 } as React.CSSProperties}>
      {element === ' ' ?
        <span className={styles.char}>&nbsp;</span> :
        <span className={styles.char}>{element}</span>
      }
    </span>
  ));
}

export default function SlideinText({ text, isHovered }) {
  return (
    <div className={`${styles.slideinContainer} slideinContainer ${isHovered ? styles.isHovered : ""}` }>
        {createSpanStructureV2(text)}
    </div>
  )
}
