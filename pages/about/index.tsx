import React, { useEffect, useState } from "react";
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

export default function About({ SSAnimFinished, cursorIsHover }) {

  const [hasComponentMounted, setHasComponentMounted] = useState(false);

  useEffect(() => {
    if (SSAnimFinished && hasComponentMounted) {
      const tlInitial = gsap.timeline({ delay: 0.2 });
      tlInitial
          .to(".mainMotionDiv", {
            duration: 0,
            top: 80,
            scale: 1,
            opacity: 0.8,
          })
          .to(".mainMotionDiv", {
            duration: 1.8,
            top: 0,
            scale: 1,
            opacity: 1,
          });
    } else {
      setHasComponentMounted(true);
    }
  }, [SSAnimFinished]);

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
    const documentMouseMove = (event) => {
      parallax(
          event,
          document.querySelectorAll(".sectionBkgrdTxt"),
          distanceLevels.Second
      );
    }

    document.addEventListener("mousemove", documentMouseMove);

    const pageContent = document.querySelector(".aboutContent");

    pageContent != null &&
      pageContent.addEventListener("scroll", () =>
        scrollPercentageFunction(pageContent)
      );
    return () => {
      pageContent?.removeEventListener("scroll", scrollPercentageFunction);
      document.removeEventListener("mousemove", documentMouseMove);
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
      <div className={stylesAbout.meBkgrdTxt + " sectionBkgrdTxt"}>
        <span>A</span>
        <span>b</span>
        <span>o</span>
        <span>u</span>
        <span>t</span>
      </div>
      {SSAnimFinished && <div className={stylesAbout.verticalLine}></div>}
      {SSAnimFinished && <div className={stylesAbout.horizontalLine}></div>}
      {SSAnimFinished && <HorizontalLines />}
      <div className={stylesAbout.meContainer + " meContainer"}>
        <div
          className={stylesAbout.meContainer__txt + " meContainerRow row gx-5"}
        >
          <div
            className={
              stylesAbout.meContainer__txt__big__welcome +
              " col-10 col-sm-2 offset-1 offset-sm-1 welcomeWord"
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
                >{`software engineer`}</span>
              </p>
              <p>
                <span
                  className={stylesAbout.singleWord}
                >{`frontend expert`}</span>
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
                " aboutContent col-10 col-sm-8 offset-1 offset-sm-3"
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
                >{` software engineer `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`specialized in`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` frontend development. `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`The majority of my`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` interests gravitate around IT and CS `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >
                  {`- going from digital ethics to digital law and from UX/UI design to software development-, but generally I'm also interested in`}
                </span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` architecture `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`and`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` art`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`. My focus is always into making`}</span>
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
                >{` italian `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`but I also speak`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` fluent english, `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`a bit of`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` french, `}</span>
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
              <p>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{`→ I am always interested in`}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >{` new meaningful and stimulating projects, `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{` so if you think we can do something great together please reach me thru `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >
                  <a
                    className={" underlineLineWithAnim"}
                    href={"mailto:myassine.gallaoui@gmail.com"}
                    onMouseOver={() => cursorIsHover(true)}
                    onMouseLeave={() => cursorIsHover(false)}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {`email`}
                  </a>
                </span>
                <span
                  className={stylesAbout.meContainer__txt__description__small}
                >{` or `}</span>
                <span
                  className={stylesAbout.meContainer__txt__description__big}
                >
                  <a
                    className={
                      stylesAbout.underlineLineWithAnimTwo +
                      " underlineLineWithAnim"
                    }
                    href={
                      "https://www.linkedin.com/in/mohamed-yassine-gallaoui/"
                    }
                    onMouseOver={() => cursorIsHover(true)}
                    onMouseLeave={() => cursorIsHover(false)}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {`LinkedIn`}
                  </a>
                </span>
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
