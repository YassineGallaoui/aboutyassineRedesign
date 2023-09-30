import { useEffect, useState } from "react";
import styles from "../styles/scss/Home.module.scss";
import { parallax } from "../utils/utility";
import Head from "next/head";
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

function Home({
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

  useEffect(() => {
    document.addEventListener("mousemove", () => parallax(event, document.querySelectorAll(".sectionBkgrdTxt"))
    );

    setTriangleRowsNumber(Math.ceil(window.innerHeight / 300 / 2));
    (Math.ceil((window.innerWidth / 300) * 2) + 2) % 2 === 1
      ? setTrianglesPerRow(Math.ceil((window.innerWidth / 300) * 2) + 5)
      : setTrianglesPerRow(Math.ceil((window.innerWidth / 300) * 2) + 4);

    colorApplicator(lightColor, darkColor);

    // Clean up the event listener when the component unmounts
    return () => {
      document.addEventListener("mousemove", () => parallax);
    };
  }, []);

  useEffect(() => {
    let projects = document.querySelectorAll(".triangleProjectImg");
    projects.forEach((el, index) => {
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
    if (id % 2 === 1)
      gsap.to(`#see-more-even-${id}`, {
        duration: 0.5,
        delay: 0.8,
        opacity: 1,
      });
    else
      gsap.to(`#see-more-odd-${id}`, { duration: 0.5, delay: 0.8, opacity: 1 });
    gsap.to(`.image:not(#image-${id})`, {
      duration: 0.5,
      scale: 0.95,
      opacity: 0,
    });
    cursorIsHover(true);
  };

  const handleImageLeave = (id: number) => {
    gsap.to(`#image-${id}`, { duration: 0.5, scale: 1 });
    if (id % 2 === 1)
      gsap.to(`#see-more-even-${id}`, {
        duration: 0.5,
        delay: 0.8,
        opacity: 0,
      });
    else
      gsap.to(`#see-more-odd-${id}`, { duration: 0.5, delay: 0.8, opacity: 0 });
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
        zIndex: "5",
      });
    } else {
      gsap.to(`.modalMatteBkgrd`, {
        background: "rgba(0,0,0,0)",
        zIndex: "-1",
      });
    }
  }, [projectOpenedBoolean]);

  return (
    <>
      <div
        className={styles.expBkgrdTxt + " sectionBkgrdTxt"}>
        Exp
      </div>
      <div
        className={
          styles.currentPrjHovered +
          " currentPrjHovered " +
          (projectIsHovered ? styles.hover : "")
        }
      >
        <Image
          className={"bigBackgroundImage"}
          src={tempImgHover}
          fill
          alt="project"
        ></Image>
      </div>
      <div className={styles.modalMatteBkgrd + " modalMatteBkgrd"}></div>
      <div className={styles.expContainer + " expContainer col-12"}>
        {triangleRowsNumber > 0 &&
          [...Array(triangleRowsNumber).keys()].map((row, index) => {
            return (
              <div
                key={index}
                className={styles.triangleProjectRow + " " + styles.noProjRow}
              >
                {trianglesPerRow > 0 &&
                  [...Array(trianglesPerRow).keys()].map((cell, index2) => {
                    return (
                      <div
                        key={index2}
                        className={styles.triangleProjectWrapper__NoProj}
                        style={
                          {
                            "--index": index2 + 2 - trianglesPerRow / 2,
                          } as React.CSSProperties
                        }
                      >
                        <div className={styles.triangleProjectContent}></div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        <div className={styles.triangleProjectRow}>
          {trianglesPerRow > 0 &&
            [...Array(trianglesPerRow).keys()].map((cell, index2) => {
              if (
                index2 <= trianglesPerRow / 2 - projectsDataset.length ||
                index2 >= trianglesPerRow / 2 + projectsDataset.length - 2
              ) {
                return (
                  <div
                    key={index2}
                    className={styles.triangleProjectWrapper__NoProj}
                    style={
                      {
                        "--index": index2 + 2 - trianglesPerRow / 2,
                      } as React.CSSProperties
                    }
                  >
                    <div className={styles.triangleProjectContent}></div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index2}
                    className={styles.triangleProjectWrapper}
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
                        styles.triangleProjectContent + " triangleProjectImg"
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
                        className={styles.seeMoreText}
                      ></div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
        {triangleRowsNumber > 0 &&
          [...Array(triangleRowsNumber).keys()].map((row, index) => {
            return (
              <div
                key={index}
                className={styles.triangleProjectRow + " " + styles.noProjRow}
              >
                {trianglesPerRow > 0 &&
                  [...Array(trianglesPerRow).keys()].map((cell, index2) => {
                    return (
                      <div
                        key={index2}
                        className={styles.triangleProjectWrapper__NoProj}
                        style={
                          {
                            "--index": index2 + 2 - trianglesPerRow / 2,
                          } as React.CSSProperties
                        }
                      >
                        <div className={styles.triangleProjectContent}></div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
      <ProjectModal
        content={projectOpened}
        open={projectOpenedBoolean}
        updateOpen={setProjectOpenedBoolean}
        updateCursorText={updateCursorText}
        cursorIsHover={cursorIsHover}
      />
    </>
  );
}

export default motion(Home);