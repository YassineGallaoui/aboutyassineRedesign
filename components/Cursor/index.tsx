import { useEffect } from "react";
import styles from "../../styles/Cursor.module.css"

export default function Cursor ({hovered, txt}){
    useEffect(() => {
        const cc:HTMLElement = document.querySelector(".customCursor");
        document.addEventListener('mousemove', (e) => {
            cc.style.left = e.clientX+'px';
            cc.style.top = e.clientY+'px';
        });
      }, [])

    useEffect(() => {
        const cc:HTMLElement = document.querySelector(".customCursor");
        hovered ? cc.classList.add('mouseHover'): cc.classList.remove('mouseHover');;
    }, [hovered])

    return(
        <div className={styles.customCursor+' customCursor'}>
            {hovered && 
                <div>
                    {txt}
                </div>
            }
        </div>
    )
}