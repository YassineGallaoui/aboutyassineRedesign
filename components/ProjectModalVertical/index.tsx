import { useEffect, useState } from "react";
import styles from "./ProjectModalVertical.module.scss";
import gsap from "gsap";
import { Project } from "../../utils/dataset";
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
              <tr className={styles.bottomBorder + " bottomBorder"}>
                <th className={styles.characteristic + " characteristic"}>
                  <span>{"Year"}</span>
                </th>
                <td>{content.year}</td>
              </tr>
              <tr className={styles.descriptionTitle}>
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
