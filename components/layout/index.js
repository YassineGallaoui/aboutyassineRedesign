import Frame from '../frame'
import {useEffect} from "react";

export default function Layout({ children }) {
    const Cursor = function(){
        useEffect(() => {
            const body = document.querySelector("body");
            const cc = document.querySelector(".customCursor");
            document.addEventListener('mousemove', (e) => {
                  cc.style.left = e.clientX+'px';
                  cc.style.top = e.clientY+'px';
              });
            
            document.querySelectorAll("img, a").forEach(x => {x.addEventListener('mouseover', (e)=>{
                    cc.classList.add('mouseHover');
                });
            })
            document.querySelectorAll("img, a").forEach(x => {x.addEventListener('mouseleave', (e)=>{
                    cc.classList.remove('mouseHover');
                });
            })
          }, [])
        return(
            <div className='customCursor'></div>
        )
    }
    return (
        <>
            {/* <Cursor /> */}
            <Frame />
            <main>{children}</main>
        </>
    )
}