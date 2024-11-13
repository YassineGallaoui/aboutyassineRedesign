import React, { useEffect } from "react";
import useScreenInfo from "../../hooks/useScreenInfo";
import { parallax, parallaxMobile } from "../../utils/utility";
import styles from "./TitleBackground.module.scss";

export const TitleBackground = ({ text }) => {
    const screenInfo = useScreenInfo();

    useEffect(() => {
        const mouseMoveEffect = (event: MouseEvent | Event) => {
            parallax(
                event,
                document.querySelectorAll(".sectionBkgrdTxt"),
            );
        }
        setTimeout(() => {
            if (!matchMedia('(hover: none) and (pointer: coarse)').matches) {
                document.addEventListener("mousemove", mouseMoveEffect);
            }
        }, 2000);
        return () => { document.removeEventListener("mousemove", mouseMoveEffect); };
    }, []);

    useEffect(() => {
        const tiltEffect = (event: DeviceOrientationEvent | Event) => {
            parallaxMobile(
                event,
                document.querySelectorAll(".sectionBkgrdTxt"),
                screenInfo,
            );
        }
        setTimeout(() => {
            if (window.DeviceOrientationEvent && matchMedia('(hover: none) and (pointer: coarse)').matches) {
                window.addEventListener("deviceorientation", tiltEffect, true);
            }
        }, 2000);
        return () => { window.removeEventListener("deviceorientation", tiltEffect); };
    }, [screenInfo])

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