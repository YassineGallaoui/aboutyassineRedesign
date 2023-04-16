import { useEffect } from "react";
import styles from "./Cursor.module.scss"

export default function Cursor({ hovered, txt }) {
    useEffect(() => {
        const cc: HTMLElement = document.querySelector(".customCursorContainer");
        document.addEventListener('mousemove', (e) => {
            cc.style.left = e.clientX + 'px';
            cc.style.top = e.clientY + 'px';
        });
    }, [])

    return (
        <div className={styles.customCursorContainer + ' customCursorContainer'}>
            <div className={styles.customCursor + ' customCursor ' + (hovered ? styles.mouseHover : '')}>
            </div>
            {hovered &&
                <div className={styles.customCursorText}>
                    {txt}
                </div>
            }
        </div>
    )
}