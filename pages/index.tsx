import { motion } from "framer-motion";
import gsap from "gsap";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProjectModal from "../components/ProjectModal";
import ProjectModalVertical from "../components/ProjectModalVertical";
import stylesHome from "../styles/scss/General.module.scss";
import { breakpoints, getDeviceType } from "../utils/breakpoints";
import { colorApplicator } from "../utils/colorFunctions";
import { Project, projectsDataset } from "../utils/dataset";
import { distanceLevels, hideFrame, parallax, unhideFrame } from "../utils/utility";

type HomeProps = {
  updateCursorText: Function;
  cursorIsHover: Function;
  lightColor: string;
  darkColor: string;
  SSAnimFinished: Function;
  deviceType: breakpoints;
  lastEditDate: string
};

export default function Home({
  updateCursorText,
  cursorIsHover,
  lightColor,
  darkColor,
  SSAnimFinished,
  deviceType,
  lastEditDate,
}: HomeProps) {
  const [triangleRowsNumber, setTriangleRowsNumber] = useState<number>(0);
  const [trianglesPerRow, setTrianglesPerRow] = useState<number>(0);
  const [firstPositionProject, setFirstPositionProject] = useState<number>(0);
  const [hoveredProjectID, setHoveredProjectID] = useState<number>(0);
  const [projectOpened, setProjectOpened] = useState<Project>(
    projectsDataset[0]
  );
  const [projectOpenedBoolean, setProjectOpenedBoolean] =
    useState<boolean>(false);
  const [projectIsHovered, setProjectIsHovered] = useState<boolean>(false);
  const zIndexMatteBKGOpen: number = 5;
  const zIndexMatteBKGClosed: number = -1;
  const [hasComponentMounted, setHasComponentMounted] = useState(false);

  useEffect(() => {
    colorApplicator(lightColor, darkColor);

    document.addEventListener("mousemove", mouseMoveHomepage);

    setMainStructureParams();
    window.addEventListener("resize", setMainStructureParams);

    const lastEditTag = document.querySelector("#lastUpdateDate");
    if (lastEditTag && lastEditDate != null) 
      lastEditTag.innerHTML = lastEditDate;

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousemove", mouseMoveHomepage);
      window.removeEventListener("resize", setMainStructureParams);
    };
  }, []);

  useEffect(() => {
    if (SSAnimFinished && hasComponentMounted) {
      const tlInitial = gsap.timeline({ delay: 0.2 });
      tlInitial
        .to(".expContainer", {
          duration: 0,
          top: 80,
          scale: 1,
          opacity: 0.8,
        })
        .to(".expContainer", {
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
    const themeContainer = document.querySelector(
      ".themeContainer"
    ) as HTMLElement;
    if (
      projectOpenedBoolean &&
      (getDeviceType() === breakpoints.mobile ||
        getDeviceType() === breakpoints.mobileSmall ||
        getDeviceType() === breakpoints.tablet)
    ) {
      hideFrame(themeContainer);
    }
    if (
      projectOpenedBoolean &&
      (getDeviceType() === breakpoints.desktop ||
        getDeviceType() === breakpoints.desktopLarge)
    ) {
      unhideFrame(themeContainer);
    }
  }, [deviceType]);

  useEffect(() => {
    let projects = document.querySelectorAll(".triangleProjectImg");

    const elMouseOver = (el) => {
      const elementId = el.getAttribute("data-project-id");
      const elementData = projectsDataset.find(
        (proj) => proj.id + "" === elementId
      );
      if (elementId != null && elementData != null) {
        setProjectIsHovered(true);
        setHoveredProjectID(elementId);
        const tl1 = gsap.timeline();
        tl1.to(`#bigBackgroundImage-${elementId}`, {
          scale: 1.02,
          duration: 5,
          ease: "expo.out",
        });
        tl1.to(
          `#bigBackgroundImage-${elementId}`,
          {
            opacity: 1,
            duration: 2,
            ease: "expo.out",
          },
          0
        );
      }
    };

    const elMouseOut = (el) => {
      const elementId = el.getAttribute("data-project-id");
      const elementData = projectsDataset.find(
        (proj) => proj.id + "" === elementId
      );
      if (elementId != null && elementData != null) {
        setProjectIsHovered(false);
        const tl1 = gsap.timeline();
        gsap.killTweensOf(`#bigBackgroundImage-${elementId}`);
        tl1.to(`#bigBackgroundImage-${elementId}`, {
          scale: 1.1,
          opacity: 0,
          duration: 0.5,
          delay: 0,
          ease: "expo.out",
        });
      }
    };


    projects.forEach((el) => {
      el.addEventListener("mouseover", () => elMouseOver(el));
      el.addEventListener("mouseout", () => elMouseOut(el));
    });

    //cleanup function
    return () => {
      projects.forEach((el) => {
        el.removeEventListener("mouseover", () => elMouseOver(el));
        el.removeEventListener("mouseout", () => elMouseOut(el));
      });
    };

  }, [trianglesPerRow]);

  useEffect(() => {
    if (projectOpenedBoolean) {
      gsap.to(`.modalMatteBkgrd`, {
        background: "rgba(0,0,0,0.8)",
        zIndex: zIndexMatteBKGOpen,
      });
    } else {
      gsap.to(`.modalMatteBkgrd`, {
        background: "rgba(0,0,0,0)",
        zIndex: zIndexMatteBKGClosed,
      });
    }

    const themeContainer = document.querySelector(
      ".themeContainer"
    ) as HTMLElement;
    if (
      getDeviceType() === breakpoints.mobile ||
      getDeviceType() === breakpoints.mobileSmall ||
      getDeviceType() === breakpoints.tablet
    )
      if (projectOpenedBoolean) hideFrame(themeContainer);
      else unhideFrame(themeContainer);
  }, [projectOpenedBoolean]);

  function mouseMoveHomepage(event: MouseEvent | Event) {
    parallax(
      event,
      document.querySelector(".sectionBkgrdTxt"),
      distanceLevels.Second
    );
  }

  function setMainStructureParams() {
    let IH = window.innerHeight;
    let IW = window.innerWidth;
    let trianglesWidth = 0.22 * IW;
    let tempR =
      Math.ceil(IH / trianglesWidth) % 2 === 1
        ? Math.ceil(IH / trianglesWidth)
        : Math.ceil(IH / trianglesWidth) + 1; //BECAUSE I WANT A CENTRAL ROW FOR PROJECT TRIANGLES, SO THE NUMBER MUST BE ODD
    setTriangleRowsNumber(tempR);
    let tempTPR =
      (Math.ceil(IW / trianglesWidth) * 2) % 2 === 1
        ? Math.ceil((IW / trianglesWidth) * 2) + 3
        : Math.ceil((IW / trianglesWidth) * 2) + 2;
    setTrianglesPerRow(tempTPR);
    setFirstPositionProject(
      tempTPR % 2 === 0
        ? tempTPR / 2 - (projectsDataset.length) / 2
        : (tempTPR - 1) / 2 - (projectsDataset.length - 1) / 2
    );
  }

  const handleImageHover = (id: number) => {
    gsap.killTweensOf(`#image`);
    gsap.to(`#image-${id}`, { duration: 5, scale: 1.1, ease: "expo.out" });
    gsap.to(`.image:not(#image-${id})`, {
      duration: 0.5,
      scale: 0.95,
      opacity: 0,
    });
    cursorIsHover(true);
  };

  const handleImageLeave = (id: number) => {
    gsap.killTweensOf(`.image`);
    gsap.to(`#image-${id}`, { duration: 1, scale: 1, ease: "expo.out" });
    gsap.to(".image", { duration: 0.5, scale: 1, opacity: 1 });
    cursorIsHover(false);
  };

  const handleImageClick = (id: number) => {
    const currentPrj = projectsDataset.find((el) => el.id === id);
    setProjectOpened(currentPrj);
    setProjectOpenedBoolean(true);
  };

  const renderNonProjectTriangles = (upper = false) => {
    return [
      ...Array(
        ((triangleRowsNumber - 1) / 2) % 2 === 1
          ? (triangleRowsNumber - 1) / 2
          : (triangleRowsNumber - 1) / 2 + 1
      ).keys(),
    ].map((index) => {
      return (
        <div
          key={index}
          className={stylesHome.triangleProjectRow + " " + stylesHome.noProjRow}
        >
          {SSAnimFinished && (
            <div
              className={stylesHome.horizontalLineL}
              style={{ "--i": index } as React.CSSProperties}
            />
          )}
          {SSAnimFinished && (
            <div
              className={stylesHome.horizontalLineL}
              style={{ "--i": index } as React.CSSProperties}
            />
          )}
          {trianglesPerRow > 0 &&
            [...Array(trianglesPerRow).keys()].map((index2) => {
              return (
                <div
                  key={index2}
                  className={stylesHome.triangleProjectWrapper__NoProj}
                  style={
                    {
                      "--index":
                        triangleRowsNumber % 2 === 0
                          ? index2 - trianglesPerRow / 2
                          : index2 - trianglesPerRow / 2 + 1,
                    } as React.CSSProperties
                  }
                >
                  {((index === 0 && upper) ||
                    index2 === 0 ||
                    index2 === trianglesPerRow - 1) &&
                    index2 % 2 === 0 &&
                    index % 2 === 0 &&
                    SSAnimFinished && (
                      <div
                        className={stylesHome.obliqueLineP}
                        style={
                          {
                            "--j": upper
                              ? index
                              : index + (triangleRowsNumber + 1) / 2,
                          } as React.CSSProperties
                        }
                      ></div>
                    )}
                  {((index === 0 && upper) || index2 === trianglesPerRow - 1) &&
                    (index2 % 2 === 0 ||
                      (index2 === trianglesPerRow - 1 && index !== 0) ||
                      !upper) &&
                    index % 2 === 0 &&
                    SSAnimFinished && (
                      <div
                        className={stylesHome.obliqueLineN}
                        style={
                          {
                            "--j": upper
                              ? index
                              : index + (triangleRowsNumber + 1) / 2,
                          } as React.CSSProperties
                        }
                      ></div>
                    )}
                  <div className={stylesHome.triangleProjectContent}>
                    <div
                      id={`see-more-${index2 % 2 === 1 ? "odd" : "even"}-${
                        projectsDataset[index2 - firstPositionProject]?.id
                      }`}
                      className={stylesHome.seeMoreText}
                    >
                      <span></span>
                    </div>
                  </div>
                </div>
              );
            })}
          {SSAnimFinished && (
            <div
              className={stylesHome.horizontalLineR}
              style={{ "--i": index } as React.CSSProperties}
            />
          )}
          {SSAnimFinished && (
            <div
              className={stylesHome.horizontalLineR}
              style={{ "--i": index } as React.CSSProperties}
            />
          )}
        </div>
      );
    });
  };

  return (
    <>
      <Head>
        <title>Yassine - Selected Projects</title>
      </Head>
      <motion.div
        className={stylesHome.mainMotionDiv + " mainMotionDiv"}
        initial={{ x: "-50vw", opacity: 0 }}
        animate={{ x: "0vw", opacity: 1 }}
        exit={{ x: "-50vw", opacity: 0 }}
        transition={{ duration: 1, ease: [0.8, 0.28, 0, 1] }}
      >
        <h1 className={stylesHome.expBkgrdTxt + " sectionBkgrdTxt"} aria-label="Projects">
          <span aria-hidden="true">P</span>
          <span aria-hidden="true">r</span>
          <span aria-hidden="true">o</span>
          <span aria-hidden="true">j</span>
          <span aria-hidden="true">e</span>
          <span aria-hidden="true">c</span>
          <span aria-hidden="true">t</span>
          <span aria-hidden="true">s</span>
        </h1>
        <div
          className={
            stylesHome.currentPrjHovered +
            " currentPrjHovered " +
            (projectIsHovered ? stylesHome.hover : "")
          }
        >
          {projectsDataset.map((proj) => (
            <Image
              key={proj.id}
              id={`bigBackgroundImage-${proj.id}`}
              className={`bigBackgroundImage`}
              priority={true}
              src={proj.media[0]}
              fill
              alt="project"
            />
          ))}
        </div>
        <div className={stylesHome.modalMatteBkgrd + " modalMatteBkgrd"}></div>
        <div
          className={
            stylesHome.expContainer + ' ' + (projectsDataset.length % 2 ? stylesHome.odd : stylesHome.even) + " expContainer" 
          }
        >
          {triangleRowsNumber > 0 && renderNonProjectTriangles(true)}
          <div
            className={stylesHome.triangleProjectRow}
            style={
              {
                "--index": Math.floor(triangleRowsNumber / 2),
              } as React.CSSProperties
            }
          >
            {SSAnimFinished && (
              <div
                className={stylesHome.horizontalLineL}
                style={{ "--i": triangleRowsNumber } as React.CSSProperties}
              />
            )}
            {SSAnimFinished && (
              <div
                className={stylesHome.horizontalLineL}
                style={{ "--i": triangleRowsNumber } as React.CSSProperties}
              />
            )}
            {trianglesPerRow > 0 &&
              [...Array(trianglesPerRow).keys()].map((index2) => {
                if (
                  index2 < firstPositionProject ||
                  index2 >= firstPositionProject + projectsDataset.length
                ) {
                  return (
                    <div
                      key={index2}
                      className={stylesHome.triangleProjectWrapper__NoProj}
                      style={
                        {
                          "--index": index2 - trianglesPerRow / 2,
                        } as React.CSSProperties
                      }
                    >
                      <div className={stylesHome.triangleProjectContent}></div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index2}
                      className={stylesHome.triangleProjectWrapper}
                      style={
                        {
                          "--index": index2 - trianglesPerRow / 2,
                        } as React.CSSProperties
                      }
                      id={`triangleProjectWrapper-${
                        projectsDataset[index2 - firstPositionProject]?.id
                      }`}
                    >
                      <div
                        className={
                          stylesHome.triangleProjectContent +
                          " triangleProjectImg"
                        }
                        id={`triangleProjectContent-${
                          projectsDataset[index2 - firstPositionProject]?.id
                        }`}
                        data-project-id={
                          projectsDataset[index2 - firstPositionProject]?.id
                        }
                      >
                        <Image
                          tabIndex={0}
                          src={
                            projectsDataset[index2 - firstPositionProject]
                              ?.media[0]
                          }
                          priority={true}
                          id={`image-${
                            projectsDataset[index2 - firstPositionProject]?.id
                          }`}
                          className={"image"}
                          quality={100}
                          fill={true}
                          sizes="70dvw"
                          alt={`Project ${
                            projectsDataset[index2 - firstPositionProject]?.name
                          }`}
                          onMouseOver={() =>
                            handleImageHover(
                              projectsDataset[index2 - firstPositionProject]?.id
                            )
                          }
                          onMouseLeave={() =>
                            handleImageLeave(
                              projectsDataset[index2 - firstPositionProject]?.id
                            )
                          }
                          onTouchEnd={(event) => {
                            event.preventDefault();
                            handleImageClick(
                              projectsDataset[index2 - firstPositionProject]?.id
                            );
                          }}
                          onTouchStart={(event) => event.preventDefault()}
                          onClick={() =>
                            handleImageClick(
                              projectsDataset[index2 - firstPositionProject]?.id
                            )
                          }
                        />
                        <div
                          id={`see-more-${index2 % 2 === 1 ? "odd" : "even"}-${
                            projectsDataset[index2 - firstPositionProject]?.id
                          }`}
                          className={stylesHome.seeMoreText}
                        >
                          <span></span>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            {SSAnimFinished && <div className={stylesHome.horizontalLineR} />}
            {SSAnimFinished && <div className={stylesHome.horizontalLineR} />}
          </div>
          {triangleRowsNumber > 0 && renderNonProjectTriangles(false)}
        </div>
        {deviceType === breakpoints.mobileSmall ||
        deviceType === breakpoints.mobile ? (
          <ProjectModalVertical
            content={projectOpened}
            open={projectOpenedBoolean}
            updateOpen={setProjectOpenedBoolean}
            updateCursorText={updateCursorText}
            cursorIsHover={cursorIsHover}
          />
        ) : (
          <ProjectModal
            content={projectOpened}
            open={projectOpenedBoolean}
            updateOpen={setProjectOpenedBoolean}
            updateCursorText={updateCursorText}
            cursorIsHover={cursorIsHover}
          />
        )}
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