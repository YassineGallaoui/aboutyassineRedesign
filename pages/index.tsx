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

type HomeProps = {
  updateCursorText: Function;
  cursorIsHover: Function;
  lightColor: string;
  darkColor: string;
};

export default function Home({
  updateCursorText,
  cursorIsHover,
  lightColor,
  darkColor,
}: HomeProps) {
  const [triangleRowsNumber, setTriangleRowsNumber] = useState<number>(0);
  const [trianglesPerRow, setTrianglesPerRow] = useState<number>(0);
  const [tempImgHover, setTempImageHover] =
    useState<StaticImageData>(defaultImg);
  const [projectOpened, setProjectOpened] = useState<Project>(
    projectsDataset[0],
  );
  const [projectOpenedBoolean, setProjectOpenedBoolean] =
    useState<boolean>(false);
  const [projectIsHovered, setProjectIsHovered] = useState<boolean>(false);
  const zIndexMatteBKGOpen: number = 5;
  const zIndexMatteBKGClosed: number = -1;

  function mouseMoveHomepage(event: MouseEvent) {
    //parallax(event, document.querySelectorAll(".expContainer"), distanceLevels.First);
    parallax(
      event,
      document.querySelectorAll(".sectionBkgrdTxt"),
      distanceLevels.Second,
    );
  }

  useEffect(() => {
    document.addEventListener("mousemove", (event) => mouseMoveHomepage(event));

    setTriangleRowsNumber(Math.ceil(window.innerHeight / 300 / 2));
    (Math.ceil((window.innerWidth / 300) * 2) + 2) % 2 === 1
      ? setTrianglesPerRow(Math.ceil((window.innerWidth / 300) * 2) + 5)
      : setTrianglesPerRow(Math.ceil((window.innerWidth / 300) * 2) + 4);

    colorApplicator(lightColor, darkColor);

    // Clean up the event listener when the component unmounts
    return () => {
      document.addEventListener("mousemove", mouseMoveHomepage);
    };
  }, []);

  useEffect(() => {
    let projects = document.querySelectorAll(".triangleProjectImg");
    projects.forEach((el) => {
      el.addEventListener("mouseover", () => {
        const elementId = el.getAttribute("data-project-id");
        setProjectIsHovered(true);
        if (elementId != null) {
          const elementData = projectsDataset.find(
            (el) => el.id + "" === elementId,
          );
          setTempImageHover(elementData.media[0]);
          const tl1 = gsap.timeline({ delay: 0 });
          tl1.fromTo(
            ".bigBackgroundImage",
            { scale: 1.1, opacity: 0 },
            { scale: 1.02, opacity: 1, duration: 1, ease: "power3.out" },
          );
        }
      });
      el.addEventListener("mouseout", () => {
        setProjectIsHovered(false);
        const tl1 = gsap.timeline({ delay: 0 });
        tl1.fromTo(
          ".bigBackgroundImage",
          { scale: 1.02, opacity: 1 },
          { scale: 1.1, opacity: 0, duration: 1, ease: "power3.out" },
        );
      });
    });
  }, [trianglesPerRow]);

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

  const renderNonProjectTriangles = () => {
    return [...Array(triangleRowsNumber).keys()].map((index) => {
      return (
        <div
          key={index}
          className={stylesHome.triangleProjectRow + " " + stylesHome.noProjRow}
        >
          {trianglesPerRow > 0 &&
            [...Array(trianglesPerRow).keys()].map((index2) => {
              return (
                <div
                  key={index2}
                  className={stylesHome.triangleProjectWrapper__NoProj}
                  style={
                    {
                      "--index": index2 + 2 - trianglesPerRow / 2,
                    } as React.CSSProperties
                  }
                >
                  <div className={stylesHome.triangleProjectContent}></div>
                </div>
              );
            })}
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
        {triangleRowsNumber > 0 && renderNonProjectTriangles()}
        <div className={stylesHome.triangleProjectRow}>
          {trianglesPerRow > 0 &&
            [...Array(trianglesPerRow).keys()].map((index2) => {
              if (
                index2 <= trianglesPerRow / 2 - projectsDataset.length ||
                index2 >= trianglesPerRow / 2 + projectsDataset.length - 2
              ) {
                return (
                  <div
                    key={index2}
                    className={stylesHome.triangleProjectWrapper__NoProj}
                    style={
                      {
                        "--index": index2 + 2 - trianglesPerRow / 2,
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
                        "--index": index2 + 2 - trianglesPerRow / 2,
                      } as React.CSSProperties
                    }
                    id={`triangleProjectWrapper-${projectsDataset[
                      index2 + 1 - (trianglesPerRow - 2) / 2
                    ]?.id}`}
                  >
                    <div
                      className={
                        stylesHome.triangleProjectContent +
                        " triangleProjectImg"
                      }
                      id={`triangleProjectContent-${projectsDataset[
                        index2 + 1 - (trianglesPerRow - 2) / 2
                      ]?.id}`}
                      data-project-id={
                        projectsDataset[index2 + 1 - (trianglesPerRow - 2) / 2]
                          ?.id
                      }
                    >
                      <Image
                        src={
                          projectsDataset[
                            index2 + 1 - (trianglesPerRow - 2) / 2
                          ]?.media[0]
                        }
                        id={`image-${projectsDataset[
                          index2 + 1 - (trianglesPerRow - 2) / 2
                        ]?.id}`}
                        className={"image"}
                        fill
                        alt="project"
                        onMouseOver={() =>
                          handleImageHover(
                            projectsDataset[
                              index2 + 1 - (trianglesPerRow - 2) / 2
                            ]?.id,
                          )
                        }
                        onMouseLeave={() =>
                          handleImageLeave(
                            projectsDataset[
                              index2 + 1 - (trianglesPerRow - 2) / 2
                            ]?.id,
                          )
                        }
                        onClick={() =>
                          handleImageClick(
                            projectsDataset[
                              index2 + 1 - (trianglesPerRow - 2) / 2
                            ]?.id,
                          )
                        }
                      />
                      <div
                        id={`see-more-${
                          index2 % 2 === 1 ? "odd" : "even"
                        }-${projectsDataset[
                          index2 + 1 - (trianglesPerRow - 2) / 2
                        ]?.id}`}
                        className={stylesHome.seeMoreText}
                      ></div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
        {triangleRowsNumber > 0 && renderNonProjectTriangles()}
      </div>
      <ProjectModal
        content={projectOpened}
        open={projectOpenedBoolean}
        updateOpen={setProjectOpenedBoolean}
        updateCursorText={updateCursorText}
        cursorIsHover={cursorIsHover}
      />
    </motion.div>
  );
}
