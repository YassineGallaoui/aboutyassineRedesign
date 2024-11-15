import { animate } from "motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import linkArrow from "../../public/icons/linkArrow.svg";
import { Project } from "../../utils/dataset";
import CarouselMobile from "../CarouselMobile";
import { RotateDevice } from "../RotateDevice";
import styles from "./ProjectModalVertical.module.scss";


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
  const arrowLinkRef = useRef(null);

  const arrowLinkMouseOver = async () => {
    await animate(arrowLinkRef.current, { x: 20, y: -20 }, { duration: 0.2, })
    await animate(arrowLinkRef.current, { x: -20, y: 20 }, { duration: 0, })
    await animate(arrowLinkRef.current, { x: 0, y: 0 });
    cursorIsHover(true);
  };

  useEffect(() => {
    if (open) {
      animate(`.projectModalContainer`, {
        position: "fixed",
        height: "90dvh",
        borderRadius: "2.5rem",
        left: "50%",
        top: "50%",
        x: "-50%",
        y: "-50%",
        opacity: 1,
      });
    } else {
      animate(`.projectModalContainer`, {
        position: "fixed",
        height: "0vh",
        borderRadius: "0rem",
        left: "50%",
        top: "-50%",
        x: "-50%",
        y: "0%",
        opacity: 0,
      });
    }
  }, [open]);

  const closeModal = () => {
    updateOpen(false);
  };

  const hoverCloseBtn = () => {
    cursorIsHover(true);
    animate(`.closeModalBtn`, { transform: "rotate(-90deg)" });
  };

  const notHoverCloseBtn = () => {
    cursorIsHover(false);
    animate(`.closeModalBtn`, { transform: "rotate(0deg)" });
  };

  useEffect(() => {
    if (!expandedCarousel) {
      animate("#arrExpand", { scale: 1 }, { duration: 0 });
    } else {
      animate("#arrExpand", { scale: 1.4 }, { duration: 0 });
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
                  <span>{"Employer"}</span>
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
          {content.link != null && (
            <a
              type="button"
              className={styles.projectModalLink}
              aria-label="Click this link to go to the project's website"
              href={content.link}
              onMouseOver={() => arrowLinkMouseOver()}
              onMouseLeave={() => cursorIsHover(false)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                id="arrRight"
                ref={arrowLinkRef}
                className={styles.linkArrow}
                src={linkArrow}
                alt={""}
                role="presentation"
              ></Image>
            </a>
          )}
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
