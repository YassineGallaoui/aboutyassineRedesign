import { useEffect, useState } from "react";
import styles from "./ProjectModal.module.scss";
import gsap from "gsap";
import Carousel from "../Carousel";
import { Project } from "../../dataset";

type ModalProps = {
  content: Project;
  open: boolean;
  updateOpen: Function;
  updateCursorText: Function;
  cursorIsHover: Function;
};

export default function ProjectModal({
  content,
  open,
  updateOpen,
  updateCursorText,
  cursorIsHover,
}: ModalProps) {
  const [expandedCarousel, setExpandedCarousel] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      gsap.to(`.projectModalContainer`, {
        position: "fixed",
        width: "90vw",
        height: "90vh",
        borderRadius: "30px",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        zIndex: "20",
        opacity: 1,
      });
    } else {
      gsap.to(`.projectModalContainer`, {
        position: "fixed",
        height: "0vh",
        borderRadius: "0px",
        left: "50%",
        top: "-50%",
        xPercent: -50,
        yPercent: 0,
        zIndex: "20",
        opacity: 0,
      });
    }
  }, [open]);

  const closeModal = () => {
    updateOpen(false);
  };

  const hoverCloseBtn = () => {
    cursorIsHover(true);
    gsap.to(`.closeModalBtn`, { transform: "rotate(-90deg)" });
  };

  const notHoverCloseBtn = () => {
    cursorIsHover(false);
    gsap.to(`.closeModalBtn`, { transform: "rotate(0deg)" });
  };

  useEffect(() => {
    const projectCarouselWrapper = document.querySelector(
      ".projectCarouselWrapper",
    );
    const descriptionWrapper = document.querySelector(
      ".projectModalDescriptionWrapper",
    );
    const closeModalBtn = document.querySelector(".closeModalBtn");
    const fadeEffectBox = document.querySelector(
      ".fadeEffectBox",
    ) as HTMLElement;
    if (expandedCarousel) {
      fadeEffectBox.style.backgroundImage = "none";
      gsap.to(descriptionWrapper, {
        duration: 0.6,
        opacity: 0,
        x: 100,
        flex: 0,
        padding: 0,
      });
      gsap.to(projectCarouselWrapper, {
        duration: 0.3,
        borderRightWidth: 0,
      });
      gsap.to(closeModalBtn, {
        delay: 0.3,
        duration: 0.3,
        filter: "invert(1)",
      });
    } else {
      gsap.to(descriptionWrapper, {
        duration: 0.6,
        opacity: 1,
        x: 0,
        flex: 1,
        padding: "1rem",
      });
      gsap.to(projectCarouselWrapper, {
        duration: 0.3,
        borderWidth: "1px",
      });
      gsap.to(closeModalBtn, {
        duration: 0.3,
        filter: "invert(0)",
      });
    }
  }, [expandedCarousel]);

  return (
    <div className={styles.projectModalContainer + " projectModalContainer"}>
      <div
        id="projectCarouselWrapper"
        className={styles.projectCarouselWrapper + " projectCarouselWrapper"}
      >
        <Carousel
          content={content}
          open={open}
          updateCursorText={updateCursorText}
          cursorIsHover={cursorIsHover}
          expandedCarousel={expandedCarousel}
          setExpandedCarousel={setExpandedCarousel}
        ></Carousel>
      </div>
      <div
        className={
          styles.projectModalDescriptionWrapper +
          " projectModalDescriptionWrapper"
        }
      >
        <div className={styles.projectDescriptionComponent}>
          <div className={styles.projectModalName}>{content.name}</div>
          <table>
            <tbody>
              <tr className={styles.bottomBorder + " bottomBorder"}>
                <th className={styles.characteristic + " characteristic"}>
                  <span>{"Working for"}</span>
                </th>
                <td>{content.workingFor}</td>
              </tr>
              <tr aria-rowspan={2} className={styles.descriptionTitle}>
                <th
                  colSpan={2}
                  className={styles.characteristic + " characteristic"}
                >
                  <span>{"Description"}</span>
                </th>
              </tr>
              <tr
                className={
                  styles.bottomBorder + " bottomBorder " + styles.description
                }
              >
                <td colSpan={2}>{content.description}</td>
              </tr>
              <tr className={styles.bottomBorder + " bottomBorder"}>
                <th className={styles.characteristic + " characteristic"}>
                  <span>{"Frontend"}</span>
                </th>
                <td>{content.frontend}</td>
              </tr>
              <tr className={styles.bottomBorder + " bottomBorder"}>
                <th className={styles.characteristic + " characteristic"}>
                  <span>{"Backend"}</span>
                </th>
                <td>{content.backend}</td>
              </tr>
              {content.recognitions != null && (
                <tr>
                  <th className={styles.characteristic + " characteristic"}>
                    <span>{"Recognitions"}</span>
                  </th>
                  <td>{content.recognitions}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className={styles.fadeEffect + " fadeEffectBox"}></div>
        </div>
      </div>
      <div
        className={
          styles.closeModalBtn +
          (expandedCarousel ? " " + styles.light : "") +
          " closeModalBtn"
        }
        onMouseOver={() => hoverCloseBtn()}
        onMouseLeave={() => notHoverCloseBtn()}
        onClick={() => closeModal()}
      />
    </div>
  );
}
