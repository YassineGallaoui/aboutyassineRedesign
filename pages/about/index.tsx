import { motion } from "framer-motion";
import Head from "next/head";
import React, { useEffect } from "react";
import HorizontalLines from "../../components/HorizontalLines";
import stylesAbout from "../../styles/scss/General.module.scss";
import {
  calculateScrollPercentage,
  createSpanStructureV2,
  distanceLevels,
  parallax
} from "../../utils/utility";

export default function About({ SSAnimFinished, cursorIsHover, lastEditDate }) {
  const welcomeArray = ["Hi!", "Hallo!", "¡Hola!", "Salut!", "Ciao!"];
  const words = ["software engineer", "frontend expert", "proactive nerd", "a bit workaholic", "teamworker"];

/*   useEffect(() => {
    const lastEditTag = document.querySelector("#lastUpdateDate");
    if (lastEditTag && lastEditDate != null)
      lastEditTag.innerHTML = lastEditDate;
  }, []); */

/*   useEffect(() => {
    if (SSAnimFinished) {
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
    }
  }, [SSAnimFinished]); */

  useEffect(() => {
    const welcomeWord = document.querySelector(".welcomeWord");
    let i = 1;
    const startWelcomeAnimation = function (i) {
      setTimeout(function () {
        welcomeWord.innerHTML = createSpanStructureV2(welcomeArray[i]);
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
              stylesAbout.meContainer__txt + " meContainerRow"
            }
          >
            <div
              className={
                stylesAbout.meContainer__txt__big__welcome +
                " welcomeWord"
              }
            >
              <span style={{ "--i": 1 } as React.CSSProperties}>H</span>
              <span style={{ "--i": 2 } as React.CSSProperties}>i</span>
              <span style={{ "--i": 3 } as React.CSSProperties}>!</span>
            </div>
            {SSAnimFinished && (
              <div
                className={
                  stylesAbout.meContainer__txt__words
                }
              >
                {words.map((el, index) => (
                  <p key={index}>
                    <span
                      className={stylesAbout.singleWord}
                      style={{"--i": index} as React.CSSProperties}
                    >{el}</span>
                  </p>
                ))}
              </div>
            )}

            {SSAnimFinished && (
              <div
                className={
                  stylesAbout.meContainer__txt__description +
                  " aboutContent"
                }
              >
                <h2>
                  <span style={{ "--i": 0 } as React.CSSProperties}>1/&nbsp;&nbsp;Who the heck am I ?</span>
                </h2>
                <p>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{`I'm`} </span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>Yassine</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{`, Italian-Tunisian `}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>{` software engineer `}</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{`specialized in`}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>{` frontend and creative development. `}</b></span>
                </p>

                <h2>
                  <span style={{ "--i": 1 } as React.CSSProperties}>2/&nbsp;&nbsp;{"What do I do for a living"}?</span>
                </h2>
                <p>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{`My`}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>{` main services`}</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` focus on`}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>{` delivering high-quality website`}</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{`, with particular attention to performance, responsiveness, motion, and accessibility.`}</span>

                  <br/>

                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>{` As a freelance, I work with startups, agencies, studios, and other professionals `}</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` worldwide, even though`}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>{` I'm still open to full-time employment`}</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` if the right opportunity arises — cause never say never!`}</span>

                  <br/>

                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>{` Note:`}</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` you don't have the design for your website yet? Feel free to reach out anyways, I know some excellent designers who can help us on that.`}</span>
                </p>

                <h2>
                  <span style={{ "--i": 2 } as React.CSSProperties}>3/&nbsp;&nbsp;{`Where can you find me?`}</span>
                </h2>
                <p>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>{`In case you want to work together`}</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` or you have some new great project and you want two hands and a brain more on it`}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>{` you can reach me thru `}</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  >
                    <b><a
                      className={" underlineLineWithAnim"}
                      href={"mailto:myassine.gallaoui@gmail.com"}
                      onMouseOver={() => cursorIsHover(true)}
                      onMouseLeave={() => cursorIsHover(false)}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {`email`}
                    </a></b>
                  </span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{`, `}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  >
                    <b><a
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
                    </a></b>
                  </span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` or `}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  >
                    <b><a
                      className={
                        stylesAbout.underlineLineWithAnimTwo +
                        " underlineLineWithAnim"
                      }
                      href={
                        "https://x.com/Yassine__G"
                      }
                      onMouseOver={() => cursorIsHover(true)}
                      onMouseLeave={() => cursorIsHover(false)}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {`X`}
                    </a></b>
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