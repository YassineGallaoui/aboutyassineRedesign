import React, { useEffect, useState } from "react";
import stylesHome from "../styles/scss/General.module.scss";
import { distanceLevels, parallax } from "../utils/utility";
import defaultImg from "../public/imgs/default.webp";
import Image, { StaticImageData } from "next/image";
import { Project, projectsDataset } from "../dataset";
import gsap from "gsap";
import ProjectModal from "../components/ProjectModal";
import { colorApplicator } from "../utils/colorFunctions";
import { motion } from "framer-motion";
import ProjectModalVertical from "../components/ProjectModalVertical";
import { breakpoints } from "../utils/breakpoints";

type HomeProps = {
  updateCursorText: Function;
  cursorIsHover: Function;
  lightColor: string;
  darkColor: string;
  SSAnimFinished: Function;
  deviceType: breakpoints;
};

export default function Home({
  updateCursorText,
  cursorIsHover,
  lightColor,
  darkColor,
  SSAnimFinished,
  deviceType,
}: HomeProps) {
  const [triangleRowsNumber, setTriangleRowsNumber] = useState<number>(0);
  const [trianglesPerRow, setTrianglesPerRow] = useState<number>(0);
  const [firstPositionProject, setFirstPositionProject] = useState<number>(0);
  const [tempImgHover, setTempImageHover] =
    useState<StaticImageData>(defaultImg);
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

    document.addEventListener("mousemove", (event) => mouseMoveHomepage(event));

    setMainStructureParams();
    window.addEventListener("resize", () => setMainStructureParams());

    // Clean up the event listener when the component unmounts
    return () => {
      document.addEventListener("mousemove", mouseMoveHomepage);
      window.addEventListener("resize", setMainStructureParams);
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
    let projects = document.querySelectorAll(".triangleProjectImg");
    projects.forEach((el) => {
      el.addEventListener("mouseover", () => {
        const elementId = el.getAttribute("data-project-id");
        setProjectIsHovered(true);
        if (elementId != null) {
          const elementData = projectsDataset.find(
            (el) => el.id + "" === elementId
          );
          setTempImageHover(elementData.media[0]);
          const tl1 = gsap.timeline({ delay: 0 });
          tl1.fromTo(
            ".bigBackgroundImage",
            { scale: 1.1, opacity: 0 },
            { scale: 1.02, opacity: 1, duration: 1, ease: "power3.out" }
          );
        }
      });
      el.addEventListener("mouseout", () => {
        setProjectIsHovered(false);
        const tl1 = gsap.timeline({ delay: 0 });
        tl1.fromTo(
          ".bigBackgroundImage",
          { scale: 1.02, opacity: 1 },
          { scale: 1.1, opacity: 0, duration: 1, ease: "power3.out" }
        );
      });
    });
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
  }, [projectOpenedBoolean]);

  function mouseMoveHomepage(event: MouseEvent | Event) {
    parallax(
      event,
      document.querySelectorAll(".sectionBkgrdTxt"),
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
        ? tempTPR / 2 - (projectsDataset.length - 1) / 2
        : (tempTPR - 1) / 2 - (projectsDataset.length - 1) / 2
    );
  }

  const handleImageHover = (id: number) => {
    gsap.to(`#image-${id}`, { duration: 0.5, scale: 1.1 });
    gsap.to(`.image:not(#image-${id})`, {
      duration: 0.5,
      scale: 0.95,
      opacity: 0,
    });
    cursorIsHover(true);
  };

  const handleImageLeave = (id: number) => {
    gsap.to(`#image-${id}`, { duration: 0.5, scale: 1 });
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
                          index2 === trianglesPerRow - 1)
                      && (index2 % 2 === 0 || index2 === trianglesPerRow - 1)
                      && SSAnimFinished && (
                          <div
                              className={stylesHome.obliqueLineP}
                              style={{"--i": index2} as React.CSSProperties}
                          ></div>
                      )}
                  {((index === 0 && upper) ||
                          index2 === 0 ||
                          index2 === trianglesPerRow - 1)
                      && (index2 % 2 === 0 || index2 === trianglesPerRow - 1)
                      && SSAnimFinished && (
                          <div
                              className={stylesHome.obliqueLineN}
                              style={{"--i": index2} as React.CSSProperties}
                          ></div>
                      )}
                  <div className={stylesHome.triangleProjectContent}>
                    <div
                      id={`see-more-${index2 % 2 === 1 ? "odd" : "even"}-${
                        projectsDataset[index2 - firstPositionProject]?.id
                      }`}
                      className={stylesHome.seeMoreText}
                    >
                      <span>{trianglesPerRow}</span>
                      <span>{trianglesPerRow - 1}</span>
                      <span>{index2}</span>
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
    <motion.div
      className={stylesHome.mainMotionDiv + " mainMotionDiv"}
      initial={{ x: "-50vw", opacity: 0 }}
      animate={{ x: "0vw", opacity: 1 }}
      exit={{ x: "-50vw", opacity: 0 }}
      transition={{ duration: 1, ease: [0.8, 0.28, 0, 1] }}
    >
      <div className={stylesHome.expBkgrdTxt + " sectionBkgrdTxt"}>Exp</div>
      <div
        className={
          stylesHome.currentPrjHovered +
          " currentPrjHovered " +
          (projectIsHovered ? stylesHome.hover : "")
        }
      >
        <Image
          className={"bigBackgroundImage"}
          src={tempImgHover}
          fill
          alt="project"
        ></Image>
      </div>
      <div className={stylesHome.modalMatteBkgrd + " modalMatteBkgrd"}></div>
      <div className={stylesHome.expContainer + " expContainer col-12"}>
        {triangleRowsNumber > 0 && renderNonProjectTriangles(true)}
        <div
          className={stylesHome.triangleProjectRow}
          style={
            {
              "--index": Math.floor(triangleRowsNumber / 2),
            } as React.CSSProperties
          }
        >
          <div className={stylesHome.horizontalLineL} />
          <div className={stylesHome.horizontalLineL} />
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
                        src={
                          projectsDataset[index2 - firstPositionProject]
                            ?.media[0]
                        }
                        id={`image-${
                          projectsDataset[index2 - firstPositionProject]?.id
                        }`}
                        className={"image"}
                        fill
                        alt="project"
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
                        <span>
                          {index2}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          <div className={stylesHome.horizontalLineR} />
          <div className={stylesHome.horizontalLineR} />
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
  );
}
