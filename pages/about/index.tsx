import { useEffect } from "react";
import styles from "../../styles/scss/About.module.scss";
import { createSpanStructure, parallax } from "../../utility";
import Head from "next/head";

export default function About() {
    useEffect(() => {
        const welcomeArray = ["Hello!", "Hallo!", "¡Hola!", "Salut!", "Ciao!"];
        const welcomeWord = document.querySelector(".welcomeWord");
        let i = 0;
        const startWelcomeAnimation = function (i) {
            setTimeout(function () {
                welcomeWord.innerHTML = createSpanStructure(welcomeArray[i]);
                startWelcomeAnimation(++i < welcomeArray.length ? i : 0);
            }, 3000);
        };
        startWelcomeAnimation(i);

        document.addEventListener("mousemove", (event) =>
          parallax(event, document.querySelectorAll(".sectionBkgrdTxt"))
        );

    }, []);

    return (
        <>
            <Head>
                <title>Yassine | Software Developer</title>
            </Head>
            <div className={styles.meBkgrdTxt+' sectionBkgrdTxt'}>Me</div>
            <div className={styles.meContainer + " col-8 offset-2"}>
                <div className={styles.meContainer__txt}>
                    <div
                        className={styles.meContainer__txt__big__welcome + " welcomeWord"}
                    >
                        <span style={{ '--i': 1 } as React.CSSProperties}>H</span>
                        <span style={{ '--i': 2 } as React.CSSProperties}>i</span>
                        <span style={{ '--i': 3 } as React.CSSProperties}>!</span>
                    </div>
                    <br />
                    <div>
                        <span className={styles.meContainer__txt__standard}>{`I'm `}</span>
                        <span className={styles.meContainer__txt__big}>{`Yassine`}</span>
                        <span className={styles.meContainer__txt__standard}>{`, a twenty-five years old `}</span>
                        <span className={styles.meContainer__txt__big}>{`full stack developer`}</span>
                        <span className={styles.meContainer__txt__standard}>{`, particularly capable in `}</span>
                        <span className={styles.meContainer__txt__big}>{`frontend development`}</span>
                        <span className={styles.meContainer__txt__standard}>{`.`}</span>
                        <br />
                        <span className={styles.meContainer__txt__standard}>{`The majority of my `}</span>
                        <span className={styles.meContainer__txt__big}>{`interests gravitate around IT`}</span>
                        <span className={styles.meContainer__txt__standard}>{`, going from digital ethics to digital law and from web design to software development. My focus is always into making `}</span>
                        <span className={styles.meContainer__txt__big}>{`software which `}</span>
                        <span className={styles.meContainer__txt__standard}>{` not only `}</span>
                        <span className={styles.meContainer__txt__big}>{`works flawless`}</span>
                        <span className={styles.meContainer__txt__standard}>{`, but `}</span>
                        <span className={styles.meContainer__txt__big}>{`is also aesthetically captivating`}</span>
                        <span className={styles.meContainer__txt__standard}>{`.`}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
