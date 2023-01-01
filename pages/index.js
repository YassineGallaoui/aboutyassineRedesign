import Head from 'next/head'
import Image from 'next/image'
import {useEffect} from "react";
import styles from '../styles/Home.module.css'
import { createSpanStructure } from "../utility.js";

export default function Home() {
  useEffect(() => {
    const welcomeArray = ['Hello!', 'Hallo!', '¡Hola!', 'Salut!', 'Ciao!'];
    const welcomeWord = document.querySelector(".welcomeWord");
    let i = 0;
    const startWelcomeAnimation = function(i) {
      setTimeout(function() {
        welcomeWord.innerHTML = createSpanStructure(welcomeArray[i]);
        startWelcomeAnimation(++i < welcomeArray.length ? i : 0);
      }, 3000);
    }
    startWelcomeAnimation(i);
  }, [])

  return (
    <>
      <Head>
        <title>Yassine | Software Engineer</title>
      </Head>
      <div className={styles.meBkgrdTxt}>Me</div>
      <div className={styles.meContainer+' col-8 offset-2'}>
        <div className={styles.meContainer__txt}>
          <div className={styles.meContainer__txt__big__welcome+" welcomeWord"}>
            <span style={{"--i":1}}>H</span>
            <span style={{"--i":2}}>i</span>
            <span style={{"--i":3}}>!</span>
          </div><br />
          I’m <span className={styles.meContainer__txt__big}>Yassine</span>, a twentyfive years old <span className={styles.meContainer__txt__big}>frontend developer</span>.<br />
          I have a lot of <span className={styles.meContainer__txt__big}>interests</span> and the majority of them <span className={styles.meContainer__txt__big}>gravitate around IT</span>, going from electronics to digital ethics and from web design to software development.<br />
          My focus is always into making <span className={styles.meContainer__txt__big}>software</span> which <span className={styles.meContainer__txt__big}>works good</span> but is also <span className={styles.meContainer__txt__big}>aesthetically captivating</span>.
        </div>
      </div>
    </>
  )
}
