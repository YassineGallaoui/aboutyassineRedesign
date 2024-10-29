import { motion } from "framer-motion";
import gsap from "gsap";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProjectModal from "../components/ProjectModal";
import ProjectModalVertical from "../components/ProjectModalVertical";
import ProjectsCanvas from "../components/ProjectsCanvas";
import ProjectsCanvasVertical from "../components/ProjectsCanvasVertical";
import SlideinText from "../components/SlideinText";
import useScreenInfo from "../hooks/useScreenInfo";
import stylesHome from "../styles/scss/Projects.module.scss";
import { breakpoints, getDeviceType } from "../utils/breakpoints";
import { colorApplicator } from "../utils/colorFunctions";
import { Project, projectsDataset } from "../utils/dataset";
import { distanceLevels, hideFrame, parallax, unhideFrame } from "../utils/utility";

type NewProjectsProps = {
  updateCursorText: Function;
  cursorIsHover: Function;
  lightColor: string;
  darkColor: string;
  SSAnimFinished: Function;
  deviceType: breakpoints;
  lastEditDate: string
};

export default function NewProjects({
  lightColor,
  darkColor,
  updateCursorText,
  cursorIsHover,
  SSAnimFinished,
  deviceType,
  lastEditDate,
}: NewProjectsProps) {
  const screenSize = useScreenInfo();
  const [projsNumber, setProjsNumber] = useState(projectsDataset.length);

  const [projectOpenedBoolean, setProjectOpenedBoolean] = useState<boolean>(false);
  const [projectOpened, setProjectOpened] = useState<Project>(projectsDataset[0]);
  
  const [projectIsHovered, setProjectIsHovered] = useState<boolean>(false);
  const [projectIsHoveredID, setProjectIsHoveredID] = useState<number|null>(null);
  
  const zIndexMatteBKGOpen: number = 5;
  const zIndexMatteBKGClosed: number = -1;
  const [hasComponentMounted, setHasComponentMounted] = useState(false);

  const triangleMouseOver = (elementId: number) => {
    const elementData = projectsDataset.find(
      (proj) => proj.id === elementId
    );
    if (elementId != null && elementData != null) {
      setProjectIsHovered(true);
      setProjectIsHoveredID(elementId);
      
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
      cursorIsHover(true);
    }
  }

  const triangleMouseOut = (elementId: number) => {
    const elementData = projectsDataset.find(
      (proj) => proj.id === elementId
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
      cursorIsHover(false);
    }
  }

  const triangleMouseClick = (elementId: number) => {
    const currentPrj = projectsDataset.find((el) => el.id === elementId);
    setProjectOpened(currentPrj);
    setProjectOpenedBoolean(true);
  }

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

  useEffect(() => {
    colorApplicator(lightColor, darkColor);

    document.addEventListener("mousemove", mouseMoveHomepage);

    const lastEditTag = document.querySelector("#lastUpdateDate");
    if (lastEditTag && lastEditDate != null)
      lastEditTag.innerHTML = lastEditDate;
    
    return () => {
      document.removeEventListener("mousemove", mouseMoveHomepage);
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

  const mouseMoveHomepage = (event: MouseEvent | Event) => {
    parallax(
      event,
      document.querySelector(".sectionBkgrdTxt"),
      distanceLevels.Second
    );
  }

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
        {/* <TestComp projsNumber={projsNumber} setProjsNumber={setProjsNumber} /> */}
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
        <div
          className={
            stylesHome.currentPrjHoveredText +
            " currentPrjHoveredText "
          }
        >
          {projectsDataset.map((proj) => (
            <SlideinText key={proj.id} text={proj.name} isHovered={projectIsHoveredID === proj.id && projectIsHovered ? true : false}/>
          ))}
        </div>
        <div className={stylesHome.modalMatteBkgrd + " modalMatteBkgrd"}></div>
        <div
          className={
            stylesHome.expContainer + ' ' + (projectsDataset.length % 2 ? stylesHome.odd : stylesHome.even) + " expContainer"
          }
        >
          {screenSize === null || screenSize.aspectRatio > 1 ?
            <ProjectsCanvas 
              triangleMouseOver={triangleMouseOver}
              triangleMouseOut={triangleMouseOut}
              triangleMouseClick={triangleMouseClick}
              projsNumber={projsNumber}
            /> :
            <ProjectsCanvasVertical 
              triangleMouseOver={triangleMouseOver}
              triangleMouseOut={triangleMouseOut}
              triangleMouseClick={triangleMouseClick}
              projsNumber={projsNumber}
            />
          }
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