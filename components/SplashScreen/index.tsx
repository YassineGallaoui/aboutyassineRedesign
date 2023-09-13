import styles from './SplashScreen.module.scss'
import logoY from '../../public/logo/logo-Y.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import TypingText from '../TypingText';
import gsap from 'gsap';
import ProgressBarCMD from '../ProgressBarCMD';


export default function SplashScreen({updateCursorText, updateCursorStatus}) {
    const tl = gsap.timeline({});
    const displaySS = true;
    const baseDirectory = `C:\\Users\\yas> `;
    const directoryProjects = `C:\\Users\\yas\\projects> `;
    const directoryYassineRedesign = `C:\\Users\\yas\\projects\\yasRedesign> `;
    const texhnicalText1 = `cd projects`;
    const texhnicalText2 = `cd yasRedesign`;
    const texhnicalText3 = `code .`;
    const texhnicalText4 = `npm run dev`;
    const texhnicalText5 = `[··············································]`;

    const [text1Completed, setText1Completed] = useState(false);
    const [text2Completed, setText2Completed] = useState(false);
    const [text3Completed, setText3Completed] = useState(false);
    const [text4Completed, setText4Completed] = useState(false);
    const [text5Completed, setText5Completed] = useState(false);

    useEffect(()=>{
      if(text5Completed){
        const SSContainer = document.querySelector('.SSContainer');
        setTimeout(() => {
          tl.to(SSContainer, {
            top: -100,
            opacity: 0,
            zIndex: 0
          })
        }, 1200);
      }
    }, [text5Completed])

    return displaySS ? (
      <div className={styles.SSContainer+' SSContainer'}>
        <Image id={styles.logoImageSS} src={logoY} alt={`Yassine's Portfolio logo`} fill></Image>
        <div className={styles.codeText}>
          <span>{baseDirectory}</span>
          <span><TypingText text={texhnicalText1} updateCompletion={setText1Completed} /></span>
          {text1Completed && <><br/><span>{directoryProjects}</span></>}
          <span>{text1Completed && <TypingText text={texhnicalText2} updateCompletion={setText2Completed} />}</span>
          {text2Completed && <><br/><span>{directoryYassineRedesign}</span></>}
          <span>{text2Completed && <TypingText text={texhnicalText3} updateCompletion={setText3Completed} />}</span>
          {text3Completed && <><br/><span>{directoryYassineRedesign}</span></>}
          <span>{text3Completed && <TypingText text={texhnicalText4} updateCompletion={setText4Completed} />}</span>
          <span>{text4Completed && <><br/><ProgressBarCMD text={texhnicalText5} updateCompletion={setText5Completed} /></>}</span>
          {!text4Completed && <div className={styles.textCursor}></div>}
        </div>
      </div>
    ) : <></>;
}