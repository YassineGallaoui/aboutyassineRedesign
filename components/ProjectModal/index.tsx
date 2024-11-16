import { animate } from "motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import linkArrow from "../../public/icons/linkArrow.svg";
import { breakpoints, getDeviceType } from "../../utils/breakpoints";
import { Project } from "../../utils/dataset";
import Carousel from "../Carousel";
import styles from "./ProjectModal.module.scss";

type ModalProps = {
  content: Project;
  open: boolean;
  updateOpen: Function;
  cursorIsHover: Function;
};

export default function ProjectModal({
  content,
  open,
  updateOpen,
  cursorIsHover,
}: ModalProps) {
  const [expandedCarousel, setExpandedCarousel] = useState<boolean>(false);
  const [deviceType, setDeviceType] = useState(breakpoints.desktop);
  const arrowLinkRef = useRef(null);

  useEffect(() => {
    const changeDeviceType = () => {
      setDeviceType(getDeviceType())
    }
    window.addEventListener("resize", changeDeviceType);

    return () => {
      window.removeEventListener("resize", changeDeviceType)
    }
  }, []);

  useEffect(() => {
    if (open) {
      animate(`.projectModalContainer`, {
        position: "fixed",
        height: "90vh",
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
    setTimeout(() => {
      setExpandedCarousel(false);
    }, 200);
  };

  const hoverCloseBtn = () => {
    cursorIsHover(true);
    animate(`.closeModalBtn`, { transform: "rotate(-90deg)" });
  };

  const notHoverCloseBtn = () => {
    cursorIsHover(false);
    animate(`.closeModalBtn`, { transform: "rotate(0deg)" });
  };

  const arrowLinkMouseOver = async () => {
    await animate([arrowLinkRef.current, { duration: 0.2, x: 20, y: -20 }],)
    await animate([arrowLinkRef.current, { duration: 0, x: -20, y: 20 }])
    await animate([arrowLinkRef.current, { x: 0, y: 0 }])
    cursorIsHover(true);
  };

  useEffect(() => {
    const projectCarouselWrapper = document.querySelector(
      ".projectCarouselWrapper",
    );
    const descriptionWrapper = document.querySelector(
      ".projectModalDescriptionWrapper",
    );
    const closeModalBtn = document.querySelector(".closeModalBtn");

    if (expandedCarousel) {
      animate(descriptionWrapper, {
        opacity: 0,
        x: 100,
        flex: 0,
        padding: 0,
      }, {
        duration: 0.6
      });
      animate(projectCarouselWrapper, {
        borderRightWidth: 0,
      }, {
        duration: 0.3
      });
      animate(closeModalBtn, {
        filter: "invert(1)",
      }, {
        duration: 0.3,
        delay: 0.3
      });
    } else {
      animate(descriptionWrapper, {
        opacity: 1,
        x: 0,
        flex: 1,
        padding: "1rem",
      }, {
        duration: 0.6,
      });
      animate(projectCarouselWrapper, {
        borderWidth: "1px",
      }, {
        duration: 0.3,
      });
      animate(closeModalBtn, {
        filter: "invert(0)",
      }, {
        duration: 0.3,
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
    </div>
  );
}
