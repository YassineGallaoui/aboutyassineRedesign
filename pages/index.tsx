/* eslint-disable @next/next/no-img-element */
import { A11yAnnouncer } from "@react-three/a11y";
import { animate } from "motion";
import { motion } from "motion/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import ProjectModal from "../components/ProjectModal";
import ProjectsCanvas from "../components/ProjectsCanvas";
import ProjectsCanvasVertical from "../components/ProjectsCanvasVertical";
import SlideinText from "../components/SlideinText";
import { TitleBackground } from "../components/TitleBackground";
import useScreenInfo from "../hooks/useScreenInfo";
import stylesHome from "../styles/scss/General.module.scss";
import { breakpoints } from "../utils/breakpoints";
import { colorApplicator } from "../utils/colorFunctions";
import { Project, projectsDataset } from "../utils/dataset";
import { hideFrame, unhideFrame } from "../utils/utility";

type NewProjectsProps = {
  cursorIsHover: Function;
  lightColor: string;
  darkColor: string;
  SSAnimFinished: Function;
  deviceType: breakpoints;
};

export const expandDurTime = 0.5;
export const nextSlideDurTime = 0.4;
export const buttonsDurTime = 0.3;
export const buttonsClickDurTime = 0.3;

export default function Projects({
  lightColor,
  darkColor,
  cursorIsHover,
  SSAnimFinished,
  deviceType,
}: NewProjectsProps) {
  const screenSize = useScreenInfo();
  const [projsNumber, setProjsNumber] = useState(projectsDataset.length);

  const [projectOpenedBoolean, setProjectOpenedBoolean] = useState<boolean | null>(null);
  const [projectOpened, setProjectOpened] = useState<Project>(projectsDataset[0]);

  const [projectIsHovered, setProjectIsHovered] = useState<boolean>(false);
  const [projectIsHoveredID, setProjectIsHoveredID] = useState<number | null>(null);
  const hoveredTriangles = new Set<number>();

  const zIndexMatteBKGOpen: number = 5;
  const zIndexMatteBKGClosed: number = -1;
  const [hasComponentMounted, setHasComponentMounted] = useState(false);

  const triangleMouseOver = (elementId: number) => {
    hoveredTriangles.add(elementId);

    cursorIsHover(true);
    const elementData = projectsDataset.find(
      (proj) => proj.id === elementId
    );
    if (elementId != null && elementData != null) {
      setProjectIsHovered(true);
      setProjectIsHoveredID(elementId);

      animate(`#bigBackgroundImage-${elementId}`, {
        scale: 1.02,
      }, {
        duration: 5,
        ease: [0, 0.25, 0.5, 1],
      });
      animate(
        `#bigBackgroundImage-${elementId}`,
        {
          opacity: 1,
        }, {
        duration: 2,
        ease: [0, 0.24, 0.49, 1],
      }
      );
    }
  }

  const triangleMouseOut = (elementId: number) => {

    hoveredTriangles.delete(elementId);

    if (hoveredTriangles.size === 0) {
      cursorIsHover(false);
      setProjectIsHovered(false);
    }

    const elementData = projectsDataset.find(
      (proj) => proj.id === elementId
    );
    if (elementId != null && elementData != null) {
      animate(`#bigBackgroundImage-${elementId}`, {
        scale: 1.1,
        opacity: 0,
      }, {
        ease: "easeOut",
        duration: 0.5,
      });
    }
  }

  const triangleMouseClick = (elementId: number) => {
    const currentPrj = projectsDataset.find((el) => el.id === elementId);
    setProjectOpened(currentPrj);
    setProjectOpenedBoolean(true);
  }

  useEffect(() => {
    if (projectOpenedBoolean) {
      animate(`.modalMatteBkgrd`, {
        background: "rgba(0,0,0,0.8)",
        zIndex: zIndexMatteBKGOpen,
      }, {
        delay: 0.2
      });
    } else {
      animate(`.modalMatteBkgrd`, {
        background: "rgba(0,0,0,0)",
        zIndex: zIndexMatteBKGClosed,
      });
    }

    if (projectOpenedBoolean === true)
      hideFrame();
    else if (projectOpenedBoolean === false)
      unhideFrame();
  }, [projectOpenedBoolean]);

  useEffect(() => {
    colorApplicator(lightColor, darkColor);
  }, []);

  useEffect(() => {
    if (SSAnimFinished && hasComponentMounted) {
      animate([
        [".expContainer", {
          top: 80,
          scale: 1,
          opacity: 0.8,
        }, {
            duration: 0,
          }],
        [
          ".expContainer", {
            top: 0,
            scale: 1,
            opacity: 1,
          }, {
            duration: 1.8,
          }
        ]
      ]);
    } else {
      setHasComponentMounted(true);
    }
  }, [SSAnimFinished]);

  return (
    <>
      <Head>
        <title>Yassine - Selected Projects</title>
      </Head>
      <motion.div
        className={stylesHome.mainMotionDiv + " mainMotionDiv"}
        initial={{ x: "50dvw", opacity: 0 }}
        animate={{ x: "0dvw", opacity: 1 }}
        exit={{ x: "-50dvw", opacity: 0 }}
        transition={{ duration: 1, ease: [0.8, 0.28, 0, 1] }}
      >
        {SSAnimFinished && <TitleBackground text={"Projects"} />}
        <div
          className={
            stylesHome.currentPrjHovered +
            " currentPrjHovered " +
            (projectIsHovered ? stylesHome.hover : "")
          }
        >
          {projectsDataset.map((proj) => (
            <img
              key={proj.id}
              id={`bigBackgroundImage-${proj.id}`}
              className={`bigBackgroundImage`}
              src={proj.media[0].src}
              alt="project"
            />
          ))}
        </div>
        <div
          className={
            stylesHome.currentPrjHoveredText + ' ' + (projectIsHovered ? stylesHome.show : '') +
            " currentPrjHoveredText "
          }
        >
          {projectsDataset.map((proj) => (
            <SlideinText key={proj.id} text={proj.name} isHovered={projectIsHoveredID === proj.id && projectIsHovered ? true : false} />
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
          <A11yAnnouncer />
        </div>
        <ProjectModal
          content={projectOpened}
          open={projectOpenedBoolean}
          updateOpen={setProjectOpenedBoolean}
          cursorIsHover={cursorIsHover}
          deviceType={deviceType}
        />
      </motion.div>
    </>
  );
}

/* export async function getStaticProps() {
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
} */