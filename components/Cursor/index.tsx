import { animate } from "motion";
import { useEffect, useState } from "react";
import styles from "./Cursor.module.scss";

export default function Cursor({ hovered }) {
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  const [movedPointer, setMovedPointer] = useState<boolean>(false);

  useEffect(() => {
    const ccc: HTMLElement = document.querySelector(".customCursorContainer");
    const cc: HTMLElement = document.querySelector(".customCursor");
    const handleMouseMove = (event: MouseEvent) => {
      setMovedPointer(true);
      ccc.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };
    document.addEventListener("mousemove", handleMouseMove);

    const handleClick = async (event: MouseEvent) => {
      const newDiv = document.createElement("div");
      newDiv.className = "cursorClickDecoration";
      if (cc) {
        cc.appendChild(newDiv);
        await animate(newDiv, {
          position: "absolute",
          width: "0rem",
          height: "0rem",
          backgroundColor: "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
          borderRadius: "100%",
          border: "1px solid rgba(0,0,0,1)",
        }, {
          duration: 0,
        });

        await animate(newDiv, {
          position: "absolute",
          width: "8rem",
          height: "8rem",
          backgroundColor: "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
          border: "1px solid rgba(0,0,0,0.5)",
          borderRadius: "100%",
        }, {
          duration: 1,
        });
        setTimeout(() => {
          cc.removeChild(newDiv);
        }, 1010);
      }
    };
    document.addEventListener("click", handleClick);

    const checkTouchOnlyDevice = () => {
      const mediaQuery = window.matchMedia("(hover: none)");
      setIsTouchOnlyDevice(mediaQuery.matches);
    };
    checkTouchOnlyDevice();
    window.addEventListener("resize", checkTouchOnlyDevice);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkTouchOnlyDevice);
    };
  }, []);

  return (
    <div
      className={
        styles.customCursorContainer +
        " customCursorContainer " +
        (isTouchOnlyDevice ? styles.hiddenPointer : !movedPointer ? styles.hiddenPointer : "")
      }
    >
      <div
        className={
          styles.customCursor +
          " customCursor " +
          (hovered ? styles.mouseHover : "")
        }
      >
        <div className={styles.cursorDecoration1 + " cursorDecoration1 "}></div>
        <div className={styles.cursorDecoration2 + " cursorDecoration2 "}></div>
      </div>
    </div>
  );
}
