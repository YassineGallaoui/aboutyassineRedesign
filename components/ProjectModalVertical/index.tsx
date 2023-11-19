import { useEffect, useState } from "react";
import styles from "./ProjectModalVertical.module.scss";
import gsap from "gsap";
import { Project } from "../../dataset";
import CarouselMobile from "../CarouselMobile";
import { RotateDevice } from "../RotateDevice";

type ModalProps = {
  content: Project;
  open: boolean;
  updateOpen: Function;
  updateCursorText: Function;
  cursorIsHover: Function;
};

export default function ProjectModalVertical({
  content,
  open,
  updateOpen,
  updateCursorText,
  cursorIsHover,
}: ModalProps) {
  const [expandedCarousel, setExpandedCarousel] = useState<boolean>(false);

  useEffect(() => {
    const themeContainer = document.querySelector(".themeContainer") as HTMLElement;
    if (open) {
      themeContainer.classList.add("quickTransition");
      gsap.to(`.projectModalContainer`, {
        position: "fixed",
        width: "90dvw",
        height: "90dvh",
        borderRadius: "2.5rem",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        zIndex: "20",
        opacity: 1,
      });
      gsap.to(`.logoWrapper`, {
        x: "-4rem",
        y: "-4rem",
        duration: 0.5
      });
      gsap.to(`.lastUpdateText`, {
        x: "-4rem",
        y: "4rem",
        duration: 0.5
      });
      gsap.to(`.themeContainer`, {
        x: "4rem",
        y: "-4rem",
        duration: 0.5,
      });
      gsap.to(`.sectionsNav`, {
        x: "4.5rem",
        y: 0,
        duration: 0.3,
      });
      gsap.to(`.contacts`, {
        x: "4rem",
        y: "4rem",
        duration: 0.5,
      });
    } else {
      gsap.to(`.projectModalContainer`, {
        position: "fixed",
        height: "0vh",
        borderRadius: "0rem",
        left: "50%",
        top: "-50%",
        xPercent: -50,
        yPercent: 0,
        zIndex: "20",
        opacity: 0,
      });
      gsap.to(`.logoWrapper, .lastUpdateText, .themeContainer, .contacts`, {
        x: 0,
        y: 0,
        duration: 0.5,
      });
      gsap.to(`.sectionsNav`, {
        x: "2rem",
        y: 0,
        duration: 0.7,
      });
      setTimeout(() => {
        themeContainer.classList.remove("quickTransition");
      }, 600);
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
    if (!expandedCarousel) {
      gsap.to("#arrExpand", { duration: 0, scale: 1 });
    } else {
      gsap.to("#arrExpand", { duration: 0, scale: 1.4 });
    }
  }, [expandedCarousel]);

  return (
    <div className={styles.projectModalContainer + " projectModalContainer"}>
      <div
        id="projectCarouselWrapper"
        className={styles.projectCarouselWrapper + " projectCarouselWrapper"}
      >
        <CarouselMobile
          content={content}
          open={open}
          updateCursorText={updateCursorText}
          cursorIsHover={cursorIsHover}
          expandedCarousel={expandedCarousel}
          setExpandedCarousel={setExpandedCarousel}
        ></CarouselMobile>
      </div>
      <div
        className={
          styles.projectModalVerticalDescriptionWrapper +
          " projectModalVerticalDescriptionWrapper"
        }
      >
        <div className={styles.projectDescriptionComponent}>
          <div className={styles.projectModalVerticalName}>{content.name}</div>
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
      <RotateDevice
        showComponent={expandedCarousel}
        animationFinished={setExpandedCarousel}
      ></RotateDevice>
    </div>
  );
}
