import React, { useEffect } from "react";
import { parallax } from "../../utils/utility";
import styles from "./TitleBackground.module.scss";

export const TitleBackground = ({ text }) => {
    const mouseMoveEffect = (event: MouseEvent | Event) => {
        parallax(
            event,
            document.querySelectorAll(".sectionBkgrdTxt")
        );
    }
    useEffect(() => {
        document.addEventListener("mousemove", mouseMoveEffect);

        return () => {
            document.removeEventListener("mousemove", mouseMoveEffect);
        };
    }, []);

    return (
        <div>
            <h1
                className={styles.backgroundText + " sectionBkgrdTxt"}
                style={{ "--fs": `calc(100dvw/(${text.length / 2 + 0.5}))` } as React.CSSProperties}
                aria-label={text}>
                {
                    text.split('').map((el, index) => (
                        <span key={index} aria-hidden="true">
                            <span style={{ "--delayIndex": index } as React.CSSProperties}>
                                {el}
                            </span>
                        </span>
                    ))
                }
            </h1>

            <div
                className={styles.backgroundText + " " + styles.likeH1 + " sectionBkgrdTxt"}
                style={{ "--fs": `calc(100dvw/(${text.length / 2 + 0.5}) * 0.98)` } as React.CSSProperties}
                aria-hidden="true">
                {
                    text.split('').map((el, index) => (
                        <span key={index} aria-hidden="true">
                            <span style={{ "--delayIndex": index } as React.CSSProperties}>
                                {el}
                            </span>
                        </span>
                    ))
                }
            </div>

            <div
                className={styles.backgroundText + " " + styles.likeH1 + " sectionBkgrdTxt"}
                style={{ "--fs": `calc(100dvw/(${text.length / 2 + 0.5}) * 0.96)` } as React.CSSProperties}
                aria-hidden="true">
                {
                    text.split('').map((el, index) => (
                        <span key={index} aria-hidden="true">
                            <span style={{ "--delayIndex": index } as React.CSSProperties}>
                                {el}
                            </span>
                        </span>
                    ))
                }
            </div>
        </div>
    )
}