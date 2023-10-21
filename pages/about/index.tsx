import { useEffect, useState } from "react";
import stylesAbout from "../../styles/scss/General.module.scss";
import {
  createSpanStructure,
  parallax,
  calculateScrollPercentage,
  distanceLevels,
} from "../../utils/utility";
import HorizontalLines from "../../components/HorizontalLines";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function About({SSAnimFinished}) {
  const [hasComponentMounted, setHasComponentMounted] = useState(false);
  
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

    document.addEventListener("mousemove", (event) => {
      parallax(
        event,
        document.querySelectorAll(".sectionBkgrdTxt"),
        distanceLevels.Second
      );
    });

    const pageContent = document.querySelector(".aboutContent");

    pageContent!=null && pageContent.addEventListener("scroll", () =>
      scrollPercentageFunction(pageContent)
    );
    return () => {
      pageContent?.removeEventListener("scroll", scrollPercentageFunction);
    };
  }, [SSAnimFinished]);

  const scrollPercentageFunction = (pageContent) => {
    const percentageBar = document.querySelector(
      ".percentageBarBar"
    ) as HTMLElement;
    const percentageNumber = document.querySelector(
      ".percentageBarBar > span"
    ) as HTMLElement;
    const scrollPercentage = calculateScrollPercentage(pageContent);
    percentageBar.style.height = scrollPercentage + "vh";
    percentageNumber.textContent = scrollPercentage + "%";
  };

  return (
    <motion.div
      className={stylesAbout.mainMotionDiv + " mainMotionDiv"}
      initial={{ x: "50vw", opacity: 0 }}
      animate={{ x: "0vw", opacity: 1 }}
      exit={{ x: "50vw", opacity: 0 }}
      transition={{ duration: 1, ease: [0.8, 0.28, 0, 1] }}
    >
      <div className={stylesAbout.meBkgrdTxt + " sectionBkgrdTxt"}>About</div>
      {SSAnimFinished && <div className={stylesAbout.verticalLine}></div>}
      {SSAnimFinished && <div className={stylesAbout.horizontalLine}></div>}
      {SSAnimFinished && <HorizontalLines />}
      <div className={stylesAbout.meContainer}>
        <div
          className={stylesAbout.meContainer__txt + " meContainerRow row gx-5"}
        >
          <div
            className={
              stylesAbout.meContainer__txt__big__welcome +
              " col-2 offset-1 welcomeWord"
            }
          >
            <span style={{ "--i": 1 } as React.CSSProperties}>H</span>
            <span style={{ "--i": 2 } as React.CSSProperties}>i</span>
            <span style={{ "--i": 3 } as React.CSSProperties}>!</span>
          </div>
          <div className="w-100"></div>
          {SSAnimFinished && (
            <div
              className={
                stylesAbout.meContainer__txt__words + " col-2 offset-1"
              }
            >
              <p>
                <span
                  className={stylesAbout.singleWord}
                >{`software developer`}</span>
              </p>
              <p>
                <span
                  className={stylesAbout.singleWord}
                >{`proactive nerd`}</span>
              </p>
              <p>
                <span
                  className={stylesAbout.singleWord}
                >{`a bit workaholic`}</span>
              </p>
              <p>
                <span
                  className={stylesAbout.singleWord}
                >{`teamwork & team support`}</span>
              </p>
            </div>
          )}

          {SSAnimFinished && (
            <div
              className={
                stylesAbout.meContainer__txt__description +
                " aboutContent col-8 offset-3"
              }
            >
              <p>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`→ I'm`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` Yassine, `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`a`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` software developer, `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`particularly capable in`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` frontend development. `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`The majority of my`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` interests gravitate around IT and CS, `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`going from digital ethics to digital law and from UX/UI design to software development. My focus is always into making`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` software `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`which`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` works flawless `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`and`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` is aesthetically captivating. `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`Generally I am also`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` interested in art and architecture.`}</span>
              </p>
              <p>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`→ Although I am currently working`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` full time at Deloitte Digital, in Milan, `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`I am always interested in`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` new stimulating and meaningful projects, `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{` so if you feel like it, reach me thru `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` email or LinkedIn.`}</span>
              </p>
              <p>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`→ My`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` native language `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`is`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` Italian `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`but I also speak`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` fluent English, `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`a rusty `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` French, `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`as well as an informal`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` Arabic`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`.`}</span>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className={stylesAbout.percentageBarContainer}>
        <div className={stylesAbout.percentageBarBar + " percentageBarBar"}>
          <span></span>
        </div>
      </div>
    </motion.div>
  );
}
