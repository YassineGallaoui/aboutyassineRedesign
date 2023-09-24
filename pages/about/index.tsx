import { useEffect } from "react";
import styles from "../../styles/scss/About.module.scss";
import { createSpanStructure, parallax, calculateScrollPercentage } from "../../utils/utility";
import Head from "next/head";
import HorizontalLines from "../../components/HorizontalLines";

export default function About() {

    useEffect(() => {
        const welcomeArray = ["Hi!", "Hallo!", "¡Hola!", "Salut!", "Ciao!"];
        const welcomeWord = document.querySelector(".welcomeWord");
        let i = 1;
        const startWelcomeAnimation = function (i) {
            setTimeout(function () {
                welcomeWord.innerHTML = createSpanStructure(welcomeArray[i]);
                startWelcomeAnimation(++i < welcomeArray.length ? i : 0);
            }, 5000);
        };
        startWelcomeAnimation(i);

        document.addEventListener("mousemove", (event) =>
          parallax(event, document.querySelectorAll(".sectionBkgrdTxt"))
        );

        const pageContent = document.querySelector('.aboutContent');
        const percentageBar = document.querySelector('.percentageBarBar') as HTMLElement;
        const percentageNumber = document.querySelector('.percentageBarBar > span') as HTMLElement;
        pageContent.addEventListener("scroll", (event)=>{
            const scrollPercentage = calculateScrollPercentage(pageContent);
            percentageBar.style.height = scrollPercentage+'vh';
            percentageNumber.textContent = scrollPercentage+'%';
        })
    }, []);

    return (
        <>
            <Head>
                <title>Yassine | About him</title>
            </Head>
            <div className={styles.meBkgrdTxt+' sectionBkgrdTxt'}>About</div> 
            <div className={styles.verticalLine}></div>
            <div className={styles.horizontalLine}></div>
            <HorizontalLines />
            <div className={styles.meContainer}>
                <div className={styles.meContainer__txt + " row gx-5"}>
                    <div className={styles.meContainer__txt__big__welcome + " col-2 offset-1 welcomeWord"}>
                        <span style={{ '--i': 1 } as React.CSSProperties}>H</span>
                        <span style={{ '--i': 2 } as React.CSSProperties}>i</span>
                        <span style={{ '--i': 3 } as React.CSSProperties}>!</span>
                    </div>
                    <div className="w-100"></div>
                    <div className={styles.meContainer__txt__words + " col-2 offset-1"}>
                        <p>
                            <span className={styles.singleWord}>{`software developer`}</span>
                        </p>
                        <p>
                            <span className={styles.singleWord}>{`proactive nerd`}</span>
                        </p>
                        <p>
                            <span className={styles.singleWord}>{`a bit workaholic`}</span>
                        </p>
                        <p>
                            <span className={styles.singleWord}>{`teamwork & team support`}</span>
                        </p>
                    </div>
                    
                    <div className={styles.meContainer__txt__description+" aboutContent col-8 offset-3"}>
                        <p>
                            <span className={styles.meContainer__txt__description__small}>{`→ I'm`}</span>
                            <span className={styles.meContainer__txt__description__big}>{` Yassine, `}</span>
                            <span className={styles.meContainer__txt__description__small}>{`a`}</span>
                            <span className={styles.meContainer__txt__description__big}>{` software developer, `}</span>
                            <span className={styles.meContainer__txt__description__small}>{`particularly capable in`}</span>
                            <span className={styles.meContainer__txt__description__big}>{` frontend development. `}</span>
                            <span className={styles.meContainer__txt__description__small}>{`The majority of my`}</span>
                            <span className={styles.meContainer__txt__description__big}>{` interests gravitate around IT and CS, `}</span>
                            <span className={styles.meContainer__txt__description__small}>{`going from digital ethics to digital law and from web design to software development. My focus is always into making`}</span>
                            <span className={styles.meContainer__txt__description__big}>{` software `}</span>
                            <span className={styles.meContainer__txt__description__small}>{`which`}</span>
                            <span className={styles.meContainer__txt__description__big}>{` works flawless `}</span>
                            <span className={styles.meContainer__txt__description__small}>{`and`}</span>
                            <span className={styles.meContainer__txt__description__big}>{` is aesthetically captivating.`}</span>
                        </p>
                        <p>
                            <span className={styles.meContainer__txt__description__small}>{`→ Although I am currently working`}</span>
                            <span className={styles.meContainer__txt__description__big}>{` full time at Deloitte Digital, in Milan, `}</span>
                            <span className={styles.meContainer__txt__description__small}>{`I am always interested in`}</span>
                            <span className={styles.meContainer__txt__description__big}>{` new stimulating and meaningful projects, `}</span>
                            <span className={styles.meContainer__txt__description__small}>{` so if you feel like it, reach me thru `}</span>
                            <span className={styles.meContainer__txt__description__big}>{` email or linkedin.`}</span>
                        </p>
                        <p>
                            <span className={styles.meContainer__txt__description__small}>{`→ My`}</span>
                            <span className={styles.meContainer__txt__description__big}>{` native language `}</span>
                            <span className={styles.meContainer__txt__description__small}>{`is`}</span>
                            <span className={styles.meContainer__txt__description__big}>{` Italian `}</span>
                            <span className={styles.meContainer__txt__description__small}>{`but I also speak`}</span>
                            <span className={styles.meContainer__txt__description__big}>{` fluent English, `}</span>
                            <span className={styles.meContainer__txt__description__small}>{`a rusty `}</span>
                            <span className={styles.meContainer__txt__description__big}>{` French, `}</span>
                            <span className={styles.meContainer__txt__description__small}>{`as well as an informal`}</span>
                            <span className={styles.meContainer__txt__description__big}>{` Arabic`}</span>
                            <span className={styles.meContainer__txt__description__small}>{`.`}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.percentageBarContainer}>
                <div className={styles.percentageBarBar + ' percentageBarBar'}>
                    <span></span>
                </div>
            </div>
        </>
    );
}
