import { useEffect, useState } from "react";
import styles from "./Cursor.module.scss";
import gsap from "gsap";

export default function Cursor({ hovered, txt }) {
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  const tl = gsap.timeline({});

  useEffect(() => {
    const ccc: HTMLElement = document.querySelector(".customCursorContainer");
    const cc: HTMLElement = document.querySelector(".customCursor");
    const handleMouseMove = (event: MouseEvent) => {
      ccc.style.left = event.clientX + "px";
      ccc.style.top = event.clientY + "px";
    };
    document.addEventListener("mousemove", handleMouseMove);

    const handleClick = (event: MouseEvent) => {
      const newDiv = document.createElement("div");
      newDiv.className = "cursorClickDecoration";
      if (cc) {
        cc.appendChild(newDiv);
        tl.from(newDiv, {
          duration: 0,
          position: "absolute",
          width: "0rem",
          height: "0rem",
          backgroundColor:
            "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
          borderRadius: "100%",
          border: "1px solid rgba(0,0,0,1)",
        }).to(newDiv, {
          duration: 1,
          position: "absolute",
          width: "8rem",
          height: "8rem",
          backgroundColor:
            "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
          border: "1px solid rgba(0,0,0,0.5)",
          borderRadius: "100%",
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
        (isTouchOnlyDevice ? styles.hiddenPointer : "")
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
      {hovered && <div className={styles.customCursorText}>{txt}</div>}
    </div>
  );
}
