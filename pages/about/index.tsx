import { motion } from "motion/react";
import Head from "next/head";
import React, { useEffect } from "react";
import HorizontalLines from "../../components/HorizontalLines";
import { TitleBackground } from "../../components/TitleBackground";
import stylesAbout from "../../styles/scss/General.module.scss";
import {
  calculateScrollPercentage,
  createSpanStructureV2
} from "../../utils/utility";

export default function About({ SSAnimFinished, cursorIsHover, lastEditDate }) {
  const welcomeArray = ["Hi!", "Hallo!", "¡Hola!", "Salut!", "Ciao!"];
  const words = ["software engineer", "frontend expert", "proactive nerd", "a bit workaholic", "teamworker"];

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

    const pageContent = document.querySelector(".aboutContent");

    pageContent != null &&
      pageContent.addEventListener("scroll", () =>
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
    <>
      <Head>
        <title>Yassine - About Me</title>
      </Head>
      <motion.div
        className={stylesAbout.mainMotionDiv + " mainMotionDiv"}
        initial={{ x: "50dvw", opacity: 0 }}
        animate={{ x: "0dvw", opacity: 1 }}
        exit={{ x: "50dvw", opacity: 0 }}
        transition={{ duration: 1, ease: [0.8, 0.28, 0, 1] }}
      >
        {SSAnimFinished && <TitleBackground text={"About"} />}
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
                      style={{ "--i": index } as React.CSSProperties}
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
                  <span style={{ "--i": 0 } as React.CSSProperties}>1/&nbsp;&nbsp;...whooo am I?</span>
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
                  ><b>{` frontend`}</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` and trying to go all-in with`}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>{` creative development`}</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{`.`}</span>
                </p>

                <h2>
                  <span style={{ "--i": 1 } as React.CSSProperties}>2/&nbsp;&nbsp;{"Services"}</span>
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
                  ><b>{` developing high-quality websites`}</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{`, with particular attention to performance, responsiveness, motion, and accessibility.`}</span>

                  <br />

                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>{` As a freelancer, I work with startups, agencies, studios, and other professionals `}</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` worldwide, even though`}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>{` I'm still open to full-time employment`}</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` if the right opportunity arises — never say never!`}</span>

                  <br />

                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>{` Don't have a design for your website yet?`}</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` Feel free to reach out anyways, `}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>{` I know some excellent designers who can help us with that.`}</b></span>
                </p>

                <h2>
                  <span style={{ "--i": 2 } as React.CSSProperties}>3/&nbsp;&nbsp;{`Contacts`}</span>
                </h2>
                <p>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>{`In case you want to work together`}</b></span>
                  <span
                    className={stylesAbout.meContainer__txt__description__small}
                  >{` or you have some great project and you want some help on it,`}</span>
                  <span
                    className={stylesAbout.meContainer__txt__description__big}
                  ><b>{` you can reach out via `}</b></span>
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