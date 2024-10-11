import { motion } from "framer-motion";
import gsap from "gsap";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import HorizontalLines from "../../components/HorizontalLines";
import stylesAbout from "../../styles/scss/General.module.scss";
import {
  calculateScrollPercentage,
  createSpanStructure,
  distanceLevels,
  parallax,
} from "../../utils/utility";

export default function About({ SSAnimFinished, cursorIsHover, lastEditDate }) {
  const [hasComponentMounted, setHasComponentMounted] = useState(false);

  useEffect(() => {
    const lastEditTag = document.querySelector("#lastUpdateDate");
    if (lastEditTag && lastEditDate != null)
      lastEditTag.innerHTML = lastEditDate;
  }, []);

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
        document.querySelector(".sectionBkgrdTxt"),
        distanceLevels.Second
      );
    };

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
    <>
      <Head>
        <title>Yassine - About Me</title>
      </Head>
      <motion.div
        className={stylesAbout.mainMotionDiv + " mainMotionDiv"}
        initial={{ x: "50vw", opacity: 0 }}
        animate={{ x: "0vw", opacity: 1 }}
        exit={{ x: "50vw", opacity: 0 }}
        transition={{ duration: 1, ease: [0.8, 0.28, 0, 1] }}
      >
        <h1 className={stylesAbout.meBkgrdTxt + " sectionBkgrdTxt"} aria-label="About">
          <span aria-hidden="true">A</span>
          <span aria-hidden="true">b</span>
          <span aria-hidden="true">o</span>
          <span aria-hidden="true">u</span>
          <span aria-hidden="true">t</span>
        </h1>
        {SSAnimFinished && <div className={stylesAbout.verticalLine}></div>}
        {SSAnimFinished && <div className={stylesAbout.horizontalLine}></div>}
        {SSAnimFinished && <HorizontalLines />}
        <div className={stylesAbout.meContainer + " meContainer"}>
          <div
            className={
              stylesAbout.meContainer__txt + " meContainerRow row gx-5"
            }
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
                  <span className={stylesAbout.singleWord}>{`teamworker`}</span>
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
                <h2 className={stylesAbout.meContainer__txt__description__h2}>
                  <span>1/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Who the heck am I ?</span>
                </h2>
                <p>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >Actually I dunno. Jk, my name is </span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>Yassine</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{`, Italian-Tunisian, `}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  >{` software engineer `}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{`specialized in`}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  >{` frontend and creative development. `}</span>
                </p>

                <h2 className={stylesAbout.meContainer__txt__description__h2}>
                  <span>2/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "What do you do for a living"?</span>
                </h2>
                <p>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >My </span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  >services</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` range from creating any kind of `}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  >{`portfolio, presentation, tribute or archive website`}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` to `}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  >{` accessibility assessments on your already existing websites. `}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` The `}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  >{` goals `}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` and the `}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  >{` main rules are always the same: the final product must works flawlessly `}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` and, whenever possible, `}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  >{`is aesthetically captivating.`}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{`Note: If your project has a really advanced and particular design, you need to already have the design part done, so that i can focus and work in hard core mode on the code side straight away.`}</span>
                </p>


                <h2 className={stylesAbout.meContainer__txt__description__h2}>
                  <span>3/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Where can you find me?</span>
                </h2>
                <p>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >Well for sure I will not tell you where I live, you wirdo...</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  >{` But in case you want to work together or you have some new great project and you want two hands and a brain more on it, `}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` you can reach me thru `}</span>
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
    </>
  );
}

export async function getStaticProps() {
  const lastEditDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    props: {
      lastEditDate,
    },
  };
}