/* eslint-disable @next/next/no-img-element */
import { motion, AnimatePresence, animate } from "motion/react";
import Head from "next/head";
import React, { useEffect, useMemo } from "react";
import { TitleBackground } from "../../components/TitleBackground";
import linkArrow from "../../public/icons/linkArrow.svg";
import stylesLab from "../../styles/scss/General.module.scss";
import {
  calculateScrollPercentage,
} from "../../utils/utility";
import { labDataset } from "../../utils/labDataset";
import Link from "next/link";
import enterArrow from '../../public/icons/enter-arrow.svg'
import horizontalLine from '../../public/icons/horizontalLine.svg'
import Image from 'next/image'

export default function Lab({ SSAnimFinished, cursorIsHover }) {
  const words = ["experiments", "ideas", "helpers", "boilerplates", "a bit creative", "+/- useful stuff", "reausable"];

  useEffect(() => {
    const pageContent = document.querySelector(".labContent");
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
        <title>Yassine - Lab</title>
      </Head>
      <motion.div
        className={stylesLab.mainMotionDiv + " mainMotionDiv"}
        initial={{ x: "50dvw", opacity: 0 }}
        animate={{ x: "0dvw", opacity: 1 }}
        exit={{ x: "50dvw", opacity: 0 }}
        transition={{ duration: 1, ease: [0.8, 0.28, 0, 1] }}
      >
        {SSAnimFinished && <TitleBackground text={"Lab"} />}
        {SSAnimFinished && <div className={stylesLab.verticalLine}></div>}
        {SSAnimFinished && <div className={stylesLab.horizontalLine}></div>}
        {SSAnimFinished && <div
          className={stylesLab.horizontalLinesContainer}
        >
          {([...Array(30)])?.map(
            (_, index) => (
              <div
                key={`before-${index}`}
                className={stylesLab.line__before}
                style={{ "--i": -(index + 1) } as React.CSSProperties}
              />
            ),
          )}
          {([...Array(30)])?.map(
            (_, index) => (
              <div
                key={`before-${index}`}
                className={stylesLab.line__after}
                style={{ "--i": index + 1 } as React.CSSProperties}
              />
            ),
          )}
        </div>
        }
        <div className={stylesLab.labContainer + " labContainer"}>
          <div></div>
          <div
            className={
              stylesLab.labContainer__txt + " labContainerRow"
            }
          >

            {SSAnimFinished && <div
              className={
                stylesLab.labContainer__txt__big__welcome
              }
            >
              <span style={{ "--i": 1 } as React.CSSProperties}>H</span>
              <span style={{ "--i": 2 } as React.CSSProperties}>i</span>
              <span style={{ "--i": 3 } as React.CSSProperties}>!</span>
            </div>}


            {SSAnimFinished && (
              <div
                className={
                  stylesLab.labContainer__txt__words
                }
              >
                {words.map((el, index) => (
                  <p key={index}>
                    <span
                      className={stylesLab.singleWord}
                      style={{ "--i": index } as React.CSSProperties}
                    >{el}</span>
                  </p>
                ))}
              </div>
            )}


            {SSAnimFinished && (
              <div
                className={
                  stylesLab.labContainer__txt__description +
                  " labContent"
                }
              >
                {
                  labDataset.map((el, i) => (
                    <>
                      <h2 className={stylesLab.categoryTitle}>
                        <span style={{ "--i": 0 } as React.CSSProperties}>
                          {i + 1}/&nbsp;&nbsp;
                          <span>
                            {el.categoryName}
                          </span>
                        </span>
                      </h2>
                      {el.projects.map((proj, j) => (
                        <Link
                          key={j}
                          href={proj.link}
                          onMouseOver={() => cursorIsHover(true)}
                          onMouseLeave={() => cursorIsHover(false)}
                          rel="noreferrer noopener"
                          target="_blank">
                          <div className={stylesLab.projectBox}>
                            {/* <Image className={stylesLab.categoryArrow} src={enterArrow} alt="Enter Arrow" /> */}
                            <svg className={stylesLab.svgEnterArrow} width="100%" height="100%" viewBox="0 0 48 48" >
                              <g transform="matrix(1,0,0,1,2.5,-2.54614)">
                                <path d="M8,7L8,37L35,37L25.979,27.979L35,37L25.908,46.092" style={{ fill: 'none', stroke: 'white', strokeWidth: '4px' }} />
                              </g>
                            </svg>
                            <h3 className={stylesLab.projectTitle}>{proj.title}</h3>
                            <div className={stylesLab.svghorizontalLineContainer}>
                              <svg className={stylesLab.svghorizontalLine} width="100%" height="100%" viewBox="0 0 192 48" preserveAspectRatio="none">
                                <g transform="matrix(1,0,0,1,0.5,2)">
                                  <path d="M6,22L185,22" style={{ fill: 'none', stroke: 'white', strokeWidth: '4px' }} />
                                </g>
                              </svg>
                            </div>
                            <span className={stylesLab.projectYear}>{proj.year}</span>
                          </div>
                        </Link>
                      ))}
                    </>
                  ))
                }
              </div>
            )}
          </div>
        </div>
        <div className={stylesLab.percentageBarContainer}>
          <div className={stylesLab.percentageBarBar + " percentageBarBar"}>
            <span></span>
          </div>
        </div>
      </motion.div>
    </>
  );
}