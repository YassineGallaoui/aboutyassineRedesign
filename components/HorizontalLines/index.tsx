import styles from "./HorizontalLines.module.scss";

const HorizontalLines = () => {

  return (
    <div className={styles.container}>
      {([...Array(30)])?.map(
        (_, index) => (
          <div
            key={`before-${index}`}
            className={styles.line__before}
            style={{ "--i": -(index + 1) } as React.CSSProperties}
          />
        ),
      )}
      {([...Array(30)])?.map(
        (_, index) => (
          <div
            key={`before-${index}`}
            className={styles.line__after}
            style={{ "--i": index + 1 } as React.CSSProperties}
          />
        ),
      )}
    </div>
  );
};

export default HorizontalLines;
