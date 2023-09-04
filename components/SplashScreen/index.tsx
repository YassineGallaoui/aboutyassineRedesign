import styles from './SplashScreen.module.scss'
import logoY from '../../public/logo/logo-Y.svg'
import Image from 'next/image'
import { useEffect } from 'react';
import { typeText } from '../../utils/textTyping';


export default function SplashScreen({updateCursorText, updateCursorStatus}) {
    const texhnicalText1 = `Welcome dear web traveler!`;
    const texhnicalTextReply1 = `'Welcome' is not recognized as an internal or external command, operable program or batch file.`;
    const texhnicalText2 = `... ok. Anyways, don't expect all the website to be like THIS.`;

    useEffect(()=>{
      const codeTextWrapper = document.querySelector('.codeText');
      typeText(texhnicalText1, codeTextWrapper);
    }, [])

    return (
      <div className={styles.SSContainer}>
        <Image id={styles.logoImageSS} src={logoY} alt={`Yassine's Portfolio logo`} fill></Image>
        <div className={styles.codeText}>
          <span>{`C:\\Users\\yas>`}</span>
          <div className={styles.textCursor}></div>
        </div>
      </div>
    );
}